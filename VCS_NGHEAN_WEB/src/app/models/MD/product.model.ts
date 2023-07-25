export interface ProductModel {
  code: string;
  name: string;
  isActive?: boolean;
  unitCode?: string;
  typeCode: string;
  costPrice: string;
  sellPrice: string;
  itemFormula: {
    itemCode: string;
    cement: string;
    stone: string;
    sand: string;
    admixture: string;
    water: string;
  };
  isMainObject: boolean;
  isQuantitative: boolean;
}
