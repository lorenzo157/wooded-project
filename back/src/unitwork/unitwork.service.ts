import { Injectable } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { UnitWork } from './entities/UnitWork';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UnitWorkService {
  constructor(
    @InjectRepository(UnitWork)
    private readonly unitWorkRepository: Repository<UnitWork>,
  ) {}
  async findAllUnitWorksByIdProject(idProject: number) {
    throw new Error('Method not implemented.');
  }
  async generateUnitWorksToProject(idProject: number) {
    throw new Error('Method not implemented.');
  }
  async createCampaign(createCampaignDto: CreateCampaignDto) {
    throw new Error('Method not implemented.');
  }
  async updateCampaignById(idCampaign: number, updateCampaignDto: UpdateCampaignDto) {
    throw new Error('Method not implemented.');
  }
  async findAllCampaignsByIdUnitProject(idUnitWork: number) {
    throw new Error('Method not implemented.');
  }

  async removeCampaignById(idCampaign: number) {
    throw new Error('Method not implemented.');
  }
}
