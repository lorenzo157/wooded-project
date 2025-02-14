import axios from "axios";
import { Project } from "../types/Project";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const createProject = async (Project: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/project`, Project);
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const getProjectById = async (idProjects: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/project/${idProjects}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching project by id:", error);
      throw error;
    }
  };
  
  export const deleteProjectById = async (idProject: number) => {
    try {
      const response = await axios.delete(`${BASE_URL}/project/${idProject}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting project by ID:", error);
      throw error;
    }
  };

export const updateProjectById = async (
    idProjects: number,
    updatedData: object
  ) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/project/${idProjects}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating project by id:", error);
      throw error;
    }
  };

export const getIdUserByIdProject = async (idProject: string) => {
    try {
      // Realizar la petición para obtener el usuario según el idproject
      const response = await axios.get(`${BASE_URL}/project/${idProject}/user`);
      return response.data;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  };

  export const getAllProjectsCreatedByUser = async (
    idUser: number
  ): Promise<Project[]> => {
    try {
      const response = await axios.get(
        `${BASE_URL}/project/createdproject/${idUser}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  };
  
  