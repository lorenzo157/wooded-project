import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  deleteTreeById,
  getTreeById,
  findAllTreesByIdProject,
} from "../services/TreeService";

import { findTreesByUnitWork } from "../services/UnitWorkService";
import { Arboles, ArbolesDetalles } from "../types/Project";
import "./Style.css";
import { Button, Flex, Heading, VStack } from "@chakra-ui/react";

interface TreeListProps {
  tipo: "muestreo" | "individual";
}

const TreeList: React.FC<TreeListProps> = ({ tipo }) => {
  const { idProject, idUnitWork } = useParams<{
    idProject: string;
    idUnitWork?: string;
  }>();
  const [trees, setTrees] = useState<Arboles[]>([]);
  const [treeDetails, setTreeDetails] = useState<{
    [key: number]: ArbolesDetalles | null;
  }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedTrees, setExpandedTrees] = useState<Set<number>>(new Set());
  const noData = "Sin datos";

  const location = useLocation();
  const projectName = location.state?.projectName || "Proyecto Desconocido";
  const neighborhoodName =
    location.state?.neighborhoodName || "Barrio Desconocido";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrees = async () => {
      if (!idProject) return;
      setLoading(true);
      try {
        let data: any[] = [];
        if (Number(idUnitWork) === 0 && idProject) {
          data = await findAllTreesByIdProject(Number(idProject));
        } else {
          data = await findTreesByUnitWork(
            Number(idProject),
            Number(idUnitWork)
          );
        }

        if (!data || data.length === 0) {
          setError("El proyecto seleccionado no contiene árboles.");
        } else {
          const formattedData: Arboles[] = data.map((tree) => ({
            idTree: tree.idTree,
            address: (tree.address = "Desconocida"),
            datetime: new Date(tree.datetime).getTime(),
            treeValue: tree.treeValue ?? "No asignado",
            treeName: tree.treeName,
            risk: tree.risk ?? "N/A",
            lat: tree.latitude ?? 0, // Evitar undefined
            lng: tree.longitude ?? 0, // Evitar undefined
          }));
          setTrees(formattedData);
        }
      } catch {
        setError("No se pudo obtener la información de los árboles.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrees();
  }, [idProject, idUnitWork]);

  const toggleExpand = async (idTree: number) => {
    setExpandedTrees((prev) => {
      const newExpanded = new Set(prev);
      newExpanded.has(idTree)
        ? newExpanded.delete(idTree)
        : newExpanded.add(idTree);
      return newExpanded;
    });

    if (!treeDetails[idTree]) {
      try {
        const data = await getTreeById(idTree);
        setTreeDetails((prev) => ({ ...prev, [idTree]: data }));
      } catch {
        console.error(`Error al obtener detalles del árbol con ID ${idTree}`);
      }
    }
  };

  const handleDelete = async (idTree: number) => {
    if (window.confirm("¿Estás seguro de eliminar este árbol?")) {
      try {
        await deleteTreeById(idTree);
        setTrees((prevTrees) =>
          prevTrees.filter((tree) => tree.idTree !== idTree)
        );
      } catch {
        alert("No se pudo eliminar el árbol.");
      }
    }
  };

  if (loading) return <p>Cargando árboles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <Heading size="lg" fontWeight="light">
        Listado de árboles
        {Number(idUnitWork) === 0 ? (
          <Heading size="md" fontWeight="light">
            Proyecto: {projectName} - ID: {idProject}{" "}
          </Heading>
        ) : (
          <Heading size="md" fontWeight="light">
            Unidad de Trabajo ID: {idUnitWork} - Barrio: {neighborhoodName}
          </Heading>
        )}
      </Heading>

      <div>
        {trees.map((tree) => (
          <div key={tree.idTree} className="tree-item">
            <Flex width="100%" gap="2">
              <Button
                textShadow="0.4px 0.4px 0.4px black"
                fontFamily="Raleway"
                bg="#1A865F"
                color="#FFFFFF"
                flex="1"
                textAlign="left"
                _hover={{ bg: "teal.500" }}
                onClick={() => toggleExpand(tree.idTree)}
              >
                ID: {tree.idTree} - {tree.treeName}
                <span
                  className={`tree-toggle-icon ${
                    expandedTrees.has(tree.idTree) ? "expanded" : ""
                  }`}
                >
                  {expandedTrees.has(tree.idTree) ? "▲" : "▼"}
                </span>
              </Button>
              <Button
                textShadow="0.4px 0.4px 0.4px black"
                bg="#1A865F"
                fontFamily="Raleway"
                color="#FFFFFF"
                _hover={{ bg: "teal.500" }}
                className="delete-button"
                onClick={() => handleDelete(tree.idTree)}
                style={{ flexShrink: 0, marginLeft: "8px" }}
              >
                Eliminar
              </Button>
            </Flex>
            {expandedTrees.has(tree.idTree) && treeDetails[tree.idTree] && (
              <div className="tree-details">
                <div className="tree-info">
                  <p>
                    <strong>ID:</strong> {treeDetails[tree.idTree]?.idTree}
                  </p>
                  <p>
                    <strong>Nombre:</strong>{" "}
                    {treeDetails[tree.idTree]?.treeName}
                  </p>
                  <p>
                    <strong>Fecha:</strong>{" "}
                    {tree.datetime ? tree.datetime.toString() : "Sin fecha"}
                  </p>
                  <p>
                    <strong>Manzana:</strong>{" "}
                    {treeDetails[tree.idTree]?.cityBlock || noData}
                  </p>
                  <p>
                    <strong>Perímetro:</strong>{" "}
                    {treeDetails[tree.idTree]?.perimeter || noData} cm
                  </p>
                  <p>
                    <strong>Altura (m):</strong>{" "}
                    {treeDetails[tree.idTree]?.height || noData}
                  </p>
                  <p>
                    <strong>Inclinación:</strong>{" "}
                    {treeDetails[tree.idTree]?.incline || noData}
                  </p>
                  <p>
                    <strong>Árboles en la Manzana:</strong>{" "}
                    {treeDetails[tree.idTree]?.treeInTheBlock || noData}
                  </p>
                  <p>
                    <strong>Uso Bajo el Árbol:</strong>{" "}
                    {treeDetails[tree.idTree]?.useUnderTheTree || noData}
                  </p>
                  <p>
                    <strong>Frecuencia de Uso:</strong>{" "}
                    {treeDetails[tree.idTree]?.frequencyUse || noData}
                  </p>
                  <p>
                    <strong>Daño Potencial:</strong>{" "}
                    {treeDetails[tree.idTree]?.potentialDamage || noData}
                  </p>
                  <p>
                    <strong>Movible:</strong>{" "}
                    {treeDetails[tree.idTree]?.isMovable ? "Sí" : "No"}
                  </p>
                  <p>
                    <strong>Restringible:</strong>{" "}
                    {treeDetails[tree.idTree]?.isRestrictable ? "Sí" : "No"}
                  </p>
                  <p>
                    <strong>Faltante:</strong>{" "}
                    {treeDetails[tree.idTree]?.isMissing ? "Sí" : "No"}
                  </p>
                  <p>
                    <strong>Muerto:</strong>{" "}
                    {treeDetails[tree.idTree]?.isDead ? "Sí" : "No"}
                  </p>
                  <p>
                    <strong>Raíces Expuestas:</strong>{" "}
                    {treeDetails[tree.idTree]?.exposedRoots ? "Sí" : "No"}
                  </p>
                  <p>
                    <strong>DCH:</strong>{" "}
                    {treeDetails[tree.idTree]?.dch || noData}
                  </p>
                  <p>
                    <strong>Exposición al Viento:</strong>{" "}
                    {treeDetails[tree.idTree]?.windExposure || noData}
                  </p>
                  <p>
                    <strong>Vigor:</strong>{" "}
                    {treeDetails[tree.idTree]?.vigor || noData}
                  </p>
                  <p>
                    <strong>Densidad de la Copa:</strong>{" "}
                    {treeDetails[tree.idTree]?.canopyDensity || noData}
                  </p>
                  <p>
                    <strong>Espacio de Crecimiento:</strong>{" "}
                    {treeDetails[tree.idTree]?.growthSpace || noData}
                  </p>
                  <p>
                    <strong>Valor:</strong>{" "}
                    {treeDetails[tree.idTree]?.treeValue || "No asignado"}
                  </p>
                  <p>
                    <strong>Materialidad de la Calle:</strong>{" "}
                    {treeDetails[tree.idTree]?.streetMateriality ||
                      "No especificado"}
                  </p>
                  <p>
                    <strong>Riesgo:</strong>{" "}
                    {treeDetails[tree.idTree]?.risk || noData}
                  </p>
                  <p>
                    <strong>Dirección:</strong>{" "}
                    {treeDetails[tree.idTree]?.address}
                  </p>
                  <p>
                    <strong>Barrio:</strong>{" "}
                    {treeDetails[tree.idTree]?.neighborhoodName}
                  </p>
                  <p>
                    <strong>Tipo de Árbol:</strong>{" "}
                    {treeDetails[tree.idTree]?.treeTypeName || noData}
                  </p>
                  <p>
                    <strong>Género:</strong>{" "}
                    {treeDetails[tree.idTree]?.gender || "Desconocido"}
                  </p>
                  <p>
                    <strong>Especie:</strong>{" "}
                    {treeDetails[tree.idTree]?.species || "Desconocida"}
                  </p>
                  <p>
                    <strong>Nombre Científico:</strong>{" "}
                    {treeDetails[tree.idTree]?.scientificName || "Desconocido"}
                  </p>
                  <p>
                    <strong>Coordenadas:</strong>{" "}
                    {treeDetails[tree.idTree]?.latitude},{" "}
                    {treeDetails[tree.idTree]?.longitude}
                  </p>
                  <p>
                    <strong>Conflictos:</strong>{" "}
                    {treeDetails[tree.idTree]?.conflictsNames?.join(", ") ||
                      "Ninguno"}
                  </p>
                  <p>
                    <strong>Defectos:</strong>
                  </p>
                  <ul style={{ marginLeft: "2%" }}>
                    {treeDetails[tree?.idTree]?.defectDto?.length ? (
                      treeDetails[tree.idTree]!.defectDto.map((def) => (
                        <li key={def.defectName}>
                          <p>
                            <strong>Nombre:</strong> {def.defectName}
                          </p>
                          <p>
                            <strong>Valor:</strong> {def.defectValue}
                          </p>
                          <p>
                            <strong>Descripción:</strong> {def.textDefectValue}
                          </p>
                          <p>
                            <strong>Ramas:</strong> {def.branches ?? noData}
                          </p>
                        </li>
                      ))
                    ) : (
                      <li>Ninguno</li>
                    )}
                  </ul>
                  <p>
                    <strong>Enfermedades:</strong>{" "}
                    {treeDetails[tree.idTree]?.diseasesNames?.join(", ") ||
                      "Ninguna"}
                  </p>
                  <p>
                    <strong>Intervenciones:</strong>{" "}
                    {treeDetails[tree.idTree]?.interventionsNames?.join(", ") ||
                      "Ninguna"}
                  </p>
                  <p>
                    <strong>Plagas:</strong>{" "}
                    {treeDetails[tree.idTree]?.pestsNames?.join(", ") ||
                      "Ninguna"}
                  </p>
                </div>
                <div className="tree-image-container">
                  {treeDetails[tree.idTree]?.pathPhoto ? (
                    <img
                      src={treeDetails[tree.idTree]?.pathPhoto ?? undefined}
                      alt="Árbol"
                      className="tree-image"
                    />
                  ) : (
                    "No disponible"
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TreeList;
