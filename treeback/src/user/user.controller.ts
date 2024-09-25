import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    //UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
//import { JwtAuthGuard } from '../auth/jwt-auth.guard';
//import { RolesGuard } from '../auth/roles.guard';
//import { Roles } from '../auth/roles.decorator';

//UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post()
    //@Permissions('gestor', 'administrador')
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Get()
    async findAllUser() {
        return this.userService.findAllUser();
    }

    @Get(':idUser')
    async findUserById(@Param('idUser') idUser: number) {
        return this.userService.findUserById(idUser);
    }

    @Patch(':idUser')
    async updateUserById(
        @Param('idUser') idUser: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.userService.updateUserById(idUser, updateUserDto);
    }

    @Delete(':idUser')
    async removeUserById(@Param('idUser') idUser: number) {
        return this.userService.removeUserById(idUser);
    }
}
