import {BaseFilter} from '../Common/base-filter.model';
import {LIST_STATE} from 'src/app/utils/constant/index';

export class OrderScaleFilter extends BaseFilter {
  FromDate: string = '';
  ToDate: string = '';
  PartnerCode: string = '';
  itemCode: string = '';
  code: string = '';
  orderCode: string = '';
  scaleTypeCode?: string;
  customerName: string = '';
  vehicleCode: string = '';
  driverName: string = '';
  itemName: string = '';
  States?: string[] = [];

  weight: string = '';
}

export class OrderDetail {
  code?: string = '';
}
