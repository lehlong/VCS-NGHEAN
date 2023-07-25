import { BaseFilter } from "../Common/base-filter.model";

export class GoodsFilter extends BaseFilter {
    code: string = '';
    name: string = '';
    isActive: boolean | string = '';
  }