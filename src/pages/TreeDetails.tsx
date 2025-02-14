import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getTreeDetailsByIdProject } from "../services/TreeService";
import { ArbolesDetalles, DefectTreeDto } from "../types/Project";

const TreeDetails: React.FC = () => {
  const { idTree } = useParams<{ idTree: string }>();
  const location = useLocation();
  const idProject = location.state?.idProject || null;

  const [treeDetails, setTreeDetails] = useState<ArbolesDetalles | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTreeDetails = async () => {
      if (!idProject || !idTree) {
        setError("Faltan datos para cargar los detalles del árbol.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getTreeDetailsByIdProject(
          Number(idProject),
          Number(idTree)
        );
        setTreeDetails(data);
      } catch (err: any) {
        console.error(err);
        setError("Error al cargar los detalles del árbol. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };

    fetchTreeDetails();
  }, [idProject, idTree]);

  if (!idProject) {
    return (
      <p>
        No se proporcionó el proyecto necesario para cargar los detalles del
        árbol.
      </p>
    );
  }

  if (loading) return <p>Cargando detalles del árbol...</p>;
  if (error) return <p>{error}</p>;
  if (!treeDetails) return <p>No se encontraron detalles del árbol.</p>;

  return (
    <div
      style={{
        height: "80vh",
        overflowY: "scroll",
        padding: "20px",
        border: "1px solid #ccc",
      }}
    >
      <h2>Detalles del Árbol</h2>
      <ul>
        <li>
          <strong>ID del árbol:</strong> {treeDetails.idTree}
        </li>
        <li>
          <strong>Nombre del árbol:</strong> {treeDetails.treeName}
        </li>
        <li>
          <strong>Fecha de registro:</strong>{" "}
          {new Date(treeDetails.datetime).toLocaleString()}
        </li>
        <li>
          <strong>Foto:</strong>{" "}
          {treeDetails.pathPhoto ? (
            <img
              src={treeDetails.pathPhoto}
              alt="Árbol"
              style={{ width: "200px" }}
            />
          ) : (
            "No disponible"
          )}
        </li>
        <li>
          <strong>Bloque de la ciudad:</strong> {treeDetails.cityBlock}
        </li>
        <li>
          <strong>Perímetro:</strong>{" "}
          {treeDetails.perimeter || "No especificado"}
        </li>
        <li>
          <strong>Altura:</strong> {treeDetails.height || "No especificada"}
        </li>
        <li>
          <strong>Inclinación:</strong>{" "}
          {treeDetails.incline || "No especificada"}
        </li>
        <li>
          <strong>Árbol en el bloque:</strong>{" "}
          {treeDetails.treeInTheBlock || "No especificado"}
        </li>
        <li>
          <strong>Uso debajo del árbol:</strong>{" "}
          {treeDetails.useUnderTheTree || "No especificado"}
        </li>
        <li>
          <strong>Frecuencia de uso:</strong>{" "}
          {treeDetails.frequencyUse || "No especificada"}
        </li>
        <li>
          <strong>Daño potencial:</strong>{" "}
          {treeDetails.potentialDamage || "No especificado"}
        </li>
        <li>
          <strong>¿Es movible?:</strong> {treeDetails.isMovable ? "Sí" : "No"}
        </li>
        <li>
          <strong>¿Es restringible?:</strong>{" "}
          {treeDetails.isRestrictable ? "Sí" : "No"}
        </li>
        <li>
          <strong>¿Está desaparecido?:</strong>{" "}
          {treeDetails.isMissing ? "Sí" : "No"}
        </li>
        <li>
          <strong>¿Está muerto?:</strong> {treeDetails.isDead ? "Sí" : "No"}
        </li>
        <li>
          <strong>¿Raíces expuestas?:</strong>{" "}
          {treeDetails.exposedRoots ? "Sí" : "No"}
        </li>
        <li>
          <strong>DCH:</strong> {treeDetails.dch || "No especificado"}
        </li>
        <li>
          <strong>Exposición al viento:</strong>{" "}
          {treeDetails.windExposure || "No especificada"}
        </li>
        <li>
          <strong>Vigor:</strong> {treeDetails.vigor || "No especificado"}
        </li>
        <li>
          <strong>Densidad del follaje:</strong>{" "}
          {treeDetails.canopyDensity || "No especificada"}
        </li>
        <li>
          <strong>Espacio de crecimiento:</strong>{" "}
          {treeDetails.growthSpace || "No especificado"}
        </li>
        <li>
          <strong>Valor del árbol:</strong>{" "}
          {treeDetails.treeValue || "No especificado"}
        </li>
        <li>
          <strong>Materialidad de la calle:</strong>{" "}
          {treeDetails.streetMateriality || "No especificada"}
        </li>
        <li>
          <strong>Riesgo:</strong> {treeDetails.risk || "No especificado"}
        </li>
        <li>
          <strong>Dirección:</strong> {treeDetails.address}
        </li>
        <li>
          <strong>Conflictos:</strong>{" "}
          {treeDetails.conflictsNames.join(", ") || "Ninguno"}
        </li>
        <li>
          <strong>Defectos:</strong>
          <div
            style={{
              overflowX: "scroll",
              whiteSpace: "nowrap",
              border: "1px solid #ddd",
              padding: "10px",
            }}
          >
            {treeDetails.defectDto.map((defect: DefectTreeDto, index) => (
              <div
                key={index}
                style={{
                  display: "inline-block",
                  marginRight: "20px",
                  padding: "10px",
                  border: "1px solid #ccc",
                  minWidth: "250px",
                  textAlign: "left",
                }}
              >
                <p>
                  <strong>Defecto:</strong> {defect.defectName}
                </p>
                <p>
                  <strong>Valor:</strong> {defect.defectValue}
                </p>
                <p>
                  <strong>Texto:</strong> {defect.textDefectValue}
                </p>
                <p>
                  <strong>Ramas:</strong> {defect.branches || "No especificado"}
                </p>
              </div>
            ))}
          </div>
        </li>
        <li>
          <strong>Enfermedades:</strong>{" "}
          {treeDetails.diseasesNames.join(", ") || "Ninguna"}
        </li>
        <li>
          <strong>Intervenciones:</strong>{" "}
          {treeDetails.interventionsNames.join(", ") || "Ninguna"}
        </li>
        <li>
          <strong>Plagas:</strong>{" "}
          {treeDetails.pestsNames.join(", ") || "Ninguna"}
        </li>
        <li>
          <strong>Latitud:</strong> {treeDetails.latitude}
        </li>
        <li>
          <strong>Longitud:</strong> {treeDetails.longitude}
        </li>
        <li>
          <strong>Nombre del vecindario:</strong> {treeDetails.neighborhoodName}
        </li>
        <li>
          <strong>Tipo de árbol:</strong> {treeDetails.treeTypeName}
        </li>
        <li>
          <strong>Género:</strong> {treeDetails.gender || "No especificado"}
        </li>
        <li>
          <strong>Especie:</strong> {treeDetails.species || "No especificada"}
        </li>
        <li>
          <strong>Nombre científico:</strong>{" "}
          {treeDetails.scientificName || "No especificado"}
        </li>
      </ul>
    </div>
  );
};

export default TreeDetails;
