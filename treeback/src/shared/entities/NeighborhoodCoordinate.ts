import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Coordinates } from './Coordinates';
import { Neighborhoods } from './Neighborhoods';

@Index('unique_coordinate_neighborhood', ['coordinateId', 'neighborhoodId'], {
  unique: true,
})
@Index('neighborhood_coordinate_pkey', ['idNeighborhoodCoordinate'], {
  unique: true,
})
@Entity('neighborhood_coordinate', { schema: 'public' })
export class NeighborhoodCoordinate {
  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id_neighborhood_coordinate',
  })
  idNeighborhoodCoordinate: number;

  @Column('integer', { name: 'coordinate_id', unique: true })
  coordinateId: number;

  @Column('integer', { name: 'neighborhood_id', unique: true })
  neighborhoodId: number;

  @ManyToOne(() => Coordinates, (coordinates) => coordinates.neighborhoodCoordinates)
  @JoinColumn([{ name: 'coordinate_id', referencedColumnName: 'idCoordinate' }])
  coordinate: Coordinates;

  @ManyToOne(() => Neighborhoods, (neighborhoods) => neighborhoods.neighborhoodCoordinates)
  @JoinColumn([{ name: 'neighborhood_id', referencedColumnName: 'idNeighborhood' }])
  neighborhood: Neighborhoods;
}
