import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Users } from './entities/Users'; // Asegúrate de que es el nombre correcto de tu entidad
import { ProjectUser } from '../project/entities/ProjectUser';
import { Projects } from '../project/entities/Projects';
import { Cities } from '../shared/entities/Cities';
import { Provinces } from '../shared/entities/Provinces';
import { Roles } from './entities/Roles';
import { RolePermission } from './entities/RolePermission';
import { Permissions } from './entities/Permissions';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, ProjectUser, Projects, Cities, Provinces, Roles, RolePermission, Permissions]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
