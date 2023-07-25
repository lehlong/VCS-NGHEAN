import {OrderReleaseModel} from './orderRelease.model';

export interface OrderModel {
  code?: string;
  state?: string;
  partnerCode?: string;
  partnerNote?: string;
  areaCode?: string;
  pourDate?: string;
  pourLocation?: string;
  pourCategory?: string;
  pourTypeCode?: string;
  orderTypeCode?: string;
  pourLatitude?: number;
  pourLongitude?: number;
  createDate?: string;
  createBy?: string;
  orderDetails?: orderDetails[];
  orderReleases?: OrderReleaseModel[];
  partner?: partnerDetails;
  mixerCode?: string;
}

export interface itemDetails {
  id: string;
  code: string;
  name: string;
  state: boolean;
  unitCode: string;
  typeCode: string;
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
}

export interface orderDetails {
  id?: string;
  orderCode?: string;
  itemCode: string;
  isMainItem: boolean;
  orderNumber: number;
  sandCode?: string;
  stoneCode?: string;
  item?: itemDetails;
}
