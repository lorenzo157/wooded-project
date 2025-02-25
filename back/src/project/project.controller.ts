import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';


@Controller('project')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // Create a new project in web application and assigned it with creator user
  @Post()
  //@Roles('gestor', 'administrador')
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createProject(createProjectDto);
  }

  // Endpoint to fetch all the projects that have been assigned with "inspector" user in movil aplication
  @Get('assignedproject/:idUser')
  async findAllAssignedProjectsToUser(@Param('idUser') idUser: number) {
    return this.projectService.findAllAssignedProjectsToUser(idUser);
  }

  // Endpoint to fetch projects that have been created by "gestor" or "adiministrador" users in web application
  @Get('createdproject/:idAdmin')
  async findAllCreatedProjectsByUser(@Param('idAdmin') idAdmin: number) {
    return this.projectService.findAllCreatedProjectsByUser(idAdmin);
  }

  @Get(':idProject/assigneduser')
  async findAllAssignedUsersToProject(@Param('idProject') idProject: number) {
    return this.projectService.findAllAssignedUsersToProject(idProject);
  }
  @Post(':idProject/assigneduser/:idUser')
  async assignUserToProject(@Param('idProject') idProject: number, @Param('idUser') idUser: number) {
    return this.projectService.assignUserToProject(idProject, idUser);
  }
  @Delete(':idProject/assigneduser/:idUser')
  async removeUserFromProject(@Param('idProject') idProject: number, @Param('idUser') idUser: number) {
    return this.projectService.removeUserFromProject(idProject, idUser);
  }
  @Patch(':idProject')
  async updateProjectById(@Param('idProject') idProject: number, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.updateProjectById(idProject, updateProjectDto);
  }

  @Delete(':idProject')
  async removeProjectById(@Param('idProject') idProject: number) {
    return this.projectService.removeProjectById(idProject);
  }
  @Get(':idProject')
  async findProjectById(@Param('idProject') idProject: number) {
    return this.projectService.findProjectById(idProject);
  }
}
