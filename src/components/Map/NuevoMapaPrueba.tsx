import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { MapComponent } from "./MapComponent";
import { MapRef } from "../../types/Map";
import { Pages } from "../../types/Pages";
import Header from "../Header/Header";
import MapFilters from "../MapFilters/MapFilters";
import MapResults from "../MapResults/MapResults";
import queryString from "query-string";
import axios from "axios";
import { useQueryParams } from "use-query-params";
import { useData } from "../../context/dataContext";
import { TreeRequestData } from "../../types/Tree";
import { useShowErrorAndLogout } from "../../hooks/useShowErrorAndLogout";
import Charts from "../Charts/Charts";
import { Request, RequestStatus } from "../../types/Request";
// import { DataContext } from "../../context/dataContext";

const NuevoMapaPrueba: FC = () => {
  const mapRef = useRef<MapRef>(null);
  const { setNeighborhoods, setTrees, setLoadingTreesData } = useData();
  const [query] = useQueryParams();
  const { showErrorAndLogout } = useShowErrorAndLogout();
  const [isLoadingFiltersData, setIsLoadingFiltersData] = useState(false);
  // const { filters, setFilters } = useContext(DataContext);


  useEffect(() => {
    const init = async () => {
      setIsLoadingFiltersData(true);
      try {
        const url = `${process.env.REACT_APP_BASE_URL}/project/11/tree/45/get-all-filters`;
    
        const filterNames = [
          "isDead",
          "isMissing",
          "diseases",
          "exposedRoots",
          "species",
          "pests",
          "treeValue",
          "conflicts",
          "windExposure",
          "vigor",
          "canopyDensity",
          "growthSpace",
          "risk",
          "intervention",
          "streetMateriality",
        ];
    
        const response = await axios.get(url, {
          params: { filterNames },
          paramsSerializer: (params) => {
            return Object.keys(params)
              .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
              .join("&");
          },
        });
        
        if (response.data.status === RequestStatus.Success && response.data.data) {
          const formattedFilters = response.data.data.reduce(
            (acc: Record<string, string[]>, filter: { filterName: string; values: string[] }) => {
              if (typeof filter.filterName === "string") {
                acc[filter.filterName] = filter.values;
              }
              return acc;
            },
            {} as Record<string, string[]>
          );
        
          // setFilters(formattedFilters);
        
        } else {
          console.error("Error fetching filters:", response.data?.error);
        }
      } catch (error) {
        console.error("Error fetching filters:", error);
      } finally {
        setIsLoadingFiltersData(false);
      }
    };
  
    init(); // ✅ Llamar la función directamente dentro del `useEffect`
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]); // ✅ `useEffect` solo debe ejecutarse cuando `query` cambie
  

  return (
    <Flex direction={"column"}>
      <Flex h="100vh" bgColor="#EFF2F9" flexDir={"column"}>
        <Grid
          h="100%"
          columnGap={3}
          templateColumns="2fr 1fr"
          px="3"
          py="3"
          overflow={"hidden"}
        >
          <GridItem w="100%" h="100%">
            <MapComponent selectableNeighborhoods showPopup mapRef={mapRef} userCity={undefined}  />
          </GridItem>
          <GridItem w="100%" h="100%" overflow={"hidden"}>
            <Grid
              // row={2}
              h="100%"
              gap={2}
              flexDir={"column"}
              overflow={"auto"}
              templateRows="repeat(2,1fr)"
            >
              <MapFilters map={mapRef.current ?? undefined} />
              <MapResults map={mapRef.current ?? undefined} />
            </Grid>
          </GridItem>
        </Grid>
      </Flex>
      <Flex minH="100vh" bgColor={"#dfe6e9"}>
        <Charts />
      </Flex>
    </Flex>
  );
};

export default NuevoMapaPrueba;