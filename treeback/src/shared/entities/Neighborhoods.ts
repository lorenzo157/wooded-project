import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { NeighborhoodCoordinate } from './NeighborhoodCoordinate';
import { Cities } from './Cities';
import { Trees } from '../../tree/entities/Trees';
import { UnitWork } from '../../unitwork/entities/UnitWork';

@Index('neighborhoods_pkey', ['idNeighborhood'], { unique: true })
@Entity('neighborhoods', { schema: 'public' })
export class Neighborhoods {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_neighborhood' })
  idNeighborhood: number;

  @Column('character varying', { name: 'neighborhood_name', length: 40 })
  neighborhoodName: string;

  @Column('numeric', {
    name: 'neighborhood_metres',
    nullable: true,
    precision: 8,
    scale: 2,
  })
  neighborhoodMetres: string | null;

  @OneToMany(() => NeighborhoodCoordinate, (neighborhoodCoordinate) => neighborhoodCoordinate.neighborhood)
  neighborhoodCoordinates: NeighborhoodCoordinate[];

  @ManyToOne(() => Cities, (cities) => cities.neighborhoods)
  @JoinColumn([{ name: 'city_id', referencedColumnName: 'idCity' }])
  city: Cities;

  @OneToMany(() => Trees, (trees) => trees.neighborhood)
  trees: Trees[];

  @OneToMany(() => UnitWork, (unitWork) => unitWork.neighborhood)
  unitWorks: UnitWork[];
}
