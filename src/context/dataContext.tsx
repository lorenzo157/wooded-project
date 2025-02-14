import {
  createContext,
  useState,
  ReactNode,
  FC,
  useContext,
  useEffect,
} from "react";
import { Tree, TreeRequestData } from "../types/Tree";
import { Neighborhood } from "../types/Neighborhood";
import { Filter, FilterName, IsDead, IsMissing, Diseases, ExposedRoots, Species, Pests, TreeValue, Conflicts, WindExposure, Vigor, CanopyDensity, GrowthSpace, Risk, Intervention } from "../types/Project";
import axios from "axios";
import { Request, RequestStatus } from "../types/Request";
import { isUndefined } from "lodash";
import { useParams } from "react-router-dom";

export type DataContextType = {
  trees: Tree[];
  neighborhoods: Neighborhood[];
  isLoadingTreesData: boolean;
  setTrees: (trees: Tree[]) => void;
  setNeighborhoods: (neighborhoods: Neighborhood[]) => void;
  setLoadingTreesData: (value: boolean) => void;
  filters: Filter;
  isLoadingFiltersData: boolean;
};

const DataContext = createContext<DataContextType>({
  neighborhoods: [],
  trees: [],
  isLoadingTreesData: false,
  setNeighborhoods: () => {},
  setTrees: () => {},
  setLoadingTreesData: () => {},
  filters: {},
  isLoadingFiltersData: false,
});

export const useData = () => useContext(DataContext);

interface Props {
  children: ReactNode;
}

export const DataProvider: FC<Props> = ({ children }) => {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [isLoadingTreesData, setLoadingTreesData] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filter>({});
  const [isLoadingFiltersData, setIsLoadingFiltersData] = useState<boolean>(true);
  const { idProject, idUnitwork } = useParams<{ idProject: string; idUnitwork: string }>();
  

  useEffect(() => {
    const init = async () => {
      setIsLoadingFiltersData(true);
      try {
        const filterNames = Object.values(FilterName).join(",");
        const url = `${process.env.REACT_APP_BASE_URL}/project/${idProject}/tree/${idUnitwork}/get-all-filters`;
        const response = await axios.get(url, {
          params: {
            filterNames: filterNames,
          },
        });

        const responseData = response.data;

        const transformedFilters: Record<string, string[]> = responseData.reduce(
          (acc: { [x: string]: any; }, filter: { filterName: string | number; values: any[]; }) => {
            if (filter.filterName) {
              acc[filter.filterName] = filter.values.map((item) => item[filter.filterName]);
            }
            return acc;
          },
          {} as Record<string, string[]>
        );

        setFilters(transformedFilters);
        setIsLoadingFiltersData(false);
      } catch (error) {
        console.error("Error fetching filters:", error);
        setIsLoadingFiltersData(false);
      }
    };
    if (idProject && idUnitwork) { // Solo ejecuta si estos valores están definidos
      init();
    }
  }, [idProject, idUnitwork]);
  
  
  
  
/*
  useEffect(() => {
    const init = async () => {
      try {
        setLoadingTreesData(true);
        const url = `${process.env.REACT_APP_BASE_URL}/data`;
        const response = await axios.get(url);
        const responseData: Request<TreeRequestData> = response.data;

        if (responseData.status === RequestStatus.Success && responseData.data) {
          const {
            data: { neighborhoodData, treeData },
          } = responseData;
          setTrees(treeData);
          setNeighborhoods(neighborhoodData);
        }
        setLoadingTreesData(false);
      } catch (error) {
        console.error("Error fetching trees data:", error);
        setLoadingTreesData(false);
      }
    };
    init();
  }, []);*/

  return (
    <DataContext.Provider
      value={{
        trees,
        neighborhoods,
        isLoadingTreesData,
        setTrees: (trees: Tree[]) => setTrees(trees),
        setNeighborhoods: (neighborhood: Neighborhood[]) =>
        setNeighborhoods(neighborhood),
        setLoadingTreesData: (value: boolean) => setLoadingTreesData(value),
        filters,
        isLoadingFiltersData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};