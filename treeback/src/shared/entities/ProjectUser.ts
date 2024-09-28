import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Projects } from '../../project/entities/Projects';
import { Users } from '../../user/entities/Users';

@Index('project_user_pkey', ['idProjectUser'], { unique: true })
@Index('unique_user_project', ['projectId', 'userId'], { unique: true })
@Entity('project_user', { schema: 'public' })
export class ProjectUser {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id_project_user' })
  idProjectUser: number;

  @Column('integer', { name: 'user_id', unique: true })
  userId: number;

  @Column('integer', { name: 'project_id', unique: true })
  projectId: number;

  @ManyToOne(() => Projects, (projects) => projects.projectUsers)
  @JoinColumn([{ name: 'project_id', referencedColumnName: 'idProject' }])
  project: Projects;

  @ManyToOne(() => Users, (users) => users.projectUsers)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'idUser' }])
  user: Users;
}
