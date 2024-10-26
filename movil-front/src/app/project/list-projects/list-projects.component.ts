import { Component, OnInit } from '@angular/core';
import { ProjectDto, ProjectService } from '../project.service'; // Adjust the path as necessary
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss'],
})
export class ListProjectsComponent implements OnInit {
  projects: ProjectDto[] = []; // Array to hold project data
  
  constructor(private projectService: ProjectService, private router: Router) {}

  async ngOnInit() {
    // Call the service to get assigned projects
    this.projects = await this.projectService.getAssignedProjects()
  }
  viewProjectDetails(project: ProjectDto) {
    // Navigating with state to pass the idProject of the selected project
    this.router.navigate([`project/detailproject/${project.idProject}`], {
      state: { cityName: project.cityName , provinceName: project.provinceName}
    });
  } 
  logout() {
    this.projectService.logout();
  }
}

