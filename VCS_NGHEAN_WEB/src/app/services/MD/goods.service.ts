import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {GoodsModel} from 'src/app/models/MD/goods.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Injectable({
  providedIn: 'root',
})
export class GoodsService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`Goods/Search`, pagination);
  }

  Insert(parameters?: GoodsModel, isLoading?: boolean) {
    return this._commonService.postRequest(`Goods/Insert`, parameters);
  }

  Update(parameters?: GoodsModel, isLoading?: boolean) {
    return this._commonService.putRequest(`Goods/Update`, parameters);
  }
  Delete(parameters?: GoodsModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`Goods/Delete/${parameters?.code}`, parameters);
  }
}
