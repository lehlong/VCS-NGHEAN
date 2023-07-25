import {BaseFilter} from '../Common/base-filter.model';

export class DebtFilter extends BaseFilter {
  FromDate: string = '';
  ToDate: string = '';
  States?: string[] = [];
  PartnerCode: string = '';
  ItemCode: string = '';
  code: string = '';
}

export class DebtDetail {
  code?: string = '';
}
