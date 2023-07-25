import {BaseFilter} from '../Common/base-filter.model';
import {LIST_STATE} from 'src/app/utils/constant/index';

export class OrderFilter extends BaseFilter {
  FromDate: string = '';
  ToDate: string = '';
  States?: string[] = [];
  PartnerCode: string = '';
  ItemCode: string = '';
  code: string = '';
}

export class OrderDetail {
  code?: string = '';
}


export class OrderCustomeFilter extends BaseFilter {
  FromDate!: string;
  ToDate!: string;
  States!: string[];
  PartnerCode!: string;
  ItemCode!: string;
  code!: string;
}