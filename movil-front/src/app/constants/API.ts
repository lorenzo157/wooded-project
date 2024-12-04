import { NumberToStringMap } from '../tree/tree.service';

export const API = 'https://d84a-2803-9800-b802-7ec0-9876-6469-cceb-e714.ngrok-free.app';
//export const API = 'http://localhost:3000';

export const windExposureOptions: string[] = [
  'expuesto',
  'parcialmente expuesto',
  'protegido',
  'tunel de viento',
];

export const vigorOptions: string[] = ['excelente', 'normal', 'pobre'];
export const canopyDensityOptions: string[] = ['escasa', 'normal', 'densa'];
export const growthSpaceOptions: string[] = [
  'sin cazuela',
  'cazuela = 1 - 2 m2',
  'cazuela > 2 m2',
  'vereda jardin',
];
export const treeValueOptions: string[] = [
  'historico',
  'monumental',
  'singular',
  'notable',
  'plaza/parque (ornamental)',
  'reclamo',
  'alineacion',
];
export const frequencyUseOptions: string[] = ['intermedio', 'ocasional', 'frecuente'];
export const potentialDamageOptions: string[] = ['menor', 'moderado', 'alto'];
export const treeTypeOptions: string[] = ['Tipo1', 'palo borracho'];
export const conflictOptions: string[] = [
  'obstruccion visual de señaletica vial',
  'obstruccion de visual(transito humano y vehicular)',
  'obstruccion fisica de transito humano o vehicular',
  'conductores de 1/2 tension',
  'conductores de baja tension',
  'transformadores',
  'rotura de veredas',
  'luminarias a menos de 3m',
  'rotura  de desagues',
];
export const pestOptions: string[] = [
    'orificios de taladros de madera o corteza',
    'Plaga1',
    'Plaga2',
  ];
export const diseaseOptions: string[] = ['Enfermedad1', 'Enfermedad2'];
export const interventionOptions: string[] = [
  'extraccion del arbol',
  'plantacion de arbol faltante',
  'poda',
  'cableado',
  'sujecion',
  'apuntalamiento',
  'aumentar superficie permeable',
  'fertilizacion',
  'descompactado',
  'drenaje',
  'abertura de cazuela en vereda',
  'mover el blanco',
  'restringir acceso',
  'requiere inspeccion avanzada',
];
// DEFECTOS EN LAS RAICES
export const fruitingBodiesOfFungiOnNeckOrRoots: NumberToStringMap = {
  4: 'con cuerpos fructiferos',
};
export const mechanicalDamageToRoots: NumberToStringMap = {
  2: 'daño < 50% de las raices en la zona critica de raiz',
  3: 'daño en 50-75% de las raices en la zona critica de raiz',
  4: 'daño > 75% de las raices en la zona critica de raiz',
};
export const stranglingRoots: NumberToStringMap = {
    3: 'afecta < 50% del perimetro de la base',
    4: 'afecta > 50% del perimetro de la base',
  };
export const deadRoots: NumberToStringMap = {
    2: 'daño < 50% de las raices en la zona critica de raiz',
    3: 'daño en 50-75% de las raices en la zona critica de raiz',
    4: 'daño > 75% de las raices en la zona critica de raiz',
  };
export const symptomsDiseaseOfRootsInCrown: NumberToStringMap = {
    4: 'con sintomas',
  };
 // DEFECTOS EN TRONCO Y CUELLO
export const gallsTermiteMoundsAnthills: NumberToStringMap = {
    3: 'afecta < 50% perimetro',
    4: 'afecta > 50% perimetro',
  };
export const cankersTrunk: NumberToStringMap = {
    2: 'afecta < 25% del perimetro',
    3: 'afecta 25-50% del perimetro',
    4: 'afecta > 50% del perimetro',
  };
  export const cavitiesTrunk: NumberToStringMap = {
    4: 't/R < 15%',
    3: 't/R 15-20%',
    2: 't/R 20-30%',
  };
  export const slendernessCoefficent: NumberToStringMap = {
    4: 'H/DAP > 100',
    3: 'H/DAP = 80-100',
    2: 'H/DAP = 60-80',
  };
  export const lostOrDeadBark: NumberToStringMap = {
    4: 'corteza muerta/perdida afectando > 50% del perimetro',
    3: 'corteza muerta/perdida afectando hasta el 50% del perimetro',
    2: 'corteza muerta/perdida afectando < 25% del perimetro',
  };
  export const multipleTrunks: NumberToStringMap = {
    2: 'si',
    3: 'con corteza incluida',
    4: 'con cavidades, rajaduras, pudricion',
  };
  export const forkTrunk: NumberToStringMap = {
    2: 'sin corteza incluida y sin otros defectos',
    3: 'con corteza incluida y sin otros defectos importantes(rajadura, pudricion, cavidad, cuerpo fructifero, agalla)',
    4: 'con corteza incluida y otros defectos importantes (rajadura, pudricion, cavidad, cuerpo fructifero, agalla)',
  };
  export const inclination: NumberToStringMap = {
    2: 'inclinacion leve(angulo 10-20°), autocompensada, suelo intacto',
    3: 'inclinacion significativa(angulo 20°-30°), no compensada, suelo intacto',
    4: 'inclinacion severa(angulo > 30°) no compensada, o suelo rajado, levantado o raices expuestas',
  };
  export const woodRotTrunk: NumberToStringMap = {
    2: 't/R < 20 y esbeltez >60 pudrición en herida abierta',
    3: 't/R < 15 y esbeltez >60 columna de pudrición cerrada',
    4: 'presencia de cuerpos fructiferos',
  };
  export const wounds: NumberToStringMap = {
    3: 'afecta < 50% del perímetro con pudrición',
    4: 'afecta > 50% del perímetro con pudrición o cuerpo fructífero',
  };
  // DEFECTOS EN RAMAS ESTRUCTURASLES Y RAMAS MENORES 
  export const cankersBranch: NumberToStringMap = {
    2: 'ramas con diametro < 10 cm afecta < 50% perimetro',
    3: 'ramas con diametro < 10 cm afecta > 50% perimetro',
    4: 'ramas con diametro > 10 cm afecta > 25% perimetro)',
  };
  export const cavitiesBranches: NumberToStringMap = {
    2: 'cavidades en ramas < 10 cm',
    4: 'cavidades en ramas > 10 cm afectando <25% del perimetro',
  };
  export const fruitingBodiesOfFungi: NumberToStringMap = {
    4: 'con cuerpos fructiferos',
  };
  export const forkBranch: NumberToStringMap = {
    2: 'sin corteza incluida y sin otros defectos',
    3: 'con corteza incluida y sin otros defectos importantes(rajadura, pudricion, cavidad, cuerpo fructifero, agalla)',
    4: 'con corteza incluida y otros defectos importantes (rajadura, pudricion, cavidad, cuerpo fructifero, agalla)',
  };
  export const hangingOrBrokenBranches: NumberToStringMap = {
    2: '< 10 cm de diametro',
    4: '> 10 cm de diametro',
  };
  export const deadBranches: NumberToStringMap = {
    2: '< 10 cm de diametro',
    4: '> 10 cm de diametro',
  };
  export const overExtendedBranches: NumberToStringMap = {
    3: 'ramas sobreextendidas sin chupones verticales',
    4: 'ramas sobre extendidas con chupones verticales pesados',
  };
  export const fissures: NumberToStringMap = {
    2: 'rajaduras pequeñas y poco profundas',
    3: 'rajaduras longitudinales sin movimiento',
    4: 'rajaduras longitudinales profundas  o rajaduras transversaleso',
  };
  export const woodRot: NumberToStringMap = {
    3: 'pudricion afecta menos del 40% del perimetro en ramas menores',
    4: 'rama estructural con signos de pudricion',
  };
  export const interferenceWithTheElectricalGrid: NumberToStringMap = {
    2: 'ramas a una distancia de 1m de conductores de baja tension',
    3: 'ramas bajo media tension a una distancia de 1-3m del conductor O Ramas en contacto con conductores de baja tension',
    4: 'ramas en contacto con conductores de media tension',
  };