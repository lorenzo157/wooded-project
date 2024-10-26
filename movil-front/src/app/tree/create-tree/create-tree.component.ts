import { Component, OnInit } from '@angular/core';
import { TreeService, CreateTreeDto, DefectTreeDto } from '../tree.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-tree',
  templateUrl: './create-tree.component.html',
  styleUrls: ['./create-tree.component.scss'],
})
export class CreateTreeComponent implements OnInit {
  idProject!: number;
  newTree!: CreateTreeDto;

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
    'vereda jardín',
  ];
  treeValueOptions: string[] = [
    'historico',
    'monumental',
    'singular',
    'notable',
    'plaza/parque (ornamental)',
    'reclamo',
  ];
  defectZone: string[] = ['raices', 'tronco y cuello', 'ramas estructurales y ramas menores'];
  raicesZone: string[] = ['agallas, termiteros, hormigueros', 'cancros', 'cavidades'];

  treeTypeOptions: string[] = ['Tipo1']; // Example list, replace with actual data
  conflictOptions: string[] = ['Conflicto1', 'Conflicto2'];
  diseaseOptions: string[] = ['Enfermedad1', 'Enfermedad2'];
  interventionOptions: string[] = ['Intervencion1', 'Intervencion2'];
  pestOptions: string[] = ['Plaga1', 'Plaga2'];

  defectOptions: string[] = ['Plaga1', 'Plaga2'];

  constructor(
    private route: ActivatedRoute,
    private treeService: TreeService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.treeForm = this.fb.group({
      treeName: ['', Validators.required],
      pathPhoto: [''],
      cityBlock: [null, Validators.required],
      perimeter: [null],
      height: [null],
      incline: [null],
      treesInTheBlock: [null],
      useUnderTheTree: [''],
      frequencyUse: [null],
      potentialDamage: [null],
      isMovable: [false],
      isRestrictable: [false],
      isMissing: [false],
      isDead: [false],
      exposedRoots: [false],
      dch: [null],
      windExposure: [''],
      vigor: [''],
      canopyDensity: [''],
      growthSpace: [''],
      treeValue: [''],
      streetMateriality: [''],
      risk: [null],
      address: ['', Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required],
      treeTypeName: [''],
      conflictsNames: this.fb.array([]),
      diseasesNames: this.fb.array([]),
      interventionsNames: this.fb.array([]),
      pestsNames: this.fb.array([]),
      defectDtos: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.idProject = +params.get('idProject')!; // Retrieve project ID from route
    });
  }

  private createDefectGroup(): FormGroup {
    return this.fb.group({
      defectName: [''],
      defectValue: [0],
      textDefectValue: [''],
      branches: [0],
    });
  }
  get defectDtos(): FormArray {
    return this.treeForm.get('defectDtos') as FormArray;
  }
  // Method to add a new defect to the defectDtos FormArray
  addDefect() {
    this.defectDtos.push(this.createDefectGroup());
  }

  // Method to remove a defect by index
  removeDefect(index: number) {
    this.defectDtos.removeAt(index);
  }
  get conflictsNames() {
    return this.treeForm.get('conflictsNames') as FormArray;
  }

  addConflict() {
    this.conflictsNames.push(this.fb.control('', Validators.required));
  }
  removeConflict(index: number) {
    this.conflictsNames.removeAt(index); // Removes the FormControl at the specified index
  }
  get diseasesNames() {
    return this.treeForm.get('diseasesNames') as FormArray;
  }

  addDisease() {
    this.diseasesNames.push(this.fb.control('', Validators.required));
  }

  removeDisease(index: number) {
    this.diseasesNames.removeAt(index);
  }

  get interventionsNames() {
    return this.treeForm.get('interventionsNames') as FormArray;
  }

  addIntervention() {
    this.interventionsNames.push(this.fb.control('', Validators.required));
  }

  removeIntervention(index: number) {
    this.interventionsNames.removeAt(index);
  }

  get pestsNames() {
    return this.treeForm.get('pestsNames') as FormArray;
  }

  addPest() {
    this.pestsNames.push(this.fb.control('', Validators.required));
  }
  removePest(index: number) {
    this.pestsNames.removeAt(index);
  }
  onSubmit() {
    this.treeService.createTree(this.newTree).subscribe({
      next: (response) => {
        console.log('Tree created successfully:', response);
        this.router.navigate([`/project/detailproject`]);
      },
      error: (error) => {
        console.error('Error creating tree:', error);
      },
    });
  }
}
