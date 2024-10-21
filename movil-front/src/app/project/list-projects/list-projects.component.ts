// list-projects.component.ts
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss'],
})
export class ListProjectsComponent  { //implements OnInit
  text = 'Default starting text';
  constructor(
    //private route: ActivatedRoute,
    private projectService: ProjectService,
  ) {}
  onChangeText(){
    this.text = 'Changed!!'
  }
  // ngOnInit() {
  //   //const idUser = Number(this.route.snapshot.paramMap.get('id'));
  //   const idUser = 4
  //   if (idUser) {
  //     this.projectService.findAllAssignedProjectsToUser(idUser).subscribe((data) => {
  //       this.projects = data;
  //     });
  //   } else {
  //     console.error('User ID not found');
  //   }
  // }
  //projects: any[] = [];
  //errorMessage: string | null = null;
}
