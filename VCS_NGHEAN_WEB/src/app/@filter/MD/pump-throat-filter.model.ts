import {BaseFilter} from '../Common/base-filter.model';

export class PumpThroatFilter extends BaseFilter {
  code: string = '';
  name: string = '';
  areaCode :string = '';
  isActive: boolean | string = '';
}
export interface optionsArea {
  id: string;
  name: string;
}
export interface optionsGoods {
    id: string;
    name: string;
  }
  export interface optionsPumpRig {
    id: string;
    name: string;
  }