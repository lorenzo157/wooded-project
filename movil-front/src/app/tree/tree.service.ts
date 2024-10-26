import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../constants/API';
import { AuthService } from '../auth/auth.service';

export interface SimplyReadTreeDto {
  idTree: number;
  treeName: string;
  address: string;
  datetime: Date;
  treeValue: string | null;
  risk: number | null;
}

export interface CreateTreeDto {
  treeName: string;
  datetime: Date;
  pathPhoto: string | null;
  cityBlock: number;
  perimeter: number | null;
  height: number | null;
  incline: number | null;
  treesInTheBlock: number | null;
  useUnderTheTree: string;
  frequencyUse: number | null;
  potentialDamage: number | null;
  isMovable: boolean | null;
  isRestrictable: boolean | null;
  isMissing: boolean | null;
  isDead: boolean | null;
  exposedRoots: boolean | null;
  dch: number | null;
  windExposure: string | null;
  vigor: string | null;
  canopyDensity: string | null;
  growthSpace: string | null;
  treeValue: string | null;
  streetMateriality: string | null;
  risk: number | null;
  address: string;
  conflictsNames: string[];
  defectDto: DefectTreeDto[];
  diseasesNames: string[];
  interventionsNames: string[];
  pestsNames: string[];
  latitude: number;
  longitude: number;
  treeTypeDto: TreeTypeDto;
  projectId: number;
}

export interface ReadTreeDto {
  idTree: number;
  treeName: string;
  datetime: Date;
  pathPhoto: string | null;
  cityBlock: number;
  perimeter: number | null;
  height: number | null;
  incline: number | null;
  treesInTheBlock: number | null;
  useUnderTheTree: string | null;
  frequencyUse: number | null;
  potentialDamage: number | null;
  isMovable: boolean | null;
  isRestrictable: boolean | null;
  isMissing: boolean | null;
  isDead: boolean | null;
  exposedRoots: boolean | null;
  dch: number | null;
  windExposure: string | null;
  vigor: string | null;
  canopyDensity: string | null;
  growthSpace: string | null;
  treeValue: string | null;
  streetMateriality: string | null;
  risk: number | null;
  address: string;
  conflictsNames: string[];
  defectDto: DefectTreeDto[];
  diseasesNames: string[];
  interventionsNames: string[];
  pestsNames: string[];
  latitude: number;
  longitude: number;
  neighborhoodName: string;
  treeTypeDto: TreeTypeDto;
}

// Define DefectDto as well
export class DefectTreeDto {
  defectName!: string;
  defectValue!: number;
  textDefectValue?: string;
  branches?: number;
}

export class TreeTypeDto {
  treeTypeName!: string;
  gender?: string;
  species?: string;
  scientificName?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TreeService {
  private readonly API_URL = `${API}/project`; // Base URL for the project API

  constructor(private http: HttpClient, private authService: AuthService) {}

  createTree(treeData: CreateTreeDto): Observable<CreateTreeDto> {
    return this.http.post<CreateTreeDto>(
      `${this.API_URL}/project/0/tree`,
      treeData
    );
  }
  // Method to get assigned projects by user ID
  getTreesByProjectId(idProject: number): Observable<SimplyReadTreeDto[]> {
    return this.http.get<SimplyReadTreeDto[]>(
      `${this.API_URL}/${idProject}/tree`
    );
  }

  getTreeById(idTree: number): Observable<ReadTreeDto> {
    return this.http.get<ReadTreeDto>(`${this.API_URL}/0/tree/${idTree}`);
  }

  logout() {
    this.authService.logout();
  }
}
