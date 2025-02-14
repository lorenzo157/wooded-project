import { treeListMock } from "../mocks/tree";
import { Neighborhood, NeighborhoodData } from "../types/Neighborhood";

const getNeighborhoodTrees = (neighborhood: Neighborhood): number => {
  const treeList = treeListMock;
  const neighborhoodTrees = treeList.filter(
    (tree) => tree.idNeighborhood === neighborhood.idNeighborhood
  ).length;
  return neighborhoodTrees;
};

export const getNeighborhoodData = (
  neighborhood: Neighborhood
): NeighborhoodData => {
  const trees = getNeighborhoodTrees(neighborhood);
  return {
    trees,
    neighborhoodName: neighborhood?.neighborhoodName,
  };
};
