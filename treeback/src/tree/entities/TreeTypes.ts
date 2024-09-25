import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Trees } from './Trees';

@Index('tree_types_pkey', ['idTreeType'], { unique: true })
@Entity('tree_types', { schema: 'public' })
export class TreeTypes {
    @PrimaryGeneratedColumn({ type: 'integer', name: 'id_tree_type' })
    idTreeType: number;

    @Column('character varying', { name: 'tree_type_name', length: 80 })
    treeTypeName: string;

    @Column('character varying', { name: 'gender', nullable: true, length: 80 })
    gender: string | null;

    @Column('character varying', {
        name: 'species',
        nullable: true,
        length: 80,
    })
    species: string | null;

    @Column('character varying', {
        name: 'scientific_name',
        nullable: true,
        length: 80,
    })
    scientificName: string | null;

    @OneToMany(() => Trees, (trees) => trees.treeType)
    trees: Trees[];
}
