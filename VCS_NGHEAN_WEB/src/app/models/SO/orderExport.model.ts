export interface OrderExportModel {
  code: string;
  type: string;
  exportDate: Date;
  partnerCode: string;
  state: string;
  orderCode: string;
  discount: number;
  taxVat: number;
  sumMoney: number;
  payMoney: number;
  debt: number;
  createBy: string;
  createDate: Date;
  updateBy: string;
  updateDate: Date;
}
