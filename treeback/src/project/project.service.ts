import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projects } from './entities/Projects';
import { ReadProjectDto } from './dto/read-project.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
//import { ProjectUser } from '../shared/entities/ProjectUser';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Projects)
        private readonly projectRepository: Repository<Projects>,
    ) {}

    async createProject(createProjectDto: CreateProjectDto) {
        throw new Error('Method not implemented.');
    }

    async findAllAssignedProjectsWithUser(
        idUser: number,
    ): Promise<ReadProjectDto[]> {
        const projects = await this.projectRepository
            .createQueryBuilder('projects')
            .innerJoinAndSelect('projects.projectUser', 'projectUser')
            .innerJoinAndSelect('projectUser.user', 'associatedUser')
            .innerJoinAndSelect('projects.city', 'projectCity')
            .innerJoinAndSelect('projectCity.province', 'projectProvince')
            .where('associatedUser.id = :idUser', { idUser })
            .select([
                'projects.id AS idProject',
                'projects.name AS projectName',
                'projects.description AS projectDescription',
                'projects.startDate AS startDate',
                'projects.endDate AS endDate',
                'projects.projectType AS projectType',
                'projectCity.name AS cityName',
                'projectProvince.name AS provinceName',
            ])
            .getRawMany();

        return projects.map((project) => {
            const readProjectDto = new ReadProjectDto();
            readProjectDto.idProject = project.idProject;
            readProjectDto.projectName = project.projectName;
            readProjectDto.projectDescription = project.projectDescription;
            readProjectDto.startDate = project.startDate;
            readProjectDto.endDate = project.endDate;
            readProjectDto.projectType = project.projectType;
            readProjectDto.cityName = project.cityName;
            readProjectDto.provinceName = project.provinceName;
            return readProjectDto;
        });
    }

    async findAllCreatedProjectsByUser(
        idUser: number,
    ): Promise<ReadProjectDto[]> {
        const projects = await this.projectRepository
            .createQueryBuilder('project')
            .innerJoinAndSelect('project.user', 'creatorUser')
            .innerJoinAndSelect('project.city', 'projectCity')
            .innerJoinAndSelect('projectCity.province', 'projectProvince')
            .where('creatorUser.id = :idAdmin', { idUser })
            .select([
                'project.id AS idProject',
                'project.name AS projectName',
                'project.description AS projectDescription',
                'project.startDate AS startDate',
                'project.endDate AS endDate',
                'project.projectType AS projectType',
                'projectCity.name AS cityName',
                'projectProvince.name AS provinceName',
            ])
            .getRawMany();

        return projects.map((project) => {
            const readProjectDto = new ReadProjectDto();
            readProjectDto.idProject = project.idProject;
            readProjectDto.projectName = project.projectName;
            readProjectDto.projectDescription = project.projectDescription;
            readProjectDto.startDate = project.startDate;
            readProjectDto.endDate = project.endDate;
            readProjectDto.projectType = project.projectType;
            readProjectDto.cityName = project.cityName;
            readProjectDto.provinceName = project.provinceName;
            return readProjectDto;
        });
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
    async updateProjectById(
        idProject: number,
        updateProjectDto: UpdateProjectDto,
    ) {
        throw new Error('Method not implemented.');
    }
    async removeProjectById(idProject: number) {
        throw new Error('Method not implemented.');
    }
}
