import {BaseFilter} from '../Common/base-filter.model';

export class CustomerFilter extends BaseFilter {
  code!: string;
  name!: string;
  isActive: boolean | string = true;
  address!: string;
  phoneNumber!: string;
  email!: string;
  isProvider!: boolean | string;
  isCustomer?: boolean | string = true;
}
export interface optionsGroup {
  id: string;
  name: string;
}
