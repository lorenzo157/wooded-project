import React, { useEffect, useState } from "react";
import { Project } from "../types/Project";
import {
  getAllProjectsCreatedByUser,
  deleteProjectById,
} from "../services/ProjectService";
import { useNavigate, useParams } from "react-router-dom";
import "./Style.css";
import { Button, Heading } from "@chakra-ui/react";

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { idUser } = useParams<{ idUser: string }>();
  const navigate = useNavigate();

  const handleModify = (idProject: number) => {
    if (idUser) {
      // Pasar idUser al estado de la navegación
      navigate(`/editproject/${idProject}`, { state: { idUser } });
    }
  };

  const handleNavigate = (idProject: number) => {
    navigate(`/assignusers/${idProject}`);
  };

  // En Home, modificar la navegación para pasar el nombre del proyecto
  const handleConditionalNavigate = (
    projectType: boolean,
    idProject: number,
    idUnitWork?: number
  ) => {
    const selectedProject = projects.find(
      (project) => project.idProject === idProject
    );
    if (selectedProject) {
      const projectName = selectedProject.projectName; // Obtener el nombre del proyecto.
      if (projectType) {
        if (!projectName) {
          console.warn(
            "No se encontró el nombre del proyecto para el id:",
            idProject
          );
        }
        navigate(`/treelist/${idProject}/0`, {
          state: { idUnitWork, projectName },
        });
      } else {
        navigate(`/unitworks/${idProject}`, {
          state: { idProject, projectName },
        });
      }
    }
  };

  const handleDelete = async (idProject: number) => {
    try {
      await deleteProjectById(idProject);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.idProject !== idProject)
      );
    } catch (error) {
      setError("Error al eliminar el proyecto.");
      console.error("Error al eliminar el proyecto:", error);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      if (!idUser) return;

      try {
        setLoading(true);
        const fetchedProjects = await getAllProjectsCreatedByUser(
          Number(idUser)
        );
        setProjects(fetchedProjects);
      } catch (error) {
        setError("Error al obtener los proyectos.");
        console.error("Error al obtener los proyectos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [idUser]);

  return (
    <div
      className="body-container"
      style={{ maxHeight: "100vh", overflowY: "auto" }}
    >
      {loading && <p>Cargando proyectos...</p>}
      {error && <p>{error}</p>}
      {!loading && projects.length === 0 && (
        <p>No hay proyectos asignados para este usuario.</p>
      )}
      {!loading && projects.length > 0 && (
        <div>
          <Heading fontSize="1.5rem" fontWeight="light">
            Proyectos creados
          </Heading>
          <div className="project-card">
            {projects.map((project) => (
              <div key={project.idProject} className="project-card">
                <div className="project-info">
                  <div className="project-details">
                    <p>ID: {project.idProject}</p>
                    <p>Nombre: {project.projectName}</p>
                    <p>Descripción: {project.projectDescription}</p>
                    <p>Fecha de inicio: {project.startDate}</p>
                    <p>Fecha de fin: {project.endDate}</p>
                    <p>
                      Tipo de proyecto:{" "}
                      {project.projectType ? "Individual" : "Muestreo"}
                    </p>
                  </div>
                  <div className="button-row">
                    <Button
                      textShadow="0.4px 0.4px 0.4px black"
                      fontFamily="Raleway"
                      bg="#1A865F"
                      color="#FFFFFF"
                      _hover={{ bg: "teal.500" }}
                      onClick={() =>
                        project.idProject && handleModify(project.idProject)
                      }
                    >
                      Modificar
                    </Button>
                    <Button
                      textShadow="0.4px 0.4px 0.4px black"
                      fontFamily="Raleway"
                      bg="#1A865F"
                      color="#FFFFFF"
                      _hover={{ bg: "teal.500" }}
                      onClick={() =>
                        project.idProject && handleDelete(project.idProject)
                      }
                    >
                      Eliminar
                    </Button>
                    <Button
                      textShadow="0.4px 0.4px 0.4px black"
                      fontFamily="Raleway"
                      bg="#1A865F"
                      color="#FFFFFF"
                      _hover={{ bg: "teal.500" }}
                      onClick={() =>
                        project.idProject && handleNavigate(project.idProject)
                      }
                    >
                      Asociar Usuario
                    </Button>
                    <Button
                      textShadow="0.4px 0.4px 0.4px black"
                      fontFamily="Raleway"
                      bg="#1A865F"
                      color="#FFFFFF"
                      _hover={{ bg: "teal.500" }}
                      onClick={() =>
                        project.idProject &&
                        handleConditionalNavigate(
                          project.projectType,
                          project.idProject
                        )
                      }
                    >
                      {project.projectType
                        ? "Listar árboles"
                        : "Gestionar unidades de trabajo"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
