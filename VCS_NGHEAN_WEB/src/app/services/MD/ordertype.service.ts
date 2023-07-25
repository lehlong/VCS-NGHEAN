import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {OrderTypeModel} from 'src/app/models/MD/ordertype.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Injectable({
  providedIn: 'root',
})
export class OrderTypeService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`OrderType/Search`, pagination);
  }

  Insert(parameters?: OrderTypeModel, isLoading?: boolean) {
    return this._commonService.postRequest(`OrderType/Insert`, parameters);
  }

  Update(parameters?: OrderTypeModel, isLoading?: boolean) {
    return this._commonService.putRequest(`OrderType/Update`, parameters);
  }
  Delete(parameters?: OrderTypeModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`OrderType/Delete/${parameters?.code}`, parameters);
  }
}
