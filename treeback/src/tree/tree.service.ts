import { Injectable } from '@nestjs/common';
import { CreateTreeDto } from './dto/create-tree.dto';
import { UpdateTreeDto } from './dto/update-tree.dto';
import { Repository } from 'typeorm';
import { Trees } from './entities/Trees';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class TreeService {
    constructor(
        @InjectRepository(Trees)
        private readonly treeRepository: Repository<Trees>,
    ) {}

    async createTree(createTreeDto: CreateTreeDto) {
        throw new Error('Method not implemented.');
    }
    // Find all Trees created by a user or associated with a user through ProjectUser
    async findAllTreesByIdProject(idProject: number): Promise<Trees[]> {
        throw new Error('Method not implemented.');
    }

    async findTreeById(idTree: number) {
        throw new Error('Method not implemented.');
    }

    async updateTreeById(idTree: number, updateTreeDto: UpdateTreeDto) {
        throw new Error('Method not implemented.');
    }

    async removeTreeById(idTree: number) {
        throw new Error('Method not implemented.');
    }
}
