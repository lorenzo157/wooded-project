import { ReadDefectTreeDto } from './read-defect-tree.dto';

export class ReadTreeDto {
  idTree!: number;
  datetime!: Date;
  photoFileName!: string;
  cityBlock!: number;
  perimeter!: number;
  height!: number;
  incline!: number;
  treesInTheBlock!: number;
  useUnderTheTree!: string;
  frequencyUse!: number;
  potentialDamage!: number;
  isMovable!: boolean;
  isRestrictable!: boolean;
  isMissing!: boolean;
  isDead!: boolean;
  exposedRoots!: boolean;
  dch!: number;
  windExposure!: string;
  vigor!: string;
  canopyDensity!: string;
  growthSpace!: string;
  treeValue!: string;
  streetMateriality!: string;
  risk!: number;
  address!: string;
  conflictsNames!: string[];
  readDefectDto!: ReadDefectTreeDto[];
  diseasesNames!: string[];
  interventionsNames!: string[];
  pestsNames!: string[];
  latitude!: number;
  longitude!: number;
  neighborhoodName!: string;
  treeTypeName?: string;
  gender?: string;
  species?: string;
  scientificName?: string;
}
