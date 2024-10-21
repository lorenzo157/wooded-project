import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTreeDto } from './dto/create-tree.dto';
import { Repository } from 'typeorm';
import { Trees } from './entities/Trees';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeTypes } from './entities/TreeTypes';
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
@Injectable()
export class TreeService {
  constructor(
    @InjectRepository(Trees)
    private readonly treeRepository: Repository<Trees>,
    @InjectRepository(Coordinates)
    private readonly coordinatesRepository: Repository<Coordinates>,
    @InjectRepository(TreeTypes)
    private readonly treeTypeRepository: Repository<TreeTypes>,
    private readonly projectService: ProjectService,
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
      defectsDtos,
      diseasesNames,
      interventionsNames,
      pestsNames,
      latitude,
      longitude,
      projectId,
      treeTypeName,
      ...treeData
    } = createTreeDto;

    const coordinates = new Coordinates();
    coordinates.latitude = latitude;
    coordinates.longitude = longitude;
    const savedCoordinates = await this.coordinatesRepository.save(coordinates);

    const project = await this.projectService.findProject(projectId);

    const treeType = await this.treeTypeRepository.findOne({
      where: { treeTypeName: treeTypeName },
    });

    const newTree = this.treeRepository.create({
      ...treeData,
      coordinate: savedCoordinates,
      neighborhood: null,
      project: project,
      treeType: treeType || null,
    });

    await this.treeRepository.save(newTree);

    await this.saveManyToManyRelations(conflictsNames, this.conflictRepository, this.conflictTreeRepository, newTree, 'conflict');
    await this.saveManyToManyRelations(diseasesNames, this.diseaseRepository, this.diseaseTreeRepository, newTree, 'disease');
    await this.saveManyToManyRelations(
      interventionsNames,
      this.interventionRepository,
      this.interventionTreeRepository,
      newTree,
      'intervention',
    );
    await this.saveManyToManyRelations(pestsNames, this.pestRepository, this.pestTreeRepository, newTree, 'pest');

    if (defectsDtos && defectsDtos.length > 0) {
      for (const defectDto of defectsDtos) {
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
        await this.defectTreeRepository.save(defectTree);
      }
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Tree created or updated successfully',
    };
  }

  private async saveManyToManyRelations(
    names: string[], // Array of entity names (e.g., pestNames, diseaseNames)
    entityRepository: Repository<any>, // Repository for the main entity (e.g., pestRepository, diseaseRepository)
    relationRepository: Repository<any>, // Repository for the relation (e.g., pestTreeRepository)
    tree: Trees, // The tree entity being associated
    entityField: string, // The field name in the relation entity (e.g., 'pest' or 'disease')
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
        await relationRepository.save(relation);
      }
    }
  }

  // Find all the trees by project in simply dto that has general information of tree
  async findAllTreesByIdProject(idProject: number): Promise<SimplyReadTreeDto[]> {
    const trees = await this.treeRepository
      .createQueryBuilder('tree')
      .where('tree.project.idProject = :idProject', { idProject })
      .select(['tree.idTree', 'tree.treeName', 'tree.datetime', 'tree.address', 'tree.treeValue', 'tree.risk'])
      .getMany();

    return trees.map((tree) => ({
      idTree: tree.idTree,
      treeName: tree.treeName,
      datetime: tree.datetime,
      address: tree.address,
      treeValue: tree.treeValue,
      risk: tree.risk,
    }));
  }

  async findTreeById(idTree: number): Promise<ReadTreeDto> {
    const tree = await this.treeRepository
      .createQueryBuilder('tree')
      .innerJoinAndSelect('tree.coordinate', 'coordinate')
      .innerJoinAndSelect('tree.neighborhood', 'neighborhood')
      .innerJoinAndSelect('tree.treeType', 'treeType')
      .innerJoinAndSelect('tree.conflictTrees', 'conflictTrees')
      .innerJoinAndSelect('conflictTrees.conflict', 'conflict')
      .innerJoinAndSelect('tree.defectTrees', 'defectTrees')
      .innerJoinAndSelect('defectTrees.defect', 'defect')
      .innerJoinAndSelect('tree.diseaseTrees', 'diseaseTrees')
      .innerJoinAndSelect('diseaseTrees.disease', 'disease')
      .innerJoinAndSelect('tree.interventionTrees', 'interventionTrees')
      .innerJoinAndSelect('interventionTrees.intervention', 'intervention')
      .innerJoinAndSelect('tree.pestTrees', 'pestTrees')
      .innerJoinAndSelect('pestTrees.pest', 'pest')
      .where('tree.idTree = :idTree', { idTree })
      .getOne();

    const readTreeDto: ReadTreeDto = {
      idTree: tree.idTree,
      treeName: tree.treeName,
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
      neighborhoodName: tree.neighborhood.neighborhoodName,
      treeTypeDto: {
        treeTypeName: tree.treeType.treeTypeName,
        gender: tree.treeType.gender,
        species: tree.treeType.species,
        scientificName: tree.treeType.scientificName,
      },
      conflictsNames: tree.conflictTrees.map((conflictTree) => conflictTree.conflict.conflictName),
      diseasesNames: tree.diseaseTrees.map((diseaseTree) => diseaseTree.disease.diseaseName),
      interventionsNames: tree.interventionTrees.map((interventionTree) => interventionTree.intervention.interventionName),
      pestsNames: tree.pestTrees.map((pestTree) => pestTree.pest.pestName),
      defectDto: tree.defectTrees.map((defectTree) => ({
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
    return this.createTree(createTreeDto);
  }

  async removeTreeById(idTree: number): Promise<void> {
    
    const tree = await this.treeRepository.findOne({
      where: { idTree: idTree },
      relations: ['coordinate'],
    });

    await this.treeRepository.delete({ idTree });
    await this.coordinatesRepository.remove(tree.coordinate);
  }
}
