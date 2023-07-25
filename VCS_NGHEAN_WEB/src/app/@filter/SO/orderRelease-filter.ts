import {ORDER_RELEASE_STATES} from 'src/app/utils/constant/orderRelease';
import {BaseFilter} from '../Common/base-filter.model';

export class OrderReleaseFilter extends BaseFilter {
  FromDate: string = '';
  ToDate: string = '';
  States: string[] = ORDER_RELEASE_STATES.map((s: any) => s.value);
  PartnerCode: string = '';
  ItemCode: string = '';
  code: string = '';
}
