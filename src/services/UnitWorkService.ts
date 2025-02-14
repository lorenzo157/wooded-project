import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getUnidadWorkByIdProject = async (idProject: number) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/project/${idProject}/unitwork/${0}`
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

  export const generateUnitWorksByIdProject = async (idProject: number) => {
    try {   // Unidad de trabajo no importa = 0
      const response = await axios.post(
        `${BASE_URL}/project/${idProject}/unitwork/0`   
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

  export const createCampaign = async (
    idProject: number,
    idUnitWork: number,
    campaignDescription: string
  ) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/project/${idProject}/unitwork/${idUnitWork}/campaign`, { campaignDescription });
      return response.data;
    } catch (error: any) {
      // Mostrar el código de estado de la respuesta, si está disponible
      if (error.response) {
        console.error(
          "Error al crear campaña - Código de respuesta:",
          error.response.status
        );
        console.error("Detalles del error del servidor:", error.response.data);
      } else if (error.request) {
        // No hubo respuesta, podría ser un problema de red
        console.error("Error de red - No se recibió respuesta:", error.request);
      } else {
        // Otro tipo de error
        console.error("Error desconocido:", error.message);
      }
      throw error;
    }
  };
  
  export const getQtyOfTreesInPopulation = async (
    idProject: number,
    idUnitWork: number
  ) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/project/${idProject}/unitwork/${idUnitWork}/qty-trees-in-population`
      );
      return response.data;
    } catch (error: any) {
      // Mostrar el código de estado de la respuesta, si está disponible
      if (error.response) {
        console.error(
          "Error al crear obtener la cantidad de árboles en la población:",
          error.response.status
        );
      } else if (error.request) {
        // No hubo respuesta, podría ser un problema de red
        console.error("Error de red - No se recibió respuesta:", error.request);
      } else {
        // Otro tipo de error
        console.error("Error desconocido:", error.message);
      }
      throw error;
    }
  };
  
  
  export const getStandardDeviation = async (
    idProject: number,
    idUnitWork: number
  ) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/project/${idProject}/unitwork/${idUnitWork}/stdev-trees-in-blocks`
      );
      return response.data;
    } catch (error: any) {
      // Mostrar el código de estado de la respuesta, si está disponible
      if (error.response) {
        console.error(
          "Error al crear calcular la desviación estándar:",
          error.response.status
        );
      } else if (error.request) {
        // No hubo respuesta, podría ser un problema de red
        console.error("Error de red - No se recibió respuesta:", error.request);
      } else {
        // Otro tipo de error
        console.error("Error desconocido:", error.message);
      }
      throw error;
    }
  };
  
  export const getMeanOfTreesInBlockByNeighborhood = async (
    idProject: number,
    idUnitWork: number
  ) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/project/${idProject}/unitwork/${idUnitWork}/mean-trees-in-block`
      );
      return response.data;
    } catch (error: any) {
      // Mostrar el código de estado de la respuesta, si está disponible
      if (error.response) {
        console.error(
          "Error al obtener la media de árboles en la cuadra por barrio:",
          error.response.status
        );
      } else if (error.request) {
        // No hubo respuesta, podría ser un problema de red
        console.error("Error de red - No se recibió respuesta:", error.request);
      } else {
        // Otro tipo de error
        console.error("Error desconocido:", error.message);
      }
      throw error;
    }
  };
  
  export const getCalculate = async (idProject: number, idUnitWork: number) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/project/${idProject}/unitwork/${idUnitWork}/calculate`
      );
      return response.data;
    } catch (error: any) {
      // Mostrar el código de estado de la respuesta, si está disponible
      if (error.response) {
        console.error(
          "Error al crear campaña - Código de respuesta:",
          error.response.status
        );
        console.error("Detalles del error del servidor:", error.response.data);
      } else if (error.request) {
        // No hubo respuesta, podría ser un problema de red
        console.error("Error de red - No se recibió respuesta:", error.request);
      } else {
        // Otro tipo de error
        console.error("Error desconocido:", error.message);
      }
      throw error;
    }
  };
  //get de campañas por unidad de trabajo
  export const getCampaignByIdUnitWork = async (
    idProject: number,
    idUnitWork: number
  ) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/project/${idProject}/unitwork/${idUnitWork}/campaign`
      );
      return response.data;
    } catch (error: any) {
      // Mostrar el código de estado de la respuesta, si está disponible
      if (error.response) {
        console.error(
          "Error al crear campaña - Código de respuesta:",
          error.response.status
        );
        console.error("Detalles del error del servidor:", error.response.data);
      } else if (error.request) {
        // No hubo respuesta, podría ser un problema de red
        console.error("Error de red - No se recibió respuesta:", error.request);
      } else {
        // Otro tipo de error
        console.error("Error desconocido:", error.message);
      }
      throw error;
    }
  };


  export const getCampaign = async (idProject: number, idCampaign: number) => {
    const idUnitWork = 0;
    try {
      const response = await axios.get(
        `${BASE_URL}/project/${idProject}/unitwork/${idUnitWork}/campaign/${idCampaign}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error(
          "Error al crear campaña - Código de respuesta:",
          error.response.status
        );
        console.error("Detalles del error del servidor:", error.response.data);
      } else if (error.request) {
        console.error("Error de red - No se recibió respuesta:", error.request);
      } else {
        console.error("Error desconocido:", error.message);
      }
      throw error;
    }
  };
  
  export const deleteCampaign = async (idProject: number, idCampaign: number) => {
    const idUnitWork = 0; // No importa la unidad de trabajo
      try {
      const response = await axios.delete(
        `${BASE_URL}/project/${idProject}/unitwork/${idUnitWork}/campaign/${idCampaign}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error("Error al crear campaña - Código de respuesta:",error.response.status);
        console.error("Detalles del error del servidor:", error.response.data);
      } else if (error.request) {
        console.error("Error de red - No se recibió respuesta:", error.request);
      } else {
        console.error("Error desconocido:", error.message);
      }
      throw error;
    }
  };

  export const patchCampaign = async (
    idProject: number,
    idCampaign: number,
    UpdateCampaignDto: object
  ) => {
    const idUnitWork = 2;
    try {
      const response = await axios.patch(
        `${BASE_URL}/project/${idProject}/unitwork/${idUnitWork}/campaign/${idCampaign}`,
        UpdateCampaignDto
      );
      return response.data;
    } catch (error) {
      console.error("Error updating project by id:", error);
      throw error;
    }
  };

  
export const findTreesByUnitWork = async (idProject: number, idUnitWork: number) => {
    try {
      const response = await axios.get(`${BASE_URL}/project/${idProject}/unitwork/${idUnitWork}/trees-of-unitwork`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        console.error("Error al obtener arboles de la Unidad de Trabajo:", error.response.status);
      } else if (error.request) {
        console.error("Error de red - No se recibió respuesta:", error.request);
      } else {
        console.error("Error desconocido:", error.message);
      }
      throw error;
    }
  };