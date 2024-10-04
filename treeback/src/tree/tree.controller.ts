import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TreeService } from './tree.service';
import { CreateTreeDto } from './dto/create-tree.dto';

@Controller('project/:idProject/tree')
export class TreeController {
  constructor(private readonly treeService: TreeService) {}

  // CREATE a new tree for a specific project
  @Post()
  async createTree(@Body() createTreeDto: CreateTreeDto) {
    return this.treeService.createTree(createTreeDto);
  }

  // READ, Fetch all trees associated with a specific project, but only general atributes not specific
  @Get()
  async findAllTreesByIdProject(@Param('idProject') idProject: number) {
    return this.treeService.findAllTreesByIdProject(idProject);
  }

  // READ, Fetch a specific tree with all the properties includes relationship by idTree
  @Get(':idTree')
  async getTreeById(@Param('idTree') idTree: number) {
    return this.treeService.findTreeById(idTree);
  }
  @Put(':idTree')
  async updateTreeById(@Param('idTree') idTree: number, @Body() updateTreeDto: CreateTreeDto) {
    return this.treeService.updateTreeById(idTree, updateTreeDto); // Convert id to number and pass it to the service
  }

  //DELETE tree by id
  @Delete(':idTree')
  async removeTreeById(@Param('idTree') idTree: number) {
    return this.treeService.removeTreeById(idTree);
  }
}
