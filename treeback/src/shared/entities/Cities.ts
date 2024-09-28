import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Provinces } from './Provinces';
import { Neighborhoods } from './Neighborhoods';
import { Projects } from '../../project/entities/Projects';
import { Users } from '../../user/entities/Users';

@Index('cities_pkey', ['idCity'], { unique: true })
@Entity('cities', { schema: 'public' })
export class Cities {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_city' })
  idCity: number;

  @Column('character varying', { name: 'city_name', length: 40 })
  cityName: string;

  @ManyToOne(() => Provinces, (provinces) => provinces.cities)
  @JoinColumn([{ name: 'province_id', referencedColumnName: 'idProvince' }])
  province: Provinces;

  @OneToMany(() => Neighborhoods, (neighborhoods) => neighborhoods.city)
  neighborhoods: Neighborhoods[];

  @OneToMany(() => Projects, (projects) => projects.city)
  projects: Projects[];

  @OneToMany(() => Users, (users) => users.city)
  users: Users[];
}
