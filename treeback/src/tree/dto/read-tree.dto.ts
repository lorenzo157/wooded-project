import { DefectTreeDto } from './defect-tree.dto';
import { TreeTypeDto } from './tree-type.dto';

export class ReadTreeDto {
  idTree: number;
  treeName: string;
  datetime: Date;
  pathPhoto: string | null;
  cityBlock: number;
  perimeter: number | null;
  height: number | null;
  incline: number | null;
  treesInTheBlock: number | null;
  useUnderTheTree: string | null;
  frequencyUse: number | null;
  potentialDamage: number | null;
  isMovable: boolean | null;
  isRestrictable: boolean | null;
  isMissing: boolean | null;
  isDead: boolean | null;
  exposedRoots: boolean | null;
  dch: number | null;
  windExposure: string | null;
  vigor: string | null;
  canopyDensity: string | null;
  growthSpace: string | null;
  treeValue: string | null;
  streetMateriality: string | null;
  risk: number | null;
  address: string;
  conflictsNames: string[];
  defectDto: DefectTreeDto[];
  diseasesNames: string[];
  interventionsNames: string[];
  pestsNames: string[];
  latitude: number;
  longitude: number;
  // RECORDAR QUITAR EL NULL CUANDO SE CREE EL TRIGGER DE DETECCCION AUTOMATICA DE BARRIO
  neighborhoodName: string;
  treeTypeDto: TreeTypeDto;
}
