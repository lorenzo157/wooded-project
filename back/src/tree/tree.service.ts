import { Injectable } from '@nestjs/common';
import { CreateTreeDto } from './dto/create-tree.dto';
import { DataSource, Repository } from 'typeorm';
import { Trees } from './entities/Trees';
import { InjectRepository } from '@nestjs/typeorm';
import { Pests } from './entities/Pests';
import { ProjectService } from '../project/project.service';
import { Coordinates } from '../shared/entities/Coordinates';
import { PestTree } from './entities/PestTree';
import { InterventionTree } from './entities/InterventionTree';
import { Interventions } from './entities/Interventions';
import { DefectTree } from './entities/DefectTree';
import { Defects } from './entities/Defects';
import { ConflictTree } from './entities/ConflictTree';
import { Conflicts } from './entities/Conflicts';
import { Diseases } from './entities/Diseases';
import { DiseaseTree } from './entities/DiseaseTree';
import { SimplyReadTreeDto } from './dto/simply-read-tree.dto';
import { ReadTreeDto } from './dto/read-tree.dto';
import { S3Service } from '../s3/s3.service';
@Injectable()
export class TreeService {
  constructor(
    private readonly projectService: ProjectService,
    private readonly s3Service: S3Service,
    private readonly dataSource: DataSource,
    @InjectRepository(Trees)
    private readonly treeRepository: Repository<Trees>,
    @InjectRepository(Coordinates)
    private readonly coordinatesRepository: Repository<Coordinates>,
    @InjectRepository(Conflicts)
    private readonly conflictRepository: Repository<Conflicts>,
    @InjectRepository(ConflictTree)
    private readonly conflictTreeRepository: Repository<ConflictTree>,
    @InjectRepository(Defects)
    private readonly defectRepository: Repository<Defects>,
    @InjectRepository(DefectTree)
    private readonly defectTreeRepository: Repository<DefectTree>,
    @InjectRepository(Diseases)
    private readonly diseaseRepository: Repository<Diseases>,
    @InjectRepository(DiseaseTree)
    private readonly diseaseTreeRepository: Repository<DiseaseTree>,
    @InjectRepository(Interventions)
    private readonly interventionRepository: Repository<Interventions>,
    @InjectRepository(InterventionTree)
    private readonly interventionTreeRepository: Repository<InterventionTree>,
    @InjectRepository(Pests)
    private readonly pestRepository: Repository<Pests>,
    @InjectRepository(PestTree)
    private readonly pestTreeRepository: Repository<PestTree>,
  ) {}

  async createTree(createTreeDto: CreateTreeDto) {
    const {
      conflictsNames,
      createDefectsDtos,
      diseasesNames,
      interventionsNames,
      pestsNames,
      latitude,
      longitude,
      projectId,
      treeTypeName,
      pathPhoto,
      ...treeData
    } = createTreeDto;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const coordinates = new Coordinates();
      coordinates.latitude = latitude;
      coordinates.longitude = longitude;
      const savedCoordinates = await queryRunner.manager.save(Coordinates, coordinates);

      const project = await this.projectService.findProjectById(projectId);

      let newTree = this.treeRepository.create({
        ...treeData,
        coordinate: savedCoordinates,
        neighborhood: null,
        project: project,
      });

      newTree = await queryRunner.manager.save(Trees, newTree);

      await this.saveManyToManyRelations(
        conflictsNames,
        this.conflictRepository,
        this.conflictTreeRepository,
        newTree,
        'conflict',
        queryRunner,
      );
      await this.saveManyToManyRelations(
        diseasesNames,
        this.diseaseRepository,
        this.diseaseTreeRepository,
        newTree,
        'disease',
        queryRunner,
      );
      await this.saveManyToManyRelations(
        interventionsNames,
        this.interventionRepository,
        this.interventionTreeRepository,
        newTree,
        'intervention',
        queryRunner,
      );
      await this.saveManyToManyRelations(pestsNames, this.pestRepository, this.pestTreeRepository, newTree, 'pest', queryRunner);

      if (createDefectsDtos && createDefectsDtos.length > 0) {
        for (const defectDto of createDefectsDtos) {
          let entity = await this.defectRepository.findOne({
            where: { defectName: defectDto.defectName },
          });

          const defectTree = this.defectTreeRepository.create({
            tree: newTree,
            defect: entity,
            defectValue: defectDto.defectValue,
            textDefectValue: defectDto.textDefectValue,
            branches: defectDto.branches,
          });
          await queryRunner.manager.save(DefectTree, defectTree);
        }
      }
      await queryRunner.commitTransaction();
      return newTree.idTree;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (pathPhoto) await this.s3Service.deleteFile(pathPhoto);

      throw error;
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }

  private async saveManyToManyRelations(
    names: string[], // Array of entity names (e.g., pestNames, diseaseNames)
    entityRepository: Repository<any>, // Repository for the main entity (e.g., pestRepository, diseaseRepository)
    relationRepository: Repository<any>, // Repository for the relation (e.g., pestTreeRepository)
    tree: Trees, // The tree entity being associated
    entityField: string,
    queryRunner: any, // The field name in the relation entity (e.g., 'pest' or 'disease')
  ) {
    if (names && names.length > 0) {
      for (const name of names) {
        let entity = await entityRepository.findOne({
          where: { [entityField + 'Name']: name },
        });

        const relation = relationRepository.create({
          tree: tree,
          [entityField]: entity, // Dynamically set the field (e.g., 'pest', 'disease')
        });
        await queryRunner.manager.save(relationRepository.target, relation);
      }
    }
  }
  // Find all the trees by project in simply dto that has general information of tree
  async findAllTreesByIdProject(idProject: number): Promise<SimplyReadTreeDto[]> {
    const trees = await this.treeRepository
      .createQueryBuilder('tree')
      .where('tree.project.idProject = :idProject', { idProject })
      .select(['tree.idTree', 'tree.datetime', 'tree.address', 'tree.treeValue', 'tree.risk'])
      .getMany();

    return trees.map((tree) => ({
      idTree: tree.idTree,
      datetime: tree.datetime,
      address: tree.address,
      treeValue: tree.treeValue,
      risk: tree.risk,
    }));
  }
  async findTreeById(idTree: number): Promise<ReadTreeDto> {
    const tree = await this.treeRepository
      .createQueryBuilder('tree')
      .leftJoinAndSelect('tree.coordinate', 'coordinate')
      .leftJoinAndSelect('tree.neighborhood', 'neighborhood')
      .leftJoinAndSelect('tree.conflictTrees', 'conflictTrees')
      .leftJoinAndSelect('conflictTrees.conflict', 'conflict')
      .leftJoinAndSelect('tree.defectTrees', 'defectTrees')
      .leftJoinAndSelect('defectTrees.defect', 'defect')
      .leftJoinAndSelect('tree.diseaseTrees', 'diseaseTrees')
      .leftJoinAndSelect('diseaseTrees.disease', 'disease')
      .leftJoinAndSelect('tree.interventionTrees', 'interventionTrees')
      .leftJoinAndSelect('interventionTrees.intervention', 'intervention')
      .leftJoinAndSelect('tree.pestTrees', 'pestTrees')
      .leftJoinAndSelect('pestTrees.pest', 'pest')
      .where('tree.idTree = :idTree', { idTree })
      .getOne();
    const neighborhoodName = tree.neighborhood?.neighborhoodName ?? null;

    const readTreeDto: ReadTreeDto = {
      idTree: tree.idTree,
      datetime: tree.datetime,
      pathPhoto: tree.pathPhoto,
      cityBlock: tree.cityBlock,
      perimeter: tree.perimeter,
      height: tree.height,
      incline: tree.incline,
      treesInTheBlock: tree.treesInTheBlock,
      useUnderTheTree: tree.useUnderTheTree,
      frequencyUse: tree.frequencyUse,
      potentialDamage: tree.potentialDamage,
      isMovable: tree.isMovable,
      isRestrictable: tree.isRestrictable,
      isMissing: tree.isMissing,
      isDead: tree.isDead,
      exposedRoots: tree.exposedRoots,
      dch: tree.dch,
      windExposure: tree.windExposure,
      vigor: tree.vigor,
      canopyDensity: tree.canopyDensity,
      growthSpace: tree.growthSpace,
      treeValue: tree.treeValue,
      streetMateriality: tree.streetMateriality,
      risk: tree.risk,
      address: tree.address,
      latitude: tree.coordinate.latitude,
      longitude: tree.coordinate.longitude,
      neighborhoodName: neighborhoodName,
      treeTypeName: tree.treeTypeName,
      gender: tree.gender,
      species: tree.species,
      scientificName: tree.scientificName,
      conflictsNames: tree.conflictTrees.map((conflictTree) => conflictTree.conflict.conflictName),
      diseasesNames: tree.diseaseTrees.map((diseaseTree) => diseaseTree.disease.diseaseName),
      interventionsNames: tree.interventionTrees.map((interventionTree) => interventionTree.intervention.interventionName),
      pestsNames: tree.pestTrees.map((pestTree) => pestTree.pest.pestName),
      readDefectDto: tree.defectTrees.map((defectTree) => ({
        defectName: defectTree.defect.defectName,
        defectZone: defectTree.defect.defectZone,
        defectValue: defectTree.defectValue,
        textDefectValue: defectTree.textDefectValue,
        branches: defectTree.branches,
      })),
    };
    return readTreeDto;
  }
  async updateTreeById(idTree: number, createTreeDto: CreateTreeDto) {
    await this.removeTreeById(idTree);
    const newIdTree = await this.createTree(createTreeDto);

    await this.pestRepository
      .createQueryBuilder()
      .update(PestTree)
      .set({ treeId: null })
      .where('treeId = :newIdTree', { newIdTree })
      .execute();
    await this.diseaseRepository
      .createQueryBuilder()
      .update(DiseaseTree)
      .set({ treeId: null })
      .where('treeId = :newIdTree', { newIdTree })
      .execute();
    await this.conflictRepository
      .createQueryBuilder()
      .update(ConflictTree)
      .set({ treeId: null })
      .where('treeId = :newIdTree', { newIdTree })
      .execute();
    await this.interventionRepository
      .createQueryBuilder()
      .update(InterventionTree)
      .set({ treeId: null })
      .where('treeId = :newIdTree', { newIdTree })
      .execute();
    await this.defectRepository
      .createQueryBuilder()
      .update(DefectTree)
      .set({ treeId: null })
      .where('treeId = :newIdTree', { newIdTree })
      .execute();

    await this.treeRepository
      .createQueryBuilder()
      .update(Trees)
      .set({ idTree: idTree })
      .where('idTree = :newIdTree', { newIdTree })
      .execute();

    await this.pestRepository.createQueryBuilder().update(PestTree).set({ treeId: idTree }).where('treeId IS NULL').execute();
    await this.diseaseRepository
      .createQueryBuilder()
      .update(DiseaseTree)
      .set({ treeId: idTree })
      .where('treeId IS NULL')
      .execute();
    await this.conflictRepository
      .createQueryBuilder()
      .update(ConflictTree)
      .set({ treeId: idTree })
      .where('treeId IS NULL')
      .execute();
    await this.interventionRepository
      .createQueryBuilder()
      .update(InterventionTree)
      .set({ treeId: idTree })
      .where('treeId IS NULL')
      .execute();
    await this.defectRepository.createQueryBuilder().update(DefectTree).set({ treeId: idTree }).where('treeId IS NULL').execute();
    return idTree;
  }

  async removeTreeById(idTree: number): Promise<void> {
    const tree = await this.treeRepository.findOne({
      where: { idTree: idTree },
      relations: ['coordinate'],
    });
    if (tree.pathPhoto) await this.s3Service.deleteFile(tree.pathPhoto);
    await this.treeRepository.delete({ idTree });
    await this.coordinatesRepository.remove(tree.coordinate);
  }
}
