import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitWorkService } from './unitwork.service';
import { UnitWorkController } from './unitwork.controller';
import { UnitWork } from './entities/UnitWork';
import { Projects } from '../project/entities/Projects';
import { Neighborhoods } from '../shared/entities/Neighborhoods';
import { NeighborhoodCoordinate } from '../shared/entities/NeighborhoodCoordinate';
import { Coordinates } from '../shared/entities/Coordinates';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UnitWork,
            Projects,
            Neighborhoods,
            NeighborhoodCoordinate,
            Coordinates,
        ]),
    ],
    providers: [UnitWorkService],
    controllers: [UnitWorkController],
    exports: [UnitWorkService], // Si lo necesitas fuera de este módulo
})
export class UnitWorkModule {}
