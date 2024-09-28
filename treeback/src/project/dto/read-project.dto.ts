import { Exclude, Expose } from 'class-transformer';

export class ReadProjectDto {
  @Expose()
  idProject: number;
  @Expose()
  projectName: string;
  @Expose()
  projectDescription: string | null;
  @Expose()
  startDate: string;
  @Expose()
  endDate: string | null;
  @Expose()
  projectType: boolean;
  @Expose()
  cityName: string | null;
  @Expose()
  provinceName: string | null;
  @Exclude()
  user: any;
  @Exclude()
  trees: any;
  @Exclude()
  city: any;
}
