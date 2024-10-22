import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Projects } from './entities/Projects';
import { Trees } from '../tree/entities/Trees';
import { Users } from '../user/entities/Users';
import { ProjectUser } from './entities/ProjectUser';
import { Cities } from '../shared/entities/Cities';
import { UnitWork } from '../unitwork/entities/UnitWork';
import { Neighborhoods } from '../shared/entities/Neighborhoods';
import { Provinces } from '../shared/entities/Provinces';

@Module({
  imports: [TypeOrmModule.forFeature([Projects, Trees, Users, ProjectUser, Cities, UnitWork, Neighborhoods, Provinces])],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule {}
