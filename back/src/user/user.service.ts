import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReadUserDto } from './dto/read-user.dto';
import { Users } from './entities/Users';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Cities } from '../shared/entities/Cities';
import { Roles } from '../auth/entities/Roles';
import { Provinces } from '../shared/entities/Provinces';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Provinces)
    private readonly provinceRepository: Repository<Provinces>,
    @InjectRepository(Cities)
    private readonly cityRepository: Repository<Cities>,
    @InjectRepository(Roles)
    private roleRepository: Repository<Roles>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const { email, password, provinceName, cityName, roleName, ...userData} = createUserDto;

    // Check if the email is already in use
    const existingUser = await this.userRepository.findOne({ where: { email: email } });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const province = await this.provinceRepository.findOne({ where: { provinceName: provinceName } });
    if (!province) {
      throw new BadRequestException('Province not found');
    }
    // Find the city by name within the given province
    const city = await this.cityRepository.findOne({ 
      where: { cityName: cityName, province: province } 
    });
    if (!city) {
      throw new BadRequestException('City not found in the specified province');
    }

    const role = await this.roleRepository.findOne({ where: { roleName: roleName } });
    if (!role) {
      throw new BadRequestException('Role not found');
    }

    // Hash the password
    const hashedPassword = await this.hashPassword(password);

    // Create the new user entity
    const newUser = this.userRepository.create({
      ...userData,
      email: email,
      password: hashedPassword,
      city: city,
      role: role,
    });

    // Save the user to the database
    return this.userRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<Users | undefined> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    return user;
  }

  async findAllUser() {
    throw new Error('Method not implemented.');
  }
  async findUserById(idUser: number): Promise<Users> {
    return await this.userRepository.findOne({
      where: { idUser: idUser },
    });
  }
  async removeUserById(idUser: number) {
    throw new Error('Method not implemented.');
  }
  async updateUserById(idUser: number, updateUserDto: UpdateUserDto) {
    throw new Error('Method not implemented.');
  }
  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Higher values are more secure but slower
    return bcrypt.hash(password, saltRounds);
  }
}
