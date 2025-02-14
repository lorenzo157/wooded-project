import React, { useEffect, useState } from "react";
import {
  createCampaign,
  getCampaignByIdUnitWork,
  getCalculate,
  getStandardDeviation,
  getMeanOfTreesInBlockByNeighborhood,
  getQtyOfTreesInPopulation,
  deleteCampaign,
} from "../services/UnitWorkService";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./Style.css";
import { Button, useToast } from "@chakra-ui/react";

const ManageCampaign: React.FC<{}> = () => {
  const { idProject } = useParams();
  const location = useLocation();
  const barrioSeleccionado = location.state?.barrioSeleccionado || {};
  const navigate = useNavigate();
  const [campaignDescription, setCampaignDescription] = useState<string>("");
  const [idUnitWork, setIdUnitWork] = useState<number>(
    barrioSeleccionado?.idUnitWork || 0
  );
  const [stDev, setstDev] = useState<number>(0);
  const [mean, setMean] = useState<number>(0);
  const [qtyOfTreesInPopulation, setQtyOfTreesInPopulation] =
    useState<number>(0);
  const [allCampaigns, setAllCampaigns] = useState<any[]>([]);
  const [remainWork, setRemainWork] = useState<any>(null); // Estado para almacenar el "trabajo restante"
  const toast = useToast();

  const datosTabla = barrioSeleccionado
    ? Object.entries({
        "Poda (Formación)": [
          barrioSeleccionado.pruningTraining,
          remainWork?.pruningTraining ?? "-",
        ],
        "Poda (Sanitaria)": [
          barrioSeleccionado.pruningSanitary,
          remainWork?.pruningSanitary ?? "-",
        ],
        "Poda (Reducción de altura)": [
          barrioSeleccionado.pruningHeightReduction,
          remainWork?.pruningHeightReduction ?? "-",
        ],
        "Poda (Raleo de ramas)": [
          barrioSeleccionado.pruningBranchThinning,
          remainWork?.pruningBranchThinning ?? "-",
        ],
        "Poda (Despeje de señalética)": [
          barrioSeleccionado.pruningSignClearing,
          remainWork?.pruningSignClearing ?? "-",
        ],
        "Poda (Despeje de conductores eléctricos)": [
          barrioSeleccionado.pruningPowerLineClearing,
          remainWork?.pruningPowerLineClearing ?? "-",
        ],
        "Poda (Radicular + uso de deflectores)": [
          barrioSeleccionado.pruningRootDeflectors,
          remainWork?.pruningRootDeflectors ?? "-",
        ],

        "Mover el blanco": [
          barrioSeleccionado.moveTarget,
          remainWork?.moveTarget ?? "-",
        ],

        "Restringir acceso": [
          barrioSeleccionado.restrictAccess,
          remainWork?.restrictAccess ?? "-",
        ],

        Cableado: [barrioSeleccionado.cabling, remainWork?.cabling ?? "-"],
        Sujeción: [
          barrioSeleccionado.fastening,
          remainWork?.fastening ?? "-",
        ],
        Apuntalamiento: [
          barrioSeleccionado.propping,
          remainWork?.propping ?? "-",
        ],
        "Aumentos de superficie permeable": [
          barrioSeleccionado.permeableSurfaceIncreases,
          remainWork?.permeableSurfaceIncreases ?? "-",
        ],
        Fertilizaciones: [
          barrioSeleccionado.fertilizations,
          remainWork?.fertilizations ?? "-",
        ],
        Descompresión: [
          barrioSeleccionado.descompression,
          remainWork?.descompression ?? "-",
        ],
        Drenajes: [barrioSeleccionado.drains, remainWork?.drains ?? "-"],
        Extracciones: [
          barrioSeleccionado.extractions,
          remainWork?.extractions ?? "-",
        ],
        Plantaciones: [
          barrioSeleccionado.plantations,
          remainWork?.plantations ?? "-",
        ],
        "Aperturas de cazuela": [
          barrioSeleccionado.openingsPot,
          remainWork?.openingsPot ?? "-",
        ],
        "Inspecciones avanzadas": [
          barrioSeleccionado.advancedInspections,
          remainWork?.advancedInspections ?? "-",
        ],
      })
    : [];

  // Función para obtener campañas
  const fetchCampaigns = async () => {
    try {
      if (idProject && idUnitWork) {
        const campaigns = await getCampaignByIdUnitWork(
          Number(idProject),
          idUnitWork
        );
        setAllCampaigns(campaigns);
      }
    } catch (error) {
      console.error("Error al cargar las campañas:", error);
    }
  };

 const fetchRemainWork = async () => {
    try {
      if (idProject && idUnitWork) {
        const trabajo = await getCalculate(Number(idProject), idUnitWork);
        setRemainWork(trabajo); 
      }
    } catch (error) {
      console.error("Error al cargar el trabajo restante:", error);
    }
  };

  const fetchQtyOfTreesInPopulation = async () => {
    try {
      if (idProject && idUnitWork) {
        const qtyOfTreesInPopulation = await getQtyOfTreesInPopulation(
          Number(idProject),
          idUnitWork
        );
        setQtyOfTreesInPopulation(qtyOfTreesInPopulation);
      }
    } catch (error) {
      console.error(
        "Error al obtener la cantidad de árboles en la población:",
        error
      );
    }
  };

  const fetchMeanOfTreesInBlockByNeighborhood = async () => {
    try {
      if (idProject && idUnitWork) {
        const mean = await getMeanOfTreesInBlockByNeighborhood(
          Number(idProject),
          idUnitWork
        );
        setMean(mean);
      }
    } catch (error) {
      console.error("Error al obtener la desviación estándar:", error);
    }
  };

  const fetchStDev = async () => {
    try {
      if (idProject && idUnitWork) {
        const stDev = await getStandardDeviation(Number(idProject), idUnitWork);
        setstDev(stDev);
      }
    } catch (error) {
      console.error("Error al obtener la desviación estándar:", error);
    }
  };

  // Cargar campañas y trabajo restante cuando idProject o idUnitWork cambian
  useEffect(() => {
    if (idProject) {
      console.log("idProject:", idProject, "idUnitWork:", idUnitWork);
      fetchCampaigns();
      fetchRemainWork();
      fetchStDev();
      fetchMeanOfTreesInBlockByNeighborhood();
      fetchQtyOfTreesInPopulation();
    }
  }, [idProject, idUnitWork]);

  // Manejar la creación de una nueva campaña
  const handleCrearCampaña = async () => {
    if (!campaignDescription.trim()) {
      alert("La descripción de la campaña es obligatoria.");
      return;
    }

    try {
      await createCampaign(Number(idProject), idUnitWork, campaignDescription);
      await fetchCampaigns(); // Volver a cargar las campañas después de crear una nueva
      setCampaignDescription(""); // Limpiar el input después de crear la campaña
    } catch (error) {
      console.error("Error al crear la campaña:", error);
      alert("Hubo un error al crear la campaña. Intente nuevamente.");
    }
  };

  const handleModificar = (idProject: number, idUnitWork: number) => {
    navigate(`/editcampaign/${idProject}/${idUnitWork}`);
  };

  const handleEliminar = async (idCampaign: number) => {
    try {
      if (!idProject || !idUnitWork) return;

      await deleteCampaign(Number(idProject), idCampaign);

      setAllCampaigns((prevCampaigns) =>
        prevCampaigns.filter((campaign) => campaign.idCampaign !== idCampaign)
      );
      fetchCampaigns();

      toast({
        title: "Campaña eliminada.",
        description: `La campaña ID ${idCampaign} fue eliminada exitosamente.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

    } catch (error) {
      console.error("Error al eliminar la campaña:", error);

      toast({
        title: "Error al eliminar.",
        description:
          "Hubo un problema al eliminar la campaña. Intente nuevamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="container">
      <h2>
        Gestionar Campañas de Unidad de Trabajo ID:{" "}
        {barrioSeleccionado.idUnitWork}
      </h2>
      <h2>Barrio: {barrioSeleccionado.neighborhoodName}</h2>
      <h2>Cantidad de árboles en el barrio: {qtyOfTreesInPopulation}</h2>
      <h2>
        Promedio de Árboles en cada manzana: {mean} - Desviación Estándar:{" "}
        {stDev}
      </h2>
      <div className="table-container">
        <div className="table-wrapper">
          <hr />
          <table className="table">
            <thead>
              <tr className="table-header">
                <th className="table-cell">Intervención</th>
                <th className="table-cell">Trabajo Inicial</th>
                <th className="table-cell">Trabajo Restante</th>
              </tr>
            </thead>
            <tbody>
              {datosTabla.map(([key, values]) => (
                <tr key={key}>
                  <td className="table-cell bold">{key}</td>
                  <td className="table-cell">{values[0]}</td>
                  <td className="table-cell">{values[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="form-container">
        <h1>Campañas</h1>
        <div className="input-container">
          <label htmlFor="campaignDescription">
            Descripción de la campaña:
          </label>
          <input
            id="campaignDescription"
            type="text"
            value={campaignDescription}
            onChange={(e) => setCampaignDescription(e.target.value)}
            placeholder="Ingrese la descripción"
            className="input-field"
          />
          <Button
            textShadow="0.4px 0.4px 0.4px black"
            fontFamily="Raleway"
            bg="#1A865F"
            color="#FFFFFF"
            _hover={{ bg: "teal.500" }}
            onClick={handleCrearCampaña}
          >
            Crear Campaña
          </Button>
        </div>
        <h3>Listado de campañas</h3>
        <ul className="campaign-list" style={{ padding: 0, margin: 0 }}>
          {allCampaigns.length > 0 ? (
            allCampaigns.map((campaign) => (
              <li key={campaign.idUnitWork} className="campaign-item">
                <div>
                  <strong>ID:</strong> {campaign.idUnitWork} -{" "}
                  <strong>Descripción:</strong> {campaign.campaignDescription}
                </div>
                <div className="button-container">
                  <Button
                    textShadow="0.4px 0.4px 0.4px black"
                    bg="#1A865F"
                    color="#FFFFFF"
                    _hover={{ bg: "teal.500" }}
                    onClick={() =>
                      handleModificar(campaign.projectId, campaign.idUnitWork)
                    }
                  >
                    Modificar
                  </Button>
                  <Button
                    textShadow="0.4px 0.4px 0.4px black"
                    bg="#1A865F"
                    color="#FFFFFF"
                    _hover={{ bg: "teal.500" }}
                    onClick={() => handleEliminar(campaign.idUnitWork)}
                  >
                    Eliminar
                  </Button>
                </div>
              </li>
            ))
          ) : (
            <p>No hay campañas disponibles.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ManageCampaign;
