import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { patchCampaign, getCampaign, deleteCampaign } from "../services/UnitWorkService";
import { ReadUnitWorkDto } from "../types/Project";
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Input, useToast } from "@chakra-ui/react";
import "./Style.css";

const EditCampaign: React.FC = () => {
  const { idProject, idUnitWork } = useParams<{ idProject: string; idUnitWork: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [campaignData, setCampaignData] = useState<ReadUnitWorkDto | null>(null);
  const [formValues, setFormValues] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaña = async () => {
      try {
        setLoading(true);
        const data = await getCampaign(Number(idProject), Number(idUnitWork));
        setCampaignData(data);
        setFormValues(Object.keys(data).reduce((acc, key) => ({ ...acc, [key]: 0 }), {}));
      } catch (err) {
        setError("Error al obtener los datos de la campaña.");
      } finally {
        setLoading(false);
      }
    };
    fetchCampaña();
  }, [idProject, idUnitWork]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: Number(value) || 0 }));
  };

  const handleSave = async () => {
    try {
      await patchCampaign(Number(idProject), Number(idUnitWork), formValues);
      toast({ title: "Modificación guardada", status: "success", duration: 3000, isClosable: true });
      navigate(-1); // Regresar a la pantalla anterior
    } catch (error) {
      toast({ title: "Error al modificar", status: "error", duration: 3000, isClosable: true });
    }
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta campaña?")) {
      try {
        await deleteCampaign(Number(idProject), Number(idUnitWork));
        toast({ title: "Campaña eliminada", status: "success", duration: 3000, isClosable: true });
        navigate(-1);
      } catch (error) {
        toast({ title: "Error al eliminar", status: "error", duration: 3000, isClosable: true });
      }
    }
  };

  if (loading) return <p>Cargando datos de la campaña...</p>;
  if (error) return <p>{error}</p>;

  const intervenciones = [
    { label: "Poda (Formación)", key: "pruningTraining" },
    { label: "Poda (Sanitaria)", key: "pruningSanitary" },
    { label: "Poda (Reducción de altura)", key: "pruningHeightReduction" },
    { label: "Poda (Raleo de ramas)", key: "pruningBranchThinning" },
    { label: "Poda (Despeje de señalética)", key: "pruningSignClearing" },
    { label: "Poda (Despeje de conductores eléctricos)", key: "pruningPowerLineClearing" },
    { label: "Poda (Radicular + uso de deflectores)", key: "pruningRootDeflectors" },
    { label: "Cableado", key: "cabling" },
    { label: "Restringir acceso", key: "restrictAccess" },
    { label: "Mover el blanco", key: "moveTarget" },
    { label: "Sujeción", key: "fastening" },
    { label: "Apuntalamiento", key: "propping" },
    { label: "Aumentos de superficie permeable", key: "permeableSurfaceIncreases" },
    { label: "Fertilizaciones", key: "fertilizations" },
    { label: "Descompresión", key: "descompression" },
    { label: "Drenajes", key: "drains" },
    { label: "Extracciones", key: "extractions" },
    { label: "Plantaciones", key: "plantations" },
    { label: "Aperturas de cazuela", key: "openingsPot" },
    { label: "Inspecciones avanzadas", key: "advancedInspections" },
  ];

  return (
    <Box className="mod-container" border="1px solid black" p={4} borderRadius="md">
      <h1 className="mod-h1">Modificar campaña ID: {idUnitWork}</h1>
      <Table className="mod-table" variant="simple" size="sm" border="1px solid black">
        <Thead className="mod-table-header">
          <Tr>
            <Th className="mod-table-cell">Intervenciones</Th>
            <Th className="mod-table-cell">Realizadas hasta el momento</Th>
            <Th className="mod-table-cell">Nuevos Datos</Th>
            <Th className="mod-table-cell">Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {intervenciones.map(({ label, key }) => (
            <Tr key={key}>
              <Td className="mod-table-cell">{label}</Td>
              <Td className="mod-table-cell">
                {campaignData ? campaignData[key as keyof ReadUnitWorkDto] || 0 : 0}
              </Td>
              <Td className="mod-table-cell">
                <Input
                  className="mod-input-field"
                  type="number"
                  name={key}
                  value={formValues[key] || 0}
                  onChange={handleInputChange}
                  size="sm"
                  width="100px"
                />
              </Td>
              <Td className="mod-table-cell">
                {campaignData
                  ? (Number(campaignData[key as keyof ReadUnitWorkDto]) || 0) + (Number(formValues[key]) || 0)
                  : 0}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box className="mod-form-container" display="flex" justifyContent="space-between" mt={4}>
        <Button
            textShadow="0.4px 0.4px 0.4px black"
fontFamily="Raleway"
          bg="#1A865F"
          color="#FFFFFF"
                _hover={{ bg: "teal.500" }} border="1px solid black" colorScheme="red" onClick={handleDelete}>
          Eliminar
        </Button>
        <Button
            textShadow="0.4px 0.4px 0.4px black"
fontFamily="Raleway"
          bg="#1A865F"
          color="#FFFFFF"
                _hover={{ bg: "teal.500" }} border="1px solid black" colorScheme="blue" onClick={handleSave}>
          Modificar
        </Button>
        <Button
            textShadow="0.4px 0.4px 0.4px black"
fontFamily="Raleway"
          bg="#1A865F"
          color="#FFFFFF"
                _hover={{ bg: "teal.500" }} border="1px solid black" colorScheme="gray" onClick={() => navigate(-1)}>
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};

export default EditCampaign;
