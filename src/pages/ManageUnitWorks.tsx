import React, { useState, useEffect } from "react";

import {
  getUnidadWorkByIdProject,
  generateUnitWorksByIdProject,
} from "../services/UnitWorkService";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./Style.css";
import { UnidadDeTrabajo } from "../types/Project";
import { useAuth } from "../context/authContext";
import { Button, Flex, Heading, HStack } from "@chakra-ui/react";

const ManageUnitWorks: React.FC = () => {
  const { idProject } = useParams<{ idProject: string }>();

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [barrios, setNeighborhoods] = useState<UnidadDeTrabajo[]>([]);
  const [mostrarBarrio, setMostrarBarrio] = useState<boolean>(false);
  const [idUser, setIdUser] = useState<string | null>(null);
  const [projectName, setProjectName] = useState<string>(
    location.state?.projectName || "Proyecto Desconocido"
  );

  useEffect(() => {
    if (user && user.idUser) {
      setIdUser(user.idUser);
    } else {
      const storedIdUser = localStorage.getItem("idUser");
      setIdUser(storedIdUser || null);
    }
  }, [user]);

  const fetchUnidades = async () => {
    if (!idProject) return;
    try {
      const unidades = await getUnidadWorkByIdProject(Number(idProject));
      if (unidades.length > 0) {
        setNeighborhoods(unidades);
        setMostrarBarrio(true);

        if (unidades[0].projectName) {
          setProjectName(unidades[0].projectName);
        }
      }
    } catch (error) {
      console.error("Error al obtener unidades de trabajo:", error);
    }
  };

  useEffect(() => {
    fetchUnidades();
  }, [idProject]);

  const handleGenerateUnitWorks = async () => {
    if (!idProject || !idUser) {
      console.error("ID del proyecto o del usuario no está disponible");
      return;
    }

    try {
      await generateUnitWorksByIdProject(Number(idProject));
      window.location.reload();
    } catch (error) {
      console.error("Error al generar unidades de trabajo:", error);
    }
  };

  const handleNavigate = (neighborhoodId: number) => {
    const barrioSeleccionado = barrios.find(
      (barrio) => barrio.neighborhoodId === neighborhoodId
    );
    if (barrioSeleccionado) {
      navigate(`/managecampaign/${idProject}`, {
        state: { barrioSeleccionado, idUser },
      });
    } else {
      console.error("No se encontró el barrio con el ID:", neighborhoodId);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#EFF2F9",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Heading size="lg" fontWeight="light">
        Gestionar unidades de trabajo
      </Heading>

      {!mostrarBarrio ? (
        <div>
          <Button
            textShadow="0.4px 0.4px 0.4px black"
            fontFamily="Raleway"
            bg="#1A865F"
            color="#FFFFFF"
            _hover={{ bg: "teal.500" }}
            onClick={handleGenerateUnitWorks}
          >
            Generar Unidad de Trabajo
          </Button>
        </div>
      ) : (
        <div>
          <Heading
            size="md"
            fontWeight="light"
          >{`Proyecto:  ${projectName} - ID:  ${idProject}`}</Heading>
          <Heading size="md" fontWeight="light">
            Barrios asociados al proyecto
          </Heading>
          {barrios.map((barrio) => (
            <div key={barrio.idUnitWork}>
              <Heading size="md" fontWeight="light">
                {barrio.neighborhoodName ||
                  `Barrio ID: ${barrio.neighborhoodId}`}
              </Heading>
              <Flex gap={4}>
                <Button
                  textShadow="0.4px 0.4px 0.4px black"
                  bg="#1A865F"
                  fontFamily="Raleway"
                  color="#FFFFFF"
                  _hover={{ bg: "teal.500" }}
                  onClick={() => handleNavigate(barrio.neighborhoodId)}
                >
                  Gestionar Campañas
                </Button>
                <Button
                  textShadow="0.4px 0.4px 0.4px black"
                  bg="#1A865F"
                  fontFamily="Raleway"
                  color="#FFFFFF"
                  _hover={{ bg: "teal.500" }}
                  onClick={() =>
                    navigate(`/treelist/${idProject}/${barrio.idUnitWork}`, {
                      state: {
                        idUnitWork: barrio.idUnitWork,
                        projectName,
                        neighborhoodName: barrio.neighborhoodName,
                      },
                    })
                  }
                >
                  Listar Árboles
                </Button>
                <Button
                  textShadow="0.4px 0.4px 0.4px black"
                  bg="#1A865F"
                  fontFamily="Raleway"
                  color="#FFFFFF"
                  _hover={{ bg: "teal.500" }}
                  onClick={() =>
                    navigate(
                      `/neighborhood/${idProject}/${barrio.idUnitWork}`,
                      {
                        state: {
                          idUnitWork: barrio.idUnitWork,
                          projectName,
                          neighborhoodName: barrio.neighborhoodName,
                          neighborhoodId: barrio.neighborhoodId,
                        },
                      }
                    )
                  }
                >
                  Ver Mapa
                </Button>
              </Flex>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageUnitWorks;
