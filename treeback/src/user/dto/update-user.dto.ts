export class UpdateUserDto {
  idUser: number;
  userName: string;
  lastName: string;
  email: string;
  password: string;
  phonenumber: string | null;
  address: string | null;
  cityName: string;
  provinceName: string;
  //projects: ProjectUserDto[] | [];
  city: any;
  projectUsers: any;
}
