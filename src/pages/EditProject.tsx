import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProjectById,
  updateProjectById,
  getIdUserByIdProject,
} from "../services/ProjectService";

import { Alert, AlertIcon, Button, useToast, Box, Heading } from "@chakra-ui/react";
import { Project } from "../types/Project";

const EditProject: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { idProject } = useParams<{ idProject?: string }>();

  const [project, setProject] = useState<Project>({
    projectName: "",
    projectDescription: "",
    startDate: "",
    endDate: "",
    cityName: "",
    projectType: true,
    provinceName: "",
  });

  const [idUser, setIdUser] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!idProject) {
      setError("No se encontró el ID del proyecto.");
      setLoading(false);
      return;
    }

    const fetchProject = async () => {
      try {
        setLoading(true);
        const [projectData, userIdData] = await Promise.all([
          getProjectById(Number(idProject)),
          getIdUserByIdProject(idProject),
        ]);

        setIdUser(Number(userIdData.ObjectidUser));

        const formattedProject = {
          ...projectData,
          startDate: projectData.startDate?.split("T")[0] || "",
          endDate: projectData.endDate?.split("T")[0] || "",
        };

        setProject(formattedProject);
      } catch (error) {
        setError("Error al cargar los datos del proyecto.");
        console.error("Error al cargar el proyecto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [idProject]);

  useEffect(() => {
    if (idUser !== null && !isNaN(idUser)) {
      navigate(`/home/${idUser}`);
    }
  }, [idUser, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProject((prevProject) => ({ ...prevProject, [name]: value }));
  };

  const handleProjectTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProject((prevProject) => ({
      ...prevProject,
      projectType: e.target.value === "true",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Actualizar el proyecto
      await updateProjectById(Number(idProject), project);

      toast({
        title: "Proyecto",
        description: "El proyecto se ha actualizado correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      const userIdData = await getIdUserByIdProject(idProject ?? "");
      const newIdUser = Number(userIdData.idUser);

      if (isNaN(newIdUser) || newIdUser <= 0) {
        throw new Error("No se pudo obtener un ID válido del usuario.");
      }
      setIdUser(newIdUser);
      navigate(`/home/${newIdUser}`);
    } catch (error) {
      setError("Error al actualizar el proyecto.");
      toast({
        title: "Error",
        description:
          "Hubo un problema al actualizar el proyecto. Intenta de nuevo.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  if (loading) return <p>Cargando datos del proyecto...</p>;
  if (error)
    return (
      <Alert
        status="error"
        variant="solid"
        colorScheme="red"
        borderRadius="md"
        boxShadow="lg"
        mb={4}
      >
        <AlertIcon />
        {error}
      </Alert>
    );

  return (
    <Box maxHeight="100vh" overflowY="auto" padding="1rem">
      <Heading size="md" fontWeight="light">Editar Proyecto </Heading>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre del Proyecto</label>
          <input
            type="text"
            name="projectName"
            value={project.projectName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descripción del Proyecto</label>
          <textarea
            name="projectDescription"
            value={project.projectDescription || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Fecha de Inicio</label>
          <input
            type="date"
            name="startDate"
            value={project.startDate || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Fecha de Fin</label>
          <input
            type="date"
            name="endDate"
            value={project.endDate || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tipo de Proyecto</label>
          <div>
            <label>
              <input
                type="radio"
                name="projectType"
                value="true"
                checked={project.projectType === true}
                onChange={handleProjectTypeChange}
              />
              Individual
            </label>
            <label>
              <input
                type="radio"
                name="projectType"
                value="false"
                checked={project.projectType === false}
                onChange={handleProjectTypeChange}
              />
              Muestreo
            </label>
          </div>
        </div>
        <div>
          <label>Ciudad</label>
          <input
            type="text"
            name="cityId"
            value={project.cityName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Provincia</label>
          <input
            type="text"
            name="provinceName"
            value={project.provinceName}
            onChange={handleChange}
            required
          />
        </div>
        <Button
          textShadow="0.4px 0.4px 0.4px black"
          fontFamily="Raleway"
          bg="#1A865F"
          color="#FFFFFF"
          _hover={{ bg: "teal.500" }}
          type="submit"
          size="md"
          mt={4}
        >
          Guardar Cambios
        </Button>
      </form>
    </Box>
  );
};

export default EditProject;
