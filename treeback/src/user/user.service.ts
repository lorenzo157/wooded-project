import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadUserDto } from './dto/read-user.dto';
import { ReadProjectDto } from '../project/dto/read-project.dto';
import { Users } from './entities/Users';
import { ProjectUser } from '../shared/entities/ProjectUser';
import { plainToInstance } from 'class-transformer';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    throw new Error('Method not implemented.');
  }
  async findByEmail(email: string): Promise<Users | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }
  async findAllUser() {
    throw new Error('Method not implemented.');
  }
  async findUserById(idUser: number) {
    throw new Error('Method not implemented.');
  }
  async removeUserById(idUser: number) {
    throw new Error('Method not implemented.');
  }
  async updateUserById(idUser: number, updateUserDto: UpdateUserDto) {
    throw new Error('Method not implemented.');
  }
  // async findById(idUser: number): Promise<Users | undefined> {
  //     const user = await this.userRepository.findOne({
  //         where: { idUser },
  //         relations: ['projectUsers', 'projectUsers.project'],
  //     });
  //     if (!user) {
  //         throw new Error('User not found');
  //     }

  //     const projectDtosPlain = plainToInstance(
  //         ReadProjectDto,
  //         user.projectUsers.map((projectUser: ProjectUser) => {
  //             const project = projectUser.project;
  //             return {
  //                 idProject: project.idProject,
  //                 projectName: project.projectName,
  //                 projectDescription: project.projectDescription,
  //                 startDate: project.startDate,
  //                 endDate: project.endDate,
  //                 projectType: project.projectType,
  //                 cityName: project.city.cityName,
  //                 provinceName: project.city.province.provinceName,
  //             };
  //         }),
  //         { excludeExtraneousValues: true },
  //     );

  //     const userDto = plainToInstance(
  //         UserDto,
  //         {
  //             idUser: user.idUser,
  //             userName: user.userName,
  //             lastName: user.lastName,
  //             email: user.email,
  //             password: user.password,
  //             phonenumber: user.phonenumber,
  //             address: user.address,
  //             cityName: user.city?.cityName,
  //             provinceName: user.city?.province?.provinceName,
  //             projects: projectDtosPlain,
  //         },
  //         { excludeExtraneousValues: true },
  //     );

  //     return userDto;
  // }
}
