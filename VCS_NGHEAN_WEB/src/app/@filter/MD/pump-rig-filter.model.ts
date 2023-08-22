import {BaseFilter} from '../Common/base-filter.model';

export class PumpRigFilter extends BaseFilter {
  code: string = '';
  name: string = '';
  isActive: boolean | string = '';
}
export interface optionsArea {
  id: string;
  name: string;
}