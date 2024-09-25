import { Exclude, Expose } from 'class-transformer';

export class ReadUserDto {
    idUser: number;
    @Expose()
    userName: string;
    @Expose()
    lastName: string;
    @Expose()
    email: string;
    @Expose()
    password: string;
    @Expose()
    phonenumber: string | null;
    @Expose()
    address: string | null;
    @Expose()
    cityName: string;
    @Expose()
    provinceName: string;
    //@Expose()
    //projects: ProjectUserDto[] | [];
    @Exclude()
    city: any;
    @Exclude()
    projectUsers: any;
}
