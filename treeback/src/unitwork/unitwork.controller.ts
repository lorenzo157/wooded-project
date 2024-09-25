import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { UnitWorkService } from './unitwork.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';

@Controller('project/:idProject/unitwork/:idUnitWork')
export class UnitWorkController {
    constructor(private readonly unitworkService: UnitWorkService) {}

    // Endpoint to fetch unit work assigned with the idProject
    @Get()
    async findAllUnitWorksByIdProject(@Param('idProject') idProject: number) {
        return this.unitworkService.findAllUnitWorksByIdProject(idProject);
    }
    // generate unitwork for current project
    @Post()
    async generateUnitWorksToProject(@Param('idProject') idProject: number) {
        await this.unitworkService.generateUnitWorksToProject(idProject);
        return this.findAllUnitWorksByIdProject(idProject);
    }

    @Post('campaign')
    async createCampaign(@Body() createCampaignDto: CreateCampaignDto) {
        return this.unitworkService.createCampaign(createCampaignDto);
    }

    // Endpoint to fetch alll the campaigns associated with the idUnitWork
    @Get('campaign')
    async findAllCampaignsByIdUnitWork(
        @Param('idUnitWork') idUnitWork: number,
    ) {
        return this.unitworkService.findAllCampaignsByIdUnitProject(idUnitWork);
    }

    //UPDATE   remember: idCampaing is the same property as idUnitWork in data base table
    @Patch('campaign/:idCampaign')
    async updateCampaignById(
        @Param('idCampaign') idCampaign: number,
        @Body() updateCampaignDto: UpdateCampaignDto,
    ) {
        return this.unitworkService.updateCampaignById(
            idCampaign,
            updateCampaignDto,
        );
    }

    @Delete('campaign/:idCampaign')
    async removeProjectById(@Param('idCampaign') idCampaign: number) {
        return this.unitworkService.removeCampaignById(idCampaign);
    }
}
