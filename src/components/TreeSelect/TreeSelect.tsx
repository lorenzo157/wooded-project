import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { useData } from "../../context/dataContext";
import { SearchParam } from "../../types/Pages";
import { useGetAndSetQueryParam } from "../../hooks/useGetAndSetQueryParam";
import { Select } from "chakra-react-select";
import { Tree } from "../../types/Tree";
import { findTreesByUnitWork } from "../../services/UnitWorkService";
import { useParams } from "react-router-dom";
import { findAllTreesByIdProject } from "../../services/TreeService";

interface Option {
  label: string;
  value: number;
}

const TreeSelect = () => {
  // const { isLoadingTreesData, trees } = useData();
  const [isLoadingFiltersData, setIsLoadingFiltersData] =
    useState<boolean>(true);
  const [selectedTreeId, setSelectedTreeId] = useGetAndSetQueryParam(
    SearchParam.Id
  );
  const [trees, setTrees] = useState<Tree[]>([]);
  const { idProject, idUnitWork } = useParams<{
    idProject: string;
    idUnitWork?: string;
  }>();
  const [selectedTree, setSelectedTree] = useState<Option>();

  useEffect(() => {
    if (!selectedTreeId){
      return;
    }
    setSelectedTree({
      value: Number(selectedTreeId),
      label: selectedTreeId,
    });

    
  }, [selectedTreeId]);

  useEffect(() => {
    const fetchTrees = async () => {
      setIsLoadingFiltersData(true);
      try {
        let data: Tree[] = [];
        if (idProject && idUnitWork === "0") {
          data = await findAllTreesByIdProject(Number(idProject));
        } else {
          data = await findTreesByUnitWork(
            Number(idProject),
            Number(idUnitWork)
          );
        }
        setTrees(data);
      } catch (error) {
        console.error("Error al obtener los árboles:", error);
      } finally {
        setIsLoadingFiltersData(false);
      }
    };

    fetchTrees();
  }, [idProject, idUnitWork]);

  return (
    <Flex gap={2} alignItems={"center"} justify={"center"} zIndex={5000}>
      <Select
        isDisabled={isLoadingFiltersData}
        size="sm"
        chakraStyles={{
          container: (provided) => ({
            ...provided,
            backgroundColor: "gray.200",
            width: "200px",
          }),
        }}
        noOptionsMessage={() => "No hay opciones"}
        placeholder="Ingrese el ID"
        useBasicStyles
        isClearable
        value={selectedTree}
        onChange={(value) => {
          setSelectedTree(value as Option);
          setSelectedTreeId(value?.value.toString());
        }}
        options={trees.map((v: Tree) => {
          return { value: v.idTree, label: String(v.idTree) };
        })}
      />
    </Flex>
  );
};

export default TreeSelect;
