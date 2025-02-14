export interface Project {
  idProject?: number;
  projectName: string;
  projectDescription: string | null;
  startDate: string;
  endDate: string | null;
  projectType: boolean;
  cityName?: string;
  idUser?:number;
  provinceName?:string;
}
export interface User {
  idUser?: number;
  userName: string;
  lastName: string;
  email: string;
  password?: string;
  phoneNumber?: string | null;
  address?: string | null;
  idRole?: number;
}
// Interface para el usuario que incluye proyectos
export interface UserWithProjects extends User {
  projects: Project[];
}

export interface UnidadDeTrabajo {
  idUnitWork?: number;
  projectId: number;
  neighborhoodId: number;
  neighborhoodName: string;
  pruningTraining?: number;
  pruningSanitary?: number;
  pruningHeightReduction?: number;
  pruningBranchThinning?: number;
  pruningSignClearing?: number;
  pruningPowerLineClearing?: number;
  pruningRootDeflectors?: number;
  moveTarget?: number;
  restrictAccess?: number;
  cabling?: number;
  fastening?: number;
  propping?: number;
  permeableSurfaceIncreases?: number;
  fertilizations?: number;
  descompression?: number;
  drains?: number;
  extractions?: number;
  plantations?: number;
  openingsPot?: number;
  advancedInspections?: number;
}
// export interface CreateCampaignDto {
//   projectName?: string;
//   campaignDescription: string;
//   pruning?: number;
//   cabling?: number;
//   fastening?: number;
//   propping?: number;
//   permeableSurfaceIncreases?: number;
//   fertilizations?: number;
//   drains?: number;
//   extractions?: number;
//   plantations?: number;
//   openingsPot?: number;
//   advancedInspections?: number;
//   idUnitWork?: number;
// }
export interface ReadUnitWorkDto {
  idUnitWork: number;
  projectId: number;
  neighborhoodId: number;
  neighborhoodName: string;
  pruningTraining: number;
  pruningSanitary: number;
  pruningHeightReduction: number;
  pruningBranchThinning: number;
  pruningSignClearing: number;
  pruningPowerLineClearing: number;
  pruningRootDeflectors: number;
  moveTarget?: number;
  restrictAccess?: number;
  cabling: number;
  fastening: number;
  propping: number;
  permeableSurfaceIncreases: number;
  fertilizations: number;
  descompression: number;
  drains: number;
  extractions: number;
  plantations: number;
  openingsPot: number;
  advancedInspections: number;
  campaignDescription: string;
}

export interface UpdateCampaignDto {
  projectName: string;
  campaignDescription: string;
  pruningTraining: number;
  pruningSanitary: number;
  pruningHeightReduction: number;
  pruningBranchThinning: number;
  pruningSignClearing: number;
  pruningPowerLineClearing: number;
  pruningRootDeflectors: number;
  moveTarget?: number;
  restrictAccess?: number;
  cabling: number;
  fastening: number;
  propping: number;
  permeableSurfaceIncreases: number;
  fertilizations: number;
  descompression: number;
  drains: number;
  extractions: number;
  plantations: number;
  openingsPot: number;
  advancedInspections: number;
}

export interface Arboles {
  idTree: number;
  address: string;
  datetime: number;
  treeValue: string;
  treeName: string;
  risk: string;
  lat: number;
  lng: number;
}

export interface ArbolesDetalles {
  idTree: number;
  treeName: string;
  datetime: Date;
  pathPhoto: string | null;
  cityBlock: number;
  perimeter: number | null;
  height: number | null;
  incline: number | null;
  treeInTheBlock: number | null;
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
  neighborhoodName: string;
  treeTypeName: string;
  gender?: string;
  species?: string;
  scientificName?: string;
}
export interface DefectTreeDto {
  defectName: string;
  defectValue: number;
  textDefectValue: string;
  branches: number | null;
}
export interface Coordenadas {
  idTree: number;
  latitude: number;
  longitude: number;
}


export type Filter = Record<string, string[]>;

export enum IsDead {
  Dead = "Dead",
  Alive = "Alive",
}

export enum IsMissing {
  Missing = "Missing",
  Present = "Present",
}

export enum Diseases {
  Fungus = "Fungus",
  Bacteria = "Bacteria",
  Virus = "Virus",
  Other = "Other",
}

export enum ExposedRoots {
  Yes = "Yes",
  No = "No",
}

export enum Species {
  Oak = "Oak",
  Pine = "Pine",
  Maple = "Maple",
}

export enum Pests {
  Insects = "Insects",
  Rodents = "Rodents",
  Birds = "Birds",
  Other = "Other",
}

export enum TreeValue {
  High = "High",
  Medium = "Medium",
  Low = "Low",
}

export enum Conflicts {
  PowerLine = "Power Line",
  Building = "Building",
  Road = "Road",
  Other = "Other",
}

export enum WindExposure {
  High = "High",
  Medium = "Medium",
  Low = "Low",
}

export enum Vigor {
  Strong = "Strong",
  Moderate = "Moderate",
  Weak = "Weak",
}

export enum CanopyDensity {
  Dense = "Dense",
  Sparse = "Sparse",
}

export enum GrowthSpace {
  Ample = "Ample",
  Limited = "Limited",
}

export enum Risk {
  High = "High",
  Medium = "Medium",
  Low = "Low",
}

export enum Intervention {
  None = "None",
  Pruning = "Pruning",
  Removal = "Removal",
  Treatment = "Treatment",
}

export enum StreetMateriality {
  Concrete = "Concrete",
  Asphalt = "Asphalt",
  Gravel = "Gravel",
  Other = "Other",
}

export interface FilterNames {
  isDead: IsDead[];
  isMissing: IsMissing[];
  diseases: Diseases[];
  exposedRoots: ExposedRoots[];
  species: Species[];
  pests: Pests[];
  treeValue: TreeValue[];
  conflicts: Conflicts[];
  windExposure: WindExposure[];
  vigor: Vigor[];
  canopyDensity: CanopyDensity[];
  growthSpace: GrowthSpace[];
  risk: Risk[];
  intervention: Intervention[];
  streetMateriality: StreetMateriality[];
}
// FilterEnums.ts
export enum FilterName {
  IsDead = "isDead",
  IsMissing = "isMissing",
  Diseases = "diseases",
  ExposedRoots = "exposedRoots",
  Species = "species",
  Pests = "pests",
  TreeValue = "treeValue",
  Conflicts = "conflicts",
  WindExposure = "windExposure",
  Vigor = "vigor",
  CanopyDensity = "canopyDensity",
  GrowthSpace = "growthSpace",
  Risk = "risk",
  Intervention = "intervention",
  StreetMateriality = "streetMateriality",
}

// Traducción de los nombres de los filtros
export const FilterLabels: Record<FilterName, string> = {
  [FilterName.IsDead]: "Está muerto",
  [FilterName.IsMissing]: "Está ausente",
  [FilterName.Diseases]: "Enfermedades",
  [FilterName.ExposedRoots]: "Raíces expuestas",
  [FilterName.Species]: "Especies",
  [FilterName.Pests]: "Plagas",
  [FilterName.TreeValue]: "Valor del árbol",
  [FilterName.Conflicts]: "Conflictos",
  [FilterName.WindExposure]: "Exposición al viento",
  [FilterName.Vigor]: "Vigor",
  [FilterName.CanopyDensity]: "Densidad de copa",
  [FilterName.GrowthSpace]: "Espacio de crecimiento",
  [FilterName.Risk]: "Riesgo",
  [FilterName.Intervention]: "Intervención",
  [FilterName.StreetMateriality]: "Materialidad de la calle",
};