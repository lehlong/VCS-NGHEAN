import {BaseFilter} from '../Common/base-filter.model';

export class ItemTypeFilter extends BaseFilter {
  code: string = '';
  name: string = '';
  isActive: boolean | string = '';
}
export interface optionsGroup {
  id: string;
  name: string;
}
