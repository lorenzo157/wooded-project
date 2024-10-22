import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectUser } from '../../shared/entities/ProjectUser';
import { Projects } from '../../project/entities/Projects';
import { Cities } from '../../shared/entities/Cities';
import { Roles } from '../../auth/entities/Roles';

@Index('unique_email', ['email'], { unique: true })
@Index('users_pkey', ['idUser'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_user' })
  idUser: number;

  @Column('character varying', { name: 'user_name', length: 50 })
  userName: string;

  @Column('character varying', { name: 'last_name', length: 50 })
  lastName: string;

  @Column('character varying', { name: 'email', unique: true, length: 255 })
  email: string;

  @Column('character varying', { name: 'password', length: 255 })
  password: string;

  @Column('character varying', {
    name: 'phonenumber',
    nullable: true,
    length: 50,
  })
  phonenumber: string | null;

  @Column('character varying', {
    name: 'address',
    nullable: true,
    length: 50,
  })
  address: string | null;

  @OneToMany(() => ProjectUser, (projectUser) => projectUser.user)
  projectUsers: ProjectUser[];

  @OneToMany(() => Projects, (projects) => projects.user)
  projects: Projects[];

  @ManyToOne(() => Cities, (cities) => cities.users)
  @JoinColumn([{ name: 'city_id', referencedColumnName: 'idCity' }])
  city: Cities;

  @ManyToOne(() => Roles, (roles) => roles.users)
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'idRole' }])
  role: Roles;
}
