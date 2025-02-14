import { Box, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { Tree } from "../../types/Tree";

interface Props {
  tree: Tree;
}

const TreeSummary: FC<Props> = ({ tree }) => {
  return (
    <Box color="white" fontSize={"md"}>
      <Text>{`ID: ${tree.idTree}`}</Text>
      <Text>{`Especie: ${tree.species}`}</Text>
      <Text>{`Direccion: ${tree.address}`}</Text>
      <Text>{`Fecha Medicion: ${tree.datetime}`}</Text>
      <Text>{`Altura: ${tree.height}`}</Text>
      <Text>{`DAP: ${tree.dch}`}</Text>
      <Text>{`Perimetro: ${tree.perimeter}`}</Text>
      <Text>{`Esta muerto: ${tree.isDead}`}</Text>
      <Text>{`Esta faltante: ${tree.isMissing}`}</Text>
      <Text>{`Enfermedades: ${tree.diseasesNames}`}</Text>
      <Text>{`Raices expuestas: ${tree.exposedRoots}`}</Text>
      <Text>{`Densidad de la copa: ${tree.canopyDensity}`}</Text>
      {/* <Text>{`Forma: ${tree.shape}`}</Text>  // No existe mas */}
      <Text>{`Valor del arbol: ${tree.treeValue}`}</Text>
      <Text>{`Plagas: ${tree.pestsNames}`}</Text>
      <Text>{`Exposicion a los vientos dominantes: ${tree.windExposure}`}</Text>
      <Text>{`Vigor: ${tree.vigor}`}</Text>
      {/* aca podria mostrar el nombre del barrio */}
      <Text>{`ID Barrio: ${tree.idNeighborhood}`}</Text>

      {/* // "conflict": null,
    // "canopy_density": "Normal",
    // "growth_space": "Vereda jardín",
    // "risk": "5",
    // "intervention": null,
    // "correction_tree": "Poda", */}
    </Box>
  );
};

export default TreeSummary;
