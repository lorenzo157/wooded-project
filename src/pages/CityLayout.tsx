import { FC, useRef } from "react";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { MapRef } from "../types/Map";
import MapFilters from "../components/MapFilters/MapFilters";
import MapResults from "../components/MapResults/MapResults";
import queryString from "query-string";
import axios from "axios";
import { useQueryParams } from "use-query-params";
import { useData } from "../context/dataContext";
import { TreeRequestData } from "../types/Tree";
import { useShowErrorAndLogout } from "../hooks/useShowErrorAndLogout";
//import Charts from "../components/Charts/Charts";
import { Request, RequestStatus } from "../types/Request";
import Charts from "../components/Charts/Charts";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Tree } from "../types/TreePrueba";
import { findTreesByUnitWork } from "../services/UnitWorkService";
import { findAllTreesByIdProject } from "../services/TreeService";
import { Filter, FilterName } from "../types/Project";
import { FilterNames } from "../types/Project";
import { MapComponent } from "../components/Map/MapComponent";

const CityLayout: FC = () => {
  interface TreeMapComponentProps {
    trees: Tree[];
    neighborhoodCoordinates: { latitude: string; longitude: string }[] | null;
    getTreeDetails: (tree: Tree) => void;
  }
  const mapRef = useRef<MapRef>(null);
  const { setNeighborhoods, setLoadingTreesData } = useData();
  const [query] = useQueryParams();
  const { showErrorAndLogout } = useShowErrorAndLogout();
  const { idProject, idUnitWork } = useParams<{
    idProject: string;
    idUnitWork?: string;
  }>();
  const location = useLocation();
  const {
    trees: initialTrees = [],
    coordinates = [],
    neighborhoodName,
    neighborhoodId,
    type,
  } = location.state || {};

  const [neighborhoodCoordinates, setNeighborhoodCoordinates] = useState<
    { latitude: string; longitude: string }[] | null
  >(null);
  const [trees, setTrees] = useState<Tree[]>(initialTrees);
  const [filters, setFilters] = useState<Filter>({});
  const [isLoadingFiltersData, setIsLoadingFiltersData] =
    useState<boolean>(true);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const filterNames = Object.values(FilterName).join(",");
        const url = `${process.env.REACT_APP_BASE_URL}/project/${idProject}/tree/${idUnitWork}/get-all-filters`;
        const response = await axios.get(url, {
          params: {
            filterNames: filterNames,
          },
        });

        const responseData = response.data;

        const transformedFilters: Record<string, string[]> =
          responseData.reduce(
            (
              acc: { [x: string]: any },
              filter: { filterName: string | number; values: any[] }
            ) => {
              if (filter.filterName) {
                acc[filter.filterName] = filter.values.map(
                  (item) => item[filter.filterName]
                );
              }
              return acc;
            },
            {} as Record<string, string[]>
          );

        setFilters(transformedFilters);
        setIsLoadingFiltersData(false);
      } catch (error) {
        console.error("Error al obtener los filtros:", error);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchTrees = async () => {
      try {

        if (idProject && idUnitWork === "0") {
          const data = await findAllTreesByIdProject(Number(idProject));
          setTrees(data);
        } else {
          const data = await findTreesByUnitWork(
            Number(idProject),
            Number(idUnitWork)
          );
          setTrees(data);
        }
      } catch (error) {
        console.error("Error al obtener los árboles:", error);
      }
    };

    fetchTrees();
  }, [idProject, idUnitWork, type, location.state]);

  return (
    <Flex direction={"column"}>
      <Flex h="100vh" bgColor="#EFF2F9" flexDir={"column"}>
        <Grid
          h="100%"
          columnGap={6}
          templateColumns="2fr 1fr"
          px="6"
          py="10"
          overflow={"hidden"}
        >
          <GridItem w="100%" h="90%">
            <MapComponent selectableNeighborhoods showPopup mapRef={mapRef} />
          </GridItem>
          <GridItem w="100%" h="100%" overflow={"hidden"}>
            <Grid
              // row={2}
              h="100%"
              gap={4}
              flexDir={"column"}
              overflow={"auto"}
              templateRows="repeat(2,1fr)"
            >
              {filters && Object.keys(filters) ? (
                <MapFilters map={mapRef.current ?? undefined} />
              ) : (
                <div>No filters available</div> // Mensaje cuando los filtros están vacíos
              )}

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

export default CityLayout;
