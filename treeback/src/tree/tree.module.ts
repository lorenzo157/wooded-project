import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreeService } from './tree.service';
import { TreeController } from './tree.controller';
import { Trees } from './entities/Trees'; // Asegúrate de que es el nombre correcto de tu entidad
import { Projects } from '../project/entities/Projects';
import { Conflicts } from './entities/Conflicts';
import { ConflictTree } from './entities/ConflictTree';
import { Coordinates } from './entities/Coordinates';
import { Defects } from './entities/Defects';
import { DefectTree } from './entities/DefectTree';
import { Diseases } from './entities/Diseases';
import { DiseaseTree } from './entities/DiseaseTree';
import { Interventions } from './entities/Interventions';
import { InterventionTree } from './entities/InterventionTree';
import { Pests } from './entities/Pests';
import { PestTree } from './entities/PestTree';
import { TreeTypes } from './entities/TreeTypes';
import { Neighborhoods } from '../shared/entities/Neighborhoods';
import { NeighborhoodCoordinate } from '../shared/entities/NeighborhoodCoordinate';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Conflicts,
            ConflictTree,
            Coordinates,
            Defects,
            DefectTree,
            Diseases,
            DiseaseTree,
            Interventions,
            InterventionTree,
            Pests,
            PestTree,
            Trees,
            TreeTypes,
            Projects,
            Neighborhoods,
            NeighborhoodCoordinate,
        ]),
    ], // Importa el repositorio
    providers: [TreeService],
    controllers: [TreeController],
    exports: [TreeService], // Si lo necesitas fuera de este módulo
})
export class TreeModule {}
