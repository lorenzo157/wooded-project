import { Neighborhood } from "./Neighborhood";
import { Coordinate } from "./Neighborhood";

export enum WindExposure {
  EXPUESTO = "expuesto",
  PARCIALMENTE_EXPUESTO = "parcialmente expuesto",
  PROTEGIDO = "protegido",
  TUNEL_DE_VIENTO = "tunel de viento",
}

export enum VigorType {
  EXCELENTE = "excelente",
  NORMAL = "normal",
  POBRE = "pobre",
}

export enum CanopyDensityType {
  ESCASA = "escasa",
  NORMAL = "normal",
  DENSA = "densa"
}

export enum GrowthSpaceType {
  SIN_CAZUELA = "sin cazuela",
  CAZUELA_IGUAL_1_A_2_M2 = "cazuela = 1 - 2 m2",
  CAZUELA_MENOR_A_2_M2 = "cazuela > 2 m2",
  VEREDA_JARDIN = "vereda jardín"
}

export enum TreeValueType {
  HISTORICO = "historico",
  MONUMENTAL = "monumental",
  SINGULAR = "singular",
  NOTABLE = "notable",
  PLAZA_O_PARQUE_ORNAMENTAL = "plaza/parque (ornamental)",
  RECLAMO = "reclamo"
}

export interface DefectTree {
  defectName: string;
  defectValue: number;
  textDefectValue: string;
  branches: number;
}


export enum StreetMaterialityType {
  TIERRA = "tierra",
  MEJORADO_PETROLEO = "mejorado petroleo",
  ASFALTO = "asfalto",
  CONCRETO = "concreto",
  CORDON_CUNETA = "cordon cuneta", 
}

export interface Tree {
  idTree: number;
  idNeighborhood: number;
  // coordinate: Coordinate;
  latitude: number;
  longitude: number;
  address: string;
  datetime: Date;
  isDead?: boolean;
  isMissing?: boolean;
  risk: number;
  height?: number;
  perimeter?: number;

  dch?: number;
  vigor?: string;

  treesInTheBlock?: number;
  useUnderTheTree?: string;
  frequencyUse?: number;
  potentialDamage?: number;
  isMovable?: boolean;
  isRestrictable?: boolean;
  exposedRoots?: boolean;
  windExposure?: string;
  canopyDensity?: string;
  growthSpace?: string;
  treeValue?: string;
  streetMateriality?: string;
  conflictsNames?: string[];
  defects?: DefectTree[];
  diseasesNames?: string[];
  interventionsNames?: string[];
  pestsNames?: string[];
  treeTypeName?: string;
  gender?: string;
  species?: string;
  scientificName?: string;
  color?: string;



  // windExposure?: WindExposure | null;
  // pathPhoto?: string;
  // cityBlock?: number;
  // incline?: number;
  // treesInTheBlock?: number;
  // useUnderTheTree?: string;
  // frequencyUse?: number;
  // potentialDamage?: number;
  // isMovable?: boolean;
  // isRestrictable?: boolean;

  
  


  // canopyDensity?: CanopyDensityType;
  // growthSpace?: GrowthSpaceType;
  // treeValue?: TreeValueType;
  // streetMateriality?: StreetMaterialityType;
  // treeTypeName?: string;
  // gender?: string;
  // scientificName?: string;
  // conflictTrees: ConflictTree[];;
  //defectTrees: DefectTree[];;
  //diseaseTrees: DiseaseTree[];;
  // interventionTrees: InterventionTree[];;
  // pestTrees: PestTree[];;


  // Viejo
  // tree_id: number;
  // id_neighborhood: number;
  // tree_address?: string;
  // latitude?: number;
  // longitude?: number;
  // m_date?: Date;
  // perimeter?: number;
  // DAP?: number;
  // height?: number;
  // incline?: number;
  // trees_in_the_block?: number;
  // is_dead?: boolean;
  // is_missing?: boolean;
  // diseases?: string;
  // exposed_roots?: string;
  // strata?: number;
  // species?: TreeSpecie;
  // shape?: string;
  // pest?: string;
  // tree_value?: string;
  // conflict?: string;
  // wind_exposure?: string;
  // vigor?: string;
  // canopy_density?: string;
  // growth_space?: string;
  // risk?: number;
  // intervention?: string;
  // correction_tree?: string;
  // observations?: string;
  // color?: string;
}

export interface TreeRequestData {
  neighborhoodData: Neighborhood[];
  treeData: Tree[];
}

export enum TreeSpecie {
  Tipa = "Tipa (Tipuana tipu)",
  Palo = "Palo Borracho (Ceiba sp)",
  Jacarandá = "Jacarandá (Jacaranda mimosifolia)",
  Lapacho = "Lapacho (Handroanthus sp)",
  Fresno = "Fresno (Fraxinus sp)",
  Morera = "Morera (Morus sp)",
  Sauce = "Sauce (Salix Sp)",
  AlamoPlateado = "Álamo plateado (Populus alba)",
  Chañar = "Chañar (Geoffroea decorticans)",
  Eucaliptus = "Eucaliptus (Eucalyptus globulus)",
  Laurel = "Laurel de jardin (Nerium oleander)",
  Pino = "Pino (Pinus sp)",
  AcaciaNegra = "Acacia negra (Gleditsia triacanthos)",
  Curupí = "Curupí (Sapium haematospermum)",
  Casuarina = "Casuarina (Casuarina cunninghamiana)",
  Acer = "Acer negundo (Acer negundo)",
  Timbó = "Timbó (Enterolobium contortisiliquum)",
  Cina = "Cina cina (Parkisonia acuelata)",
  Aromito = "Aromito (Vachellia caven)",
  Ceibo = "Ceibo (Erythrina crista-galli)",
  Ibirá = "Ibirá pitá (Peltophorum dubium)",
  Crespón = "Crespón (Lagerstroemia indica)",
  Liquidambar = "Liquidambar (Liquidambar styraciflua)",
  Palmera = "Palmera Pindó (Syagrus romanzoffiana)",
  Tilo = "Tilo (Tilia platyphyllos)",
  Aguaribay = "Aguaribay (Schinus areira)",
  SauceElectrico = "Sauce eléctrico (Salix × erythroflexuosa) ",
  PezuñaDeVaca = "Pezuña de vaca (Bauhinia variegata)",
  Paraíso = "Paraíso (Melia azedarach)",
  Ligustro = "Ligustro (Ligustrum lucidum)",
  Tala = "Tala (Celtis tala)",
  Tevetia = "Tevetia (Thevetia Peruviana)",
  Guarán = "Guarán (Tecoma stans)",
  Roble = "Roble (Quercus rubus)",
  Platano = "Platano de sombra (Platanus x hispanica)",
  Canelón = "Canelón (Myrsine laetevirens)",
  AlamoDeltoide = "Álamo deltoides (Populus deltoides)",
  Grevillea = "Grevillea (Grevillea robusta)",
  Níspero = "Níspero (Mespilus germanica)",
  Ciprés = "Ciprés (Cupressus sempervirens)",
  Nogal = "Nogal común (Juglans regia)",
  RobleAmericano = "Roble americano (Quercus rubra)",
  Brachichito = "Brachichito (Brachychiton populneus)",
  TipaColorada = "Tipa Colorada (Pterogyne nitens)",
  AlamoPiramidal = "Álamo piramidal (Populus nigra)",
  Chivato = "Chivato (Delonix regia)",
  Palta = "Palta (Persea americana)",
  Acacia = "Acacia de Constantinopla (Albizia julibrissin)",
  Algarrobo = "Algarrobo (Prosopis sp)",
  Olmo = "Olmo común (Ulmus minor)",
  Vilcote = "Vilcote (Acacia visco)",
  Pezuña = "Pezuña de vaca nativa (Bauhinia forficata subsp. pruinosa)",
  Alamo = "Álamo (Populus nigra)",
  LigustroDisciplinado = "Ligustro disciplinado (Ligustrum japonica variegata)",
  Ficus = "Ficus disciplinado (Ficus benjamina variegata)",
  Catalpa = "Catalpa (Catalpa sp.)",
}
