import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Users } from './entities/Users'; // Asegúrate de que es el nombre correcto de tu entidad
import { ProjectUser } from '../shared/entities/ProjectUser';
import { Projects } from '../project/entities/Projects';
import { Cities } from '../shared/entities/Cities';
import { Provinces } from '../shared/entities/Provinces';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Users,
            ProjectUser,
            Projects,
            Cities,
            Provinces,
        ]),
    ], // Importa el repositorio
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService], // Si lo necesitas fuera de este módulo
})
export class UserModule {}
