import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projects } from './entities/Projects';
import { ReadProjectDto } from './dto/read-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Projects)
    private readonly projectRepository: Repository<Projects>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto) {
    throw new Error('Method not implemented.');
  }

  async findAllAssignedProjectsToUser(idUser: number): Promise<ReadProjectDto[]> {
    const projects = await this.projectRepository
      .createQueryBuilder('project')
      .innerJoinAndSelect('project.projectUsers', 'projectUser')
      .innerJoinAndSelect('projectUser.user', 'user')
      .innerJoinAndSelect('project.city', 'projectCity')
      .innerJoinAndSelect('projectCity.province', 'projectProvince')
      .where('user.idUser = :idUser', { idUser })
      .select([
        'project.idProject AS "idProject"' ,
        'project.projectName AS "projectName"',
        'project.projectDescription AS "projectDescription"',
        'project.startDate  AS "startDate"',
        'project.endDate AS "endDate"',
        'project.projectType AS "projectType"',
        'projectCity.cityName AS "cityName"',
        'projectProvince.provinceName AS "provinceName"',
      ])
      .getRawMany();
    
      return projects.map((project) => ({
        idProject: project.idProject,
        projectName: project.projectName,
        projectDescription: project.projectDescription,
        startDate: project.startDate,
        endDate: project.endDate,
        projectType: project.projectType,
        cityName: project.cityName,
        provinceName: project.provinceName,
      }));
  }

  async findAllCreatedProjectsByUser(idUser: number): Promise<ReadProjectDto[]> {
    const projects = await this.projectRepository
      .createQueryBuilder('project')
      .innerJoinAndSelect('project.user', 'user')
      .innerJoinAndSelect('project.city', 'projectCity')
      .innerJoinAndSelect('projectCity.province', 'projectProvince')
      .where('user.idUser = :idUser', { idUser })
      .select([
        'project.idProject AS "idProject"' ,
        'project.projectName AS "projectName"',
        'project.projectDescription AS "projectDescription"',
        'project.startDate  AS "startDate"',
        'project.endDate AS "endDate"',
        'project.projectType AS "projectType"',
        'projectCity.cityName AS "cityName"',
        'projectProvince.provinceName AS "provinceName"',
      ])
      .getRawMany();

    return projects.map((project) => ({
      idProject: project.idProject,
      projectName: project.projectName,
      projectDescription: project.projectDescription,
      startDate: project.startDate,
      endDate: project.endDate,
      projectType: project.projectType,
      cityName: project.cityName,
      provinceName: project.provinceName,
    }));
  }
  async findAllAssignedUsersWithProject(idProject: number) {
    throw new Error('Method not implemented.');
  }

  async assignUserToProject(idProject: number, idUser: number) {
    throw new Error('Method not implemented.');
  }
  async removeUserFromProject(idProject: number, idUser: number) {
    throw new Error('Method not implemented.');
  }
  async updateProjectById(idProject: number, updateProjectDto: UpdateProjectDto) {
    throw new Error('Method not implemented.');
  }
  async removeProjectById(idProject: number) {
    throw new Error('Method not implemented.');
  }
  async findProject(idProject: number): Promise<Projects> {
    const project = await this.projectRepository.findOne({
      where: { idProject: idProject },
    });
    return project;
  }
}
