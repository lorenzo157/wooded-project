import { Component, OnInit } from '@angular/core';
import { TreeService } from '../tree.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SimplyReadTreeDto } from '../dto/simply-read-tree.dto';
import { UiService } from '../../utils/ui.service';

@Component({
  selector: 'app-list-trees',
  templateUrl: './list-trees.component.html',
  styleUrls: ['./list-trees.component.scss'],
})
export class ListTreesComponent implements OnInit {
  idProject!: number;
  trees: SimplyReadTreeDto[] = [];
  filterId: number | null = null;
  projectType!: boolean;
  constructor(
    private route: ActivatedRoute,
    private treeService: TreeService,
    private router: Router,
    private uiService: UiService
  ) {}

  async ngOnInit() {
    await this.uiService.cargando(true);
    this.route.paramMap.subscribe((params) => {
      this.idProject = +params.get('idProject')!; // Retrieve project ID from route
      this.projectType = params.get('projectType') === 'muestreo'; // Retrieve project ID from route
      this.loadTrees();
    });
  }

  loadTrees() {
    this.treeService.getTreesByProjectId(this.idProject).subscribe({
      next: (trees) => {
        this.uiService.cargando(false);
        this.trees = trees;
      },
      error: (error) => {
        this.uiService.alert('No se pudieron cargar los árboles.', 'Error');
        this.uiService.cargando(false);
      },
    });
  }
  viewTreeDetails(idTree: number) {
    this.router.navigate([
      `/project/${this.idProject}/tree/${this.projectType? 'muestreo':'individual'}/detailtree/${idTree}`
    ]);  // Navigate with both projectId and idTree
  }
  get filteredTrees() {
    return this.filterId 
      ? this.trees.filter(tree => tree.idTree === this.filterId) 
      : this.trees;
  }
}
