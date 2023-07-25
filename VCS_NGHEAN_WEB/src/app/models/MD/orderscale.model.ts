import {OrderReleaseModel} from '../SO/orderRelease.model';

export interface OrderScaleModel {
  orderCode?: string;
  orderReleaseCode?: string;
  scaleTypeCode?: string;
  customerCode?: string;
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
  vehicleCode?: string;
  driverName?: string;
  itemCode?: string;
  itemName?: string;
  itemNumber?: string;
  itemPrice?: string;
  itemProportion?: string;
  itemPercentageOfImpurities?: string;
  itemImpurities?: string;
  _ItemMoney?: string;
  itemMoney?: string;
  seal?: string;
  note?: string;
  weight1?: string;
  weight2?: string;
  timeWeight1?: string;
  timeWeight2?: string;
  weight?: string;
  exchange?: string;
  orderDetails?: orderDetails[];
  orderReleases?: OrderReleaseModel[];
  partner?: partnerDetails;
  item: {
    code: string;
    name: string;
    unitCode: string;
    typeCode: string;
    costPrice: string;
    sellPrice: string;
    isMainObject: boolean;
    isQuantitative: boolean;
    itemFormula: {
      itemCode: string;
      cement: string;
      stone: string;
      sand: string;
      admixture: string;
      water: string;
    };
  };
}

export interface partnerDetails {
  id: string;
  code: string;
  name: string;
  state: boolean;
  isCustomer: boolean;
  isProvider: boolean;
  address: string;
  phoneNumber: string;
  email: string;
  item?: itemDetails;
}

export interface itemDetails {
  id: string;
  code: string;
  name: string;
  state: boolean;
  unitCode: string;
  typeCode: string;
}

export interface orderDetails {
  id?: string;
  orderCode?: string;
  itemCode: string;
  isMainItem: boolean;
  orderNumber: number;
  sandCode?: string;
  stoneCode?: string;
}
