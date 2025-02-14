export interface TreePruebaa{
    idTree: number;
    treeName: string;
    address: string;
    datetime: Date;
    treeValue: string | null;
    risk: number | null;
}
export interface Tree {
    idTree: number;
    address: string;
    datetime: string;
    longitude: string;
    latitude: string;
    treeValue?: number | null;
    risk?: number | null;
  }