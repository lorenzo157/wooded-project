import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Select from "react-select"; // Importamos react-select
import "./Style.css";
import {
  getAllProvinces,
  getCitiesByProvinceId,
} from "../services/UserService";
import { createProject } from "../services/ProjectService";
import { Province } from "../types/Location/Province";
import { City } from "../types/Location/City";
import { Button } from "@chakra-ui/react";

const FormProject: React.FC = () => {
  const navigate = useNavigate();

  const { idUser } = useParams<{ idUser?: string }>();

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectType, setProjectType] = useState("muestra");

  const location = useLocation();

  const [provinces, setProvinces] = useState<
    { label: string; value: string }[]
  >([]);
  const [province, setProvince] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [cities, setCities] = useState<{ label: string; value: string }[]>([]);
  const [city, setCity] = useState<{ label: string; value: string } | null>(
    null
  );
  const [formData, setFormData] = useState({
    projectName: "",
    startDate: "",
    endDate: "", // Permitimos que sea vacío
  });
  useEffect(() => {
    getProvinces();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value || "",
    });
  };

  const getProvinces = async () => {
    try {
      const response = await getAllProvinces();
      const formattedProvinces = response.map((province: Province) => ({
        label: province.provinceName,
        value: String(province.idProvince),
      }));
      setProvinces(formattedProvinces);
    } catch (error) {
      console.log("Error al obtener provincias:", error);
    }
  };

  const getCities = async (provinceId: string) => {
    try {
      const response = await getCitiesByProvinceId(Number(provinceId));
      const formattedCities = response.map((city: City) => ({
        label: city.cityName,
        value: String(city.idCity),
      }));
      setCities(formattedCities);
      setCity(null);
    } catch (error) {
      console.log("Error al obtener ciudades:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!idUser) {
      alert("No se encontró el ID de usuario.");
      return;
    }

    const projectData = {
      projectName: formData.projectName,
      startDate: formData.startDate,
      ...(formData.endDate && { endDate: formData.endDate }), // Solo si tiene valor
    };

    try {
      await createProject(projectData);
      alert("Proyecto creado exitosamente");
      navigate(`/home/${idUser}`);
    } catch (error) {
      console.error("Error al crear el proyecto:", error);
      alert("Hubo un error al crear el proyecto. Inténtalo nuevamente.");
    }
  };

  return (
    <div>
      <div className="formulario-container">
        <form className="formulario" onSubmit={handleSubmit}>
          <h2>Crear nuevo proyecto</h2>

          <div>
            <label>Nombre del proyecto</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Descripción</label>
            <input
              type="text"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </div>

          <div>
            <label>Fecha de inicio</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Fecha de Finalización (Opcional)</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Tipo de proyecto</label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              required
            >
              <option value="muestra">Muestra</option>
              <option value="individual">Individual</option>
            </select>
          </div>

          <div>
            <label>Provincia</label>
            <Select
              options={provinces}
              value={province}
              onChange={(selectedOption) => {
                setProvince(selectedOption);
                if (selectedOption) getCities(selectedOption.value);
                else setCities([]);
              }}
              placeholder="Seleccione una provincia"
              isClearable
            />
          </div>

          <div>
            <label>Ciudad</label>
            <Select
              options={cities}
              value={city}
              onChange={setCity}
              placeholder="Seleccione una ciudad"
              isClearable
              isDisabled={!province}
            />
          </div>

          <div className="form-buttons">
            <Button
              textShadow="0.4px 0.4px 0.4px black"
              fontFamily="Raleway"
              bg="#1A865F"
              color="#FFFFFF"
              _hover={{ bg: "teal.500" }}
            >
              Crear proyecto
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormProject;
