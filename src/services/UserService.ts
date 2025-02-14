import axios from "axios";
import { Project, UserWithProjects, User } from "../types/Project";
const BASE_URL = process.env.REACT_APP_BASE_URL;


export const getAllRoles = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/roles`);
      return response.data;
    } catch (error) {
      console.error("Error to get all roles:", error);
      throw error;
    }
  };

  export const createUser = async (userData: object) => {
    try {
      const response = await axios.post(`${BASE_URL}/user`, userData);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };


  export const associateUserWithProject = async (idProject: number, idUser: number) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/project/${idProject}/assigneduser/${idUser}`
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error al asignar el usuario al proyecto:",
        error.response?.data || error.message
      );
      throw error;
    }
  };


  export const getAssignedProjectsByIdUser = async (
    idUser: number
  ): Promise<Project[]> => {
    try {
      const response = await axios.get(
        `${BASE_URL}/project/assignedproject/${idUser}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  };

  
export const getUserByEmail = async (
  email: string
): Promise<UserWithProjects | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/user/find-by-email/${email}`);
    const userData: User = response.data;

    if (userData && userData.idUser) {
      const userWithProjects: UserWithProjects = {
        ...userData,
        idUser: userData.idUser,
        projects: [], 
      };
      return userWithProjects;
    } else {
      throw new Error("User data no contiene idUser");
    }
  } catch (error) {
    console.error("Error obteniendo el usuario por email:", error);
    return null;
  }
};

export const deleteUserFromProject = async (
  idProject: number,
  idUser: number
) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/project/${idProject}/assigneduser/${idUser}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error al asignar el usuario al proyecto:",
      error.response?.data || error.message
    );
    throw error;
  }
};

  export const getUserByProject = async (idProject: number): Promise<User[]> => {
    try {
      const response = await axios.get(
        `${BASE_URL}/project/${idProject}/assigneduser`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  };

  export const getCitiesByProvinceId = async (idProvince: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/cities/${idProvince}`);
      return response.data;
    } catch (error) {
      console.error("Error to get cities from province:", error);
      throw error;
    }
  };

  export const getAllProvinces = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/provinces`);
      return response.data;
    } catch (error) {
      console.error("Error to get all provinces:", error);
      throw error;
    }
  };
  