import { Component, OnInit } from '@angular/core';
import { TreeService } from '../tree.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SimplyReadTreeDto } from '../dto/simply-read-tree.dto';

@Component({
  selector: 'app-list-trees',
  templateUrl: './list-trees.component.html',
  styleUrls: ['./list-trees.component.scss'],
})
export class ListTreesComponent implements OnInit {
  idProject!: number;
  trees: SimplyReadTreeDto[] = [];
  filterId: number | null = null;
  constructor(
    private route: ActivatedRoute,
    private treeService: TreeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.idProject = +params.get('idProject')!; // Retrieve project ID from route
      this.loadTrees();
    });
  }

  loadTrees() {
    this.treeService.getTreesByProjectId(this.idProject).subscribe({
      next: (trees) => {
        this.trees = trees;
      },
      error: (error) => {
        console.error('Error loading trees:', error);
      },
    });
  }
  viewTreeDetails(idTree: number) {
    this.router.navigate([
      `/project/${this.idProject}/tree/detailtree/${idTree}`
    ]);  // Navigate with both projectId and idTree
  }
  get filteredTrees() {
    return this.filterId 
      ? this.trees.filter(tree => tree.idTree === this.filterId) 
      : this.trees;
  }
}
