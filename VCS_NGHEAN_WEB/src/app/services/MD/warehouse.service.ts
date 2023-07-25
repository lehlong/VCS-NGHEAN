import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {WareHouseModel} from 'src/app/models/MD/ware-house.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Injectable({
  providedIn: 'root',
})
export class WareHouseService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`Stock/Search`, pagination);
  }

  Insert(parameters?: WareHouseModel, isLoading?: boolean) {
    return this._commonService.postRequest(`Stock/Insert`, parameters);
  }

  Update(parameters?: WareHouseModel, isLoading?: boolean) {
    return this._commonService.putRequest(`Stock/Update`, parameters);
  }

  Delete(parameters?: WareHouseModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`Stock/Delete/${parameters?.code}`, parameters);
  }
}
