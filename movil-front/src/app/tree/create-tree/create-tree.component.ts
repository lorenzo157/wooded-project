import { Component, OnInit } from '@angular/core';
import { TreeService, CreateTreeDto, NumberToStringMap } from '../tree.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-tree',
  templateUrl: './create-tree.component.html',
  styleUrls: ['./create-tree.component.scss'],
})
export class CreateTreeComponent implements OnInit {
  private idProject!: number;
  projectType!: boolean;
  treeForm: FormGroup;

  windExposureOptions: string[] = [
    'expuesto',
    'parcialmente expuesto',
    'protegido',
    'tunel de viento',
  ];
  vigorOptions: string[] = ['excelente', 'normal', 'pobre'];
  canopyDensityOptions: string[] = ['escasa', 'normal', 'densa'];
  growthSpaceOptions: string[] = [
    'sin cazuela',
    'cazuela = 1 - 2 m2',
    'cazuela > 2 m2',
    'vereda jardin',
  ];
  treeValueOptions: string[] = [
    'historico',
    'monumental',
    'singular',
    'notable',
    'plaza/parque (ornamental)',
    'reclamo',
    'alineacion',
  ];
  frequencyUseOptions: string[] = ['intermedio', 'ocasional', 'frecuente'];
  potentialDamageOptions: string[] = ['menor', 'moderado', 'alto'];

  treeTypeOptions: string[] = ['Tipo1', 'palo borracho']; // Example list, replace with actual data
  conflictOptions: string[] = [
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
  diseaseOptions: string[] = ['Enfermedad1', 'Enfermedad2'];
  interventionOptions: string[] = [
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
  pestOptions: string[] = ['Plaga1', 'Plaga2'];
  // DEFECTOS EN LAS RAICES
  private fruitingBodiesOfFungiOnNeckOrRoots: NumberToStringMap = {
    4: 'con cuerpos fructiferos',
  };
  fruitingBodiesOfFungiOnNeckOrRootsEntries = Object.entries(
    this.fruitingBodiesOfFungiOnNeckOrRoots
  );

  private mechanicalDamageToRoots: NumberToStringMap = {
    2: 'daño < 50% de las raices en la zona critica de raiz',
    3: 'daño en 50-75% de las raices en la zona critica de raiz',
    4: 'daño > 75% de las raices en la zona critica de raiz',
  };
  mechanicalDamageToRootsEntries = Object.entries(this.mechanicalDamageToRoots);

  private stranglingRoots: NumberToStringMap = {
    3: 'afecta < 50% del perimetro de la base',
    4: 'afecta > 50% del perimetro de la base',
  };
  stranglingRootsEntries = Object.entries(this.stranglingRoots);

  private deadRoots: NumberToStringMap = {
    2: 'daño < 50% de las raices en la zona critica de raiz',
    3: 'daño en 50-75% de las raices en la zona critica de raiz',
    4: 'daño > 75% de las raices en la zona critica de raiz',
  };
  deadRootsEntries = Object.entries(this.deadRoots);

  //FALTA EL SIN DETERMINAR( no se excavo para ver raices)

  private symptomsDiseaseOfRootsInCrown: NumberToStringMap = {
    4: 'con sintomas',
  };
  symptomsDiseaseOfRootsInCrownEntries = Object.entries(this.symptomsDiseaseOfRootsInCrown);
  // DEFECTOS EN TRONCO Y CUELLO
  private gallsTermiteMoundsAnthills: NumberToStringMap = {
    3: 'afecta < 50% perimetro',
    4: 'afecta > 50% perimetro',
  };
  gallsTermiteMoundsAnthillsEntries = Object.entries(this.gallsTermiteMoundsAnthills);

  private cankersTrunk: NumberToStringMap = {
    2: 'afecta < 25% del perimetro',
    3: 'afecta 25-50% del perimetro',
    4: 'afecta > 50% del perimetro',
  };
  cankersTrunkEntries = Object.entries(this.cankersTrunk);
  // FALTA CAVIDADES QUE SE CALCULA PIDIENDO SOLO EL T Y USANDO EL DIAMETRO PARA OTENER EL RADIO
  // FALTA CONFICIENTE DE ESBELTES QUE SE CALCULA SOLO UNA VEZ OBTENIDOS LA ALTURA Y EL DAP(EL DAP SE CALCULA CON EL PERIMETRO)
  // FALTA CORTEZA PERDIDA O MUERTA QUE SE CALCULA SOLO PIDIENDO EL ANCHO DE LA ZONA CON PERDIDA DE CORTEZA
  private multipleTrunks: NumberToStringMap = {
    2: 'si',
    3: 'con corteza incluida',
    4: 'con cavidades, rajaduras, pudricion',
  };
  multipleTrunksEntries = Object.entries(this.multipleTrunks);
  // FALTA HERIDAS QUE SE CALCULA SOLO PIDIENDO EL ANCHO DE LA ZONA CON PERDIDA DE CORTEZA
  private forkTrunk: NumberToStringMap = {
    2: 'sin corteza incluida y sin otros defectos',
    3: 'con corteza incluida y sin otros defectos importantes(rajadura, pudricion, cavidad, cuerpo fructifero, agalla)',
    4: 'con corteza incluida y otros defectos importantes (rajadura, pudricion, cavidad, cuerpo fructifero, agalla)',
  };
  forkTrunkEntries = Object.entries(this.forkTrunk);
  // FALTA INCLINACION QUE SE CALCULA SOLO
  // FALTA Orificios de taladros de madera o corteza QUE SE CALCULA SOLO PIDIENDO EL ANCHO DE LA ZONA CON PERDIDA DE CORTEZA
  // FALTA Pudricion de madera QUE SE CALCULA PIDIENDO SOLO EL T Y USANDO EL DIAMETRO PARA OTENER EL RADIO
  // FALTA RAJADURAS QUE SE CALCULA PIDIENDO SOLO EL T Y USANDO EL DIAMETRO PARA OTENER EL RADIO PERO NO SE ENTIENDE

  // DEFECTOS EN RAMAS ESTRUCTURASLES Y RAMAS MENORES
  private cankersBranch: NumberToStringMap = {
    2: 'ramas con diametro < 10 cm afecta < 50% perimetro',
    3: 'ramas con diametro < 10 cm afecta > 50% perimetro',
    4: 'ramas con diametro > 10 cm afecta > 25% perimetro)',
  };
  cankersBranchEntries = Object.entries(this.cankersBranch);

  private cavitiesBranches: NumberToStringMap = {
    2: 'cavidades en ramas < 10 cm',
    4: 'cavidades en ramas > 10 cm afectando <25% del perimetro',
  };
  cavitiesBranchesEntries = Object.entries(this.cavitiesBranches);

  private fruitingBodiesOfFungi: NumberToStringMap = {
    4: 'con cuerpos fructiferos',
  };
  fruitingBodiesOfFungiEntries = Object.entries(this.fruitingBodiesOfFungi);

  private forkBranch: NumberToStringMap = {
    2: 'sin corteza incluida y sin otros defectos',
    3: 'con corteza incluida y sin otros defectos importantes(rajadura, pudricion, cavidad, cuerpo fructifero, agalla)',
    4: 'con corteza incluida y otros defectos importantes (rajadura, pudricion, cavidad, cuerpo fructifero, agalla)',
  };
  forkBranchEntries = Object.entries(this.forkBranch);

  private hangingOrBrokenBranches: NumberToStringMap = {
    2: '< 10 cm de diametro',
    4: '> 10 cm de diametro',
  };
  hangingOrBrokenBranchesEntries = Object.entries(this.hangingOrBrokenBranches);

  private deadBranches: NumberToStringMap = {
    2: '< 10 cm de diametro',
    4: '> 10 cm de diametro',
  };
  deadBranchesEntries = Object.entries(this.deadBranches);

  private overExtendedBranches: NumberToStringMap = {
    3: 'ramas sobreextendidas sin chupones verticales',
    4: 'ramas sobre extendidas con chupones verticales pesados',
  };
  overExtendedBranchesEntries = Object.entries(this.overExtendedBranches);

  private fissures: NumberToStringMap = {
    2: 'rajaduras pequeñas y poco profundas',
    3: 'rajaduras longitudinales sin movimiento',
    4: 'rajaduras longitudinales profundas  o rajaduras transversaleso',
  };
  fissuresEntries = Object.entries(this.fissures);

  private woodRot: NumberToStringMap = {
    3: 'pudricion afecta menos del 40% del perimetro en ramas menores',
    4: 'rama estructural con signos de pudricion',
  };
  woodRotEntries = Object.entries(this.woodRot);

  private interferenceWithTheElectricalGrid: NumberToStringMap = {
    2: 'ramas a una distancia de 1m de conductores de baja tension',
    3: 'ramas bajo media tension a una distancia de 1-3m del conductor O Ramas en contacto con conductores de baja tension',
    4: 'ramas en contacto con conductores de media tension',
  };
  interferenceWithTheElectricalGridEntries = Object.entries(this.interferenceWithTheElectricalGrid);

  hangingOrBrokenBranches_branches: boolean = false;
  deadBranches_branches: boolean = false;
  overExtendedBranches_branches: boolean = false;
  private dch!: number;
  constructor(
    private route: ActivatedRoute,
    private treeService: TreeService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.treeForm = this.fb.group({
      pathPhoto: [''],
      cityBlock: [null],
      perimeter: [null, Validators.required],
      height: [null, Validators.required],
      incline: [null, Validators.required],
      treesInTheBlock: [null, Validators.required],
      useUnderTheTree: [null, Validators.required],
      frequencyUse: [null, Validators.required],
      potentialDamage: [null, Validators.required],
      isMovable: [false],
      isRestrictable: [false],
      isMissing: [false],
      isDead: [false],
      exposedRoots: [false],
      windExposure: [null, Validators.required],
      vigor: [null, Validators.required],
      canopyDensity: [null, Validators.required],
      growthSpace: [null, Validators.required],
      treeValue: [null, Validators.required],
      risk: [null],
      address: ['', Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required],
      treeTypeName: [null, Validators.required],
      conflictsNames: this.fb.array([]),
      diseasesNames: this.fb.array([]),
      interventionsNames: this.fb.array([]),
      pestsNames: this.fb.array([]),
      fruitingBodiesOfFungiOnNeckOrRoots: [null],
      mechanicalDamageToRoots: [null],
      stranglingRoots: [null],
      deadRoots: [null],
      symptomsDiseaseOfRootsInCrown: [null],
      gallsTermiteMoundsAnthills: [null],
      cankersTrunk: [null],
      cavitiesTrunk:[null],
      multipleTrunks: [null],
      forkTrunk: [null],
      cankersBranch: [null],
      cavitiesBranches: [null],
      fruitingBodiesOfFungi: [null],
      forkBranch: [null],
      hangingOrBrokenBranches: [null],
      deadBranches: [null],
      deadBranches_branches: [null],
      overExtendedBranches: [null],
      overExtendedBranches_branches: [null],
      fissures: [null],
      woodRot: [null],
      interferenceWithTheElectricalGrid: [null],
    });
    this.addConditionalValidation();
  }
  addConditionalValidation() {
    const isMissingControl = this.treeForm.get('isMissing');
    const isDeadControl = this.treeForm.get('isDead');
    // Listen  to changes on isMissing and isMovable
    isMissingControl?.valueChanges.subscribe((isMissing) => {
      this.updateConditionalValidators(isMissing || isDeadControl?.value);
    });

    isDeadControl?.valueChanges.subscribe((isDead) => {
      this.updateConditionalValidators(isMissingControl?.value || isDead);
    });

    this.treeForm.get('perimeter')?.valueChanges.subscribe((perimeterValue) => {
      if (perimeterValue != null) this.dch = perimeterValue / Math.PI;
    });
  }

  updateConditionalValidators(condition: boolean) {
    const fieldsToValidate = [
      'perimeter',
      'height',
      'incline',
      'useUnderTheTree',
      'frequencyUse',
      'potentialDamage',
      'windExposure',
      'vigor',
      'canopyDensity',
      'growthSpace',
      'treeValue',
      'treeTypeName',
    ];
    fieldsToValidate.forEach((field) => {
      const control = this.treeForm.get(field);
      if (condition) {
        control?.clearValidators();
      } else {
        control?.setValidators([Validators.required]);
      }
      control?.updateValueAndValidity();
    });
  }
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.idProject = +params.get('idProject')!; // Retrieve project ID from route
      this.projectType = !!+params.get('projectType')!;
    });
    if (this.projectType) {
      this.treeForm.get('treeValue')?.clearValidators();
      this.treeForm.get('treeValue')?.updateValueAndValidity();
    } else {
      this.treeForm.get('treesInTheBlock')?.clearValidators();
      this.treeForm.get('treesInTheBlock')?.updateValueAndValidity();
    }
  }
  addItem(nameArray: string) {
    (this as any)[nameArray+'Names'].push(this.fb.control('', Validators.required));
  }
  removeItem(index: number,nameArray: string) {
    (this as any)[nameArray+'Names'].removeAt(index);
  }
  get pestsNames() {
    return this.treeForm.get('pestsNames') as FormArray;
  }
  get conflictsNames() {
    return this.treeForm.get('conflictsNames') as FormArray;
  }
  get diseasesNames() {
    return this.treeForm.get('diseasesNames') as FormArray;
  }
  get interventionsNames() {
    return this.treeForm.get('interventionsNames') as FormArray;
  }

  showBranchesInput(event: any, nameInput: string) {
    const selectedValue = event.detail.value;
    (this as any)[nameInput + '_branches'] = selectedValue > 1;
  }

  onSubmit() {
    if (this.treeForm.valid) console.log('is validoooo');
    if (!this.treeForm.valid) console.log('NOOOvalidoooo');

    // Access specific form fields
    const newTree = new CreateTreeDto();
    newTree.pathPhoto = this.treeForm.get('pathPhoto')?.value;
    newTree.cityBlock = this.treeForm.get('cityBlock')?.value;
    newTree.perimeter = this.treeForm.get('perimeter')?.value;
    newTree.dch = this.dch ? this.dch : null;
    newTree.height = this.treeForm.get('height')?.value;
    newTree.incline = this.treeForm.get('incline')?.value;
    newTree.treesInTheBlock = this.treeForm.get('treesInTheBlock')?.value;
    newTree.useUnderTheTree = this.treeForm.get('useUnderTheTree')?.value;
    newTree.frequencyUse = this.treeForm.get('frequencyUse')?.value;
    newTree.potentialDamage = this.treeForm.get('potentialDamage')?.value;
    newTree.isMovable = this.treeForm.get('isMovable')?.value;
    newTree.isRestrictable = this.treeForm.get('isRestrictable')?.value;
    newTree.isMissing = this.treeForm.get('isMissing')?.value;
    newTree.isDead = this.treeForm.get('isDead')?.value;
    newTree.exposedRoots = this.treeForm.get('exposedRoots')?.value;
    newTree.windExposure = this.treeForm.get('windExposure')?.value;
    newTree.vigor = this.treeForm.get('vigor')?.value;
    newTree.canopyDensity = this.treeForm.get('canopyDensity')?.value;
    newTree.growthSpace = this.treeForm.get('growthSpace')?.value;
    newTree.treeValue = this.treeForm.get('treeValue')?.value;
    if (this.projectType) newTree.treeValue = 'alineacion';
    newTree.risk = this.treeForm.get('risk')?.value;
    newTree.address = this.treeForm.get('address')?.value;
    newTree.latitude = this.treeForm.get('latitude')?.value;
    newTree.longitude = this.treeForm.get('longitude')?.value;
    newTree.treeTypeName = this.treeForm.get('treeTypeName')?.value;
    newTree.conflictsNames = this.treeForm.get('conflictsNames')?.value;
    newTree.diseasesNames = this.treeForm.get('diseasesNames')?.value;
    newTree.interventionsNames = this.treeForm.get('interventionsNames')?.value;
    newTree.defectDto = [];

    const addDefect = (
      defectName: string,
      defectValue: number,
      mapping: { [key: number]: string },
      branches?: number
    ) => {
      if (defectValue > 1)
        newTree.defectDto.push({
          defectName,
          defectValue: +defectValue,
          textDefectValue: mapping[defectValue],
          ...(branches !== undefined && { branches }), // Add branches if it's defined
        });
    };

    addDefect(
      'cuerpos fructiferos de hongos en cuello o raices',
      this.treeForm.get('fruitingBodiesOfFungiOnNeckOrRoots')?.value,
      this.fruitingBodiesOfFungiOnNeckOrRoots
    );
    addDefect(
      'daño mecanico a raices',
      this.treeForm.get('mechanicalDamageToRoots')?.value,
      this.mechanicalDamageToRoots
    );
    addDefect(
      'raices estrangulantes',
      this.treeForm.get('stranglingRoots')?.value,
      this.stranglingRoots
    );
    addDefect('raices muertas', this.treeForm.get('deadRoots')?.value, this.deadRoots);
    addDefect(
      'sintomas de enfermedad radicular en copa',
      this.treeForm.get('symptomsDiseaseOfRootsInCrown')?.value,
      this.symptomsDiseaseOfRootsInCrown
    );
    addDefect(
      'agallas, termiteros, hormigueros',
      this.treeForm.get('gallsTermiteMoundsAnthills')?.value,
      this.gallsTermiteMoundsAnthills
    );
    addDefect(
      'cancros de tronco o cuello',
      this.treeForm.get('cankersTrunk')?.value,
      this.cankersTrunk
    );
    addDefect('fustes miltiples', this.treeForm.get('multipleTrunks')?.value, this.multipleTrunks);
    addDefect('horqueta de tronco', this.treeForm.get('forkTrunk')?.value, this.forkTrunk);
    addDefect('cancros de ramas', this.treeForm.get('cankersBranch')?.value, this.cankersBranch);
    addDefect('cavidades', this.treeForm.get('cavitiesBranches')?.value, this.cavitiesBranches);
    addDefect(
      'cuerpos fructiferos de hongos',
      this.treeForm.get('fruitingBodiesOfFungi')?.value,
      this.fruitingBodiesOfFungi
    );
    addDefect('horqueta de ramas', this.treeForm.get('forkBranch')?.value, this.forkBranch);
    addDefect(
      'ramas colgantes o quebradas',
      this.treeForm.get('hangingOrBrokenBranches')?.value,
      this.hangingOrBrokenBranches,
      this.treeForm.get('hangingOrBrokenBranches_branches')?.value
    );
    addDefect(
      'ramas muertas',
      this.treeForm.get('deadBranches')?.value,
      this.deadBranches,
      this.treeForm.get('deadBranches_branches')?.value
    );
    addDefect(
      'ramas sobre extendidas',
      this.treeForm.get('overExtendedBranches')?.value,
      this.overExtendedBranches
    );
    addDefect('rajaduras', this.treeForm.get('fissures')?.value, this.fissures);
    addDefect('pudricion de madera', this.treeForm.get('woodRot')?.value, this.woodRot);
    addDefect(
      'interferencia con red electrica',
      this.treeForm.get('interferenceWithTheElectricalGrid')?.value,
      this.interferenceWithTheElectricalGrid
    );

    //console.log(newTree.defectDto);
    let risk: number = 0;
    if (newTree.windExposure == 'parcialmente expuesto') risk += 1;
    if (newTree.windExposure == 'expuesto') risk += 2;
    if (newTree.windExposure == 'tunel de viento') risk += 2;
    if (newTree.canopyDensity == 'escasa') risk -= 1;
    if (newTree.canopyDensity == 'densa') risk += 1;
    console.log(risk, '  risk');
    // } else {
    //   console.log("Form is invalid");
    // }
    //console.log(this.idProject,this.projectType)
    // Filter out objects without a defined defectValue, then map to defectValue and find the maximum
    const defectValues = newTree.defectDto
      .map((defectDto) => defectDto.defectValue)
      .filter((value) => value !== undefined) as number[]; // Ensures we only work with numbers
    let maxDefectValue = defectValues.length ? Math.max(...defectValues) : null; // Returns null if there are no valid defectValues
  }
}

// Now send the modified form data
//   this.treeService.createTree(newTree).subscribe({
//     next: (response) => {
//       console.log('Form data saved successfully!', response);
//     },
//     error: (error) => {
//       console.error('Error saving form data:', error);
//     },
//   });
// } else {
//   console.log('Form is invalid');
// }
