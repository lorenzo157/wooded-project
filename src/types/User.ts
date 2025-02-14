import { LatLng } from "./Neighborhood";

export interface User {  idUser: string;  userName: string;  lastName: string;  email: string; password: string;}

export enum UserCityRole {
  Admin = "admin",
  Manager = "manager",
}

export interface UserCity {
  id: number;
  name: string;
  center?: LatLng;
  zoom?: number;
  role?: UserCityRole;
}
