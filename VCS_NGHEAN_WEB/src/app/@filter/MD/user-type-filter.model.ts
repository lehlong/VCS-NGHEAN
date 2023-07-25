import {BaseFilter} from '../Common/base-filter.model';

export class UserTypeFilter extends BaseFilter {
  id: string = '';
  name: string = '';
  isActive: boolean | string = '';
}
export interface optionsGroup {
  id: string;
  name: string;
}
