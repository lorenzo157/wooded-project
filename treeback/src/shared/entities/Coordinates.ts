import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { NeighborhoodCoordinate } from './NeighborhoodCoordinate';
import { Trees } from '../../tree/entities/Trees';

@Index('coordinates_pkey', ['idCoordinate'], { unique: true })
@Entity('coordinates', { schema: 'public' })
export class Coordinates {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id_coordinate' })
    idCoordinate: number;

    @Column('numeric', {
        name: 'longitude',
        nullable: true,
        precision: 3,
        scale: 10,
    })
    longitude: string;

    @Column('numeric', {
        name: 'latitude',
        nullable: true,
        precision: 3,
        scale: 10,
    })
    latitude: string;

    @OneToMany(
        () => NeighborhoodCoordinate,
        (neighborhoodCoordinate) => neighborhoodCoordinate.coordinate,
    )
    neighborhoodCoordinates: NeighborhoodCoordinate[];

    @OneToMany(() => Trees, (trees) => trees.coordinate)
    trees: Trees[];
}
