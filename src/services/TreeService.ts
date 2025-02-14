import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const findAllTreesByIdProject = async (idProject: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/project/trees/${idProject}`);
      return response.data;
    } catch (error: any) {
      console.error("Error al obtener los arboles del el proyecto:", error.response?.data || error.message);
      throw error;
    }
  };

  
export const getTreeById = async (idTree: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/project/0/tree/${idTree}`);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error al obtener el arbol ",
        error.response?.data || error.message
      );
      throw error;
    }
  };
  
  
  export const deleteTreeById = async (idTree: number) => {
    try {
      const response = await axios.delete(`${BASE_URL}/project/0/tree/${idTree}`);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error al asignar el usuario al proyecto:",
        error.response?.data || error.message
      );
      throw error;
    }
  };


  
export const getTreeDetailsByIdProject = async (
    idProject: number,
    idTree: number
  ) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/project/${idProject}/tree/${idTree}`
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Error al obtener la unidad de trabajo para el proyecto:",
        error.response?.data || error.message
      );
      throw error;
    }
  };