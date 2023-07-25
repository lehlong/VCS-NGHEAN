import {BaseFilter} from '../Common/base-filter.model';

export class OrderExportFilter extends BaseFilter {
  FromDate: string = '';
  ToDate: string = '';
  States?: string[] = [];
  PartnerCode: string = '';
  ItemCode: string = '';
  code: string = '';
}
