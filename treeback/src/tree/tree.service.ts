import { Injectable } from '@nestjs/common';
import { CreateTreeDto } from './dto/create-tree.dto';
import { UpdateTreeDto } from './dto/update-tree.dto';
import { Repository } from 'typeorm';
import { Trees } from './entities/Trees';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeTypes } from './entities/TreeTypes';
//import { Neighborhoods } from '../shared/entities/Neighborhoods';
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
@Injectable()
export class TreeService {
  constructor(
    @InjectRepository(Trees)
    private readonly treeRepository: Repository<Trees>,
    private readonly coordinatesRepository: Repository<Coordinates>,
    private readonly treeTypeRepository: Repository<TreeTypes>,
    //private readonly neighboorhoodRepository: Repository<Neighborhoods>,
    private readonly projectService: ProjectService,
    private readonly conflictRepository: Repository<Conflicts>,
    private readonly conflictTreeRepository: Repository<ConflictTree>,
    private readonly defectRepository: Repository<Defects>,
    private readonly defectTreeRepository: Repository<DefectTree>,
    private readonly diseaseRepository: Repository<Defects>,
    private readonly diseaseTreeRepository: Repository<DefectTree>,
    private readonly interventionRepository: Repository<Interventions>,
    private readonly interventionTreeRepository: Repository<InterventionTree>,
    private readonly pestRepository: Repository<Pests>,
    private readonly pestTreeRepository: Repository<PestTree>,
  ) {}

  async createTree(createTreeDto: CreateTreeDto) {
    const {
      conflictsNames,
      defectsNames,
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

    //const neighborhood = await this.determineNeigboorhood(latitude, longitude);

    const project = await this.projectService.findProject(projectId);

    const treeType = await this.treeTypeRepository.findOne({
      where: { treeTypeName: treeTypeName },
    });
    // Create a new Tree (with or without treeType depending on nameType's presence)
    const newTree = this.treeRepository.create({
      ...treeData,
      coordinate: savedCoordinates,
      neighborhood: null,
      project: project,
      treeType: treeType || null, // If nameType is not provided, set treeType to null
    });

    await this.treeRepository.save(newTree);

    await this.saveManyToManyRelations(conflictsNames, this.conflictRepository, this.conflictTreeRepository, newTree, 'conflict');
    await this.saveManyToManyRelations(defectsNames, this.defectRepository, this.defectTreeRepository, newTree, 'defect');
    await this.saveManyToManyRelations(diseasesNames, this.diseaseRepository, this.diseaseTreeRepository, newTree, 'disease');
    await this.saveManyToManyRelations(interventionsNames, this.interventionRepository, this.interventionTreeRepository, newTree, 'intervention');
    await this.saveManyToManyRelations(pestsNames, this.pestRepository, this.pestTreeRepository, newTree, 'pest');

  }
  // private async determineNeigboorhood(latitude: number, longitude: number): Promise<Neighborhoods> {
  //   throw new Error('Method not implemented.');
  // }

  private async saveManyToManyRelations(
    names: string[], // Array of entity names (e.g., pestNames, diseaseNames)
    entityRepository: Repository<any>, // Repository for the main entity (e.g., pestRepository, diseaseRepository)
    relationRepository: Repository<any>, // Repository for the relation (e.g., pestTreeRepository)
    tree: Trees, // The tree entity being associated
    entityField: keyof any, // The field name in the relation entity (e.g., 'pest' or 'disease')
  ) {
    if (names && names.length > 0) {
      for (const name of names) {
        let entity = await entityRepository.findOne({
          where: { name },
        });

        if (!entity) {
          // If the entity doesn't exist, create it
          entity = entityRepository.create({ name });
          await entityRepository.save(entity);
        }

        // Create the relation (e.g., TreePest or TreeDisease)
        const relation = relationRepository.create({
          tree: tree,
          [entityField]: entity, // Dynamically set the field (e.g., 'pest', 'disease')
        });
        await relationRepository.save(relation);
      }
    }
  }

  // Find all Trees created by a user or associated with a user through ProjectUser
  async findAllTreesByIdProject(idProject: number): Promise<Trees[]> {
    throw new Error('Method not implemented.');
  }

  async findTreeById(idTree: number) {
    throw new Error('Method not implemented.');
  }

  async updateTreeById(idTree: number, updateTreeDto: UpdateTreeDto) {
    throw new Error('Method not implemented.');
  }

  async removeTreeById(idTree: number) {
    throw new Error('Method not implemented.');
  }
}
