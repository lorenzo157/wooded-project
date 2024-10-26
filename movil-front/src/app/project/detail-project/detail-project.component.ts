import { Component, OnInit } from '@angular/core';
import { ProjectDto, ProjectService } from '../project.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.scss'],
})
export class DetailProjectComponent  implements OnInit {

  idProject!: number
  project!: ProjectDto
  provinceName!: string;
  cityName!: string;
  constructor(private router: Router,private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit() {
    // Access the project object from the router state
    this.cityName = history.state.cityName;
    this.provinceName = history.state.provinceName;
    this.route.paramMap.subscribe((params) => {
      this.idProject = +params.get('idProject')!; // Retrieve project ID from route
      this.loadProject();
    });
    
  }
  loadProject() {
    this.projectService.findProjectById(this.idProject).subscribe({
      next: (project) => {
        this.project = project; // Load tree details
      },
      error: (error) => {
        console.error('Error loading project details:', error);
      },
    });
  }
  createTree(){
    this.router.navigate([`/project/${this.idProject}/tree/createtree`]);
  }

  showAllTrees() {
    this.router.navigate([`/project/${this.idProject}/tree/`]); // Navigates with project ID
  }
}

