export class UpdateUserDto {
  idUser: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phonenumber: string | null;
  address: string | null;
  cityName: string;
  provinceName: string;
  city: any;
  projectUsers: any;
}
