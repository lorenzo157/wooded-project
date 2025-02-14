export enum Pages {
  TreeLayout = "trees/:idProject/:idUnitWork?",
  CityLayout = "/city/:idProject/:idUnitWork?",
  NeighborhoodLayout = "/neighborhood/:idProject/:idUnitWork?",
  NuevoMapaPrueba = "/urlprueba",
  Login = "/login",
  Neighborhood = "/neighborhood",
  Register = "/register",
  PasswordReset = "/passwordReset",
  Home = "/home/:idUser",
  Project = "/project/:idProject/tree",
  FormProject = "/formproject/:idUser",
  ProyectoMuestreo = "/proyectomuestreo",
  EditProject = "/editproject/:idProject",
  AssignUsers = "/assignusers/:idProject",
  ManageUnitWorks = "/unitworks/:idProject",
  ManageCampaign = "/managecampaign/:idProject",
  TreeList = "/treelist/:idProject/:idUnitWork?",
  TreeDetail = "/treedetails/:idTree",
  TreeMapByNeighborhood = "/mapbarrio/:idProject",
  EditCampaign="/editcampaign/:idProject/:idUnitWork"
}

export enum SearchParam {
  Id = "id",
  StartDate = "startDate",
  EndDate = "endDate",
}
