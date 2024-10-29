import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TreeService } from '../tree.service';
import { ReadTreeDto } from '../tree.service';

@Component({
  selector: 'app-detail-tree',
  templateUrl: './detail-tree.component.html',
  styleUrls: ['./detail-tree.component.scss'],
})
export class DetailTreeComponent implements OnInit {
  idTree!: number;
  idProject!: number;
  tree!: ReadTreeDto;

  constructor(
    private route: ActivatedRoute,
    private treeService: TreeService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.idTree = +params.get('idTree')!; // Retrieve idTree from route
      this.idProject = +params.get('idProject')!; // Retrieve idTree from route
      this.loadTree();
    });
  }

  loadTree() {
    this.treeService.getTreeById(this.idTree).subscribe({
      next: (tree) => {
        this.tree = tree; // Load tree details
      },
      error: (error) => {
        console.error('Error loading tree details:', error);
      },
    });
  }
  updateTree() {
    //this.router.navigate([`/project/${this.project.idProject}/tree`]); // Navigates with project ID
  }
}
