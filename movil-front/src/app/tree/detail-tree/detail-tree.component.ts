import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TreeService } from '../tree.service';
import { ReadTreeDto } from '../dto/read-tree.dto';
import { UiService } from '../../utils/ui.service';

@Component({
  selector: 'app-detail-tree',
  templateUrl: './detail-tree.component.html',
  styleUrls: ['./detail-tree.component.scss'],
})
export class DetailTreeComponent implements OnInit {
  urlAWSCloudBucket: string = 'https://woodedbucket.s3.us-east-1.amazonaws.com/trees_photos/';
  idTree!: number;
  idProject!: number;
  tree!: ReadTreeDto;
  defectDtoRoots!: any;
  defectDtoTrunk!: any;
  defectDtoBranches!: any;
  projectType!: boolean;

  constructor(
    private route: ActivatedRoute,
    private treeService: TreeService,
    private uiService: UiService,
    private router: Router,
  ) {}

  async ngOnInit() {
    await this.uiService.cargando(true);
    this.route.paramMap.subscribe((params) => {
      this.idTree = +params.get('idTree')!; // Retrieve idTree from route
      this.idProject = +params.get('idProject')!;
      this.projectType = params.get('projectType') === 'muestreo'; // Retrieve idTree from route
      this.loadTree();
    });
  }

  loadTree() {
    this.treeService.getTreeById(this.idTree).subscribe({
      next: (tree) => {
        this.uiService.cargando(false);
        this.tree = tree; // Load tree details
        this.tree.pathPhoto = this.urlAWSCloudBucket+this.tree.pathPhoto
        this.tree.perimeter = Number(Number(tree.perimeter).toFixed(2))
        this.tree.height = Number(Number(tree.height).toFixed(2))
        this.tree.incline = Number(Number(tree.incline).toFixed(2))
        this.defectDtoRoots = tree.readDefectDto.filter(defect => defect.defectZone === 'raiz');
        this.defectDtoTrunk = tree.readDefectDto.filter(defect => defect.defectZone === 'tronco');
        this.defectDtoBranches= tree.readDefectDto.filter(defect => defect.defectZone === 'rama');
        console.log(this.tree.pathPhoto)
      },
      error: (error) => {
        this.uiService.alerta('No se pudo cargar el árbol.', 'Error');
        this.uiService.cargando(false);
      },
    });
  }
  updateTree() {
    this.router.navigate([
      `/project/${this.idProject}/tree/${this.projectType? 'muestreo':'individual'}/createtree/${this.idTree}`,
    ]); // Navigates createTree with idTree indicating it will be an update
  }
  createTree() {
    this.router.navigate([
      `/project/${this.idProject}/tree/${this.projectType? 'muestreo':'individual'}/createtree/0`,
    ]);
  }
}
