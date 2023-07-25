import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {ProductModel} from 'src/app/models/MD/product.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Injectable({
  providedIn: 'root',
})
export class ItemTypeService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`ItemFormula/Search`, pagination);
  }

  Insert(parameters?: ProductModel, isLoading?: boolean) {
    return this._commonService.postRequest(`ItemFormula/Insert`, parameters);
  }

  Update(parameters?: ProductModel, isLoading?: boolean) {
    return this._commonService.putRequest(`ItemFormula/Update`, parameters);
  }
  Delete(parameters?: ProductModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`ItemFormula/Delete/${parameters?.code}`, parameters);
  }
}
