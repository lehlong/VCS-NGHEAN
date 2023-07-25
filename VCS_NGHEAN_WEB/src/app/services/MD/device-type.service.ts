import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {DeviceTypeModel} from 'src/app/models/MD/device-type.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceTypeService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`DeviceType/Search`, pagination);
  }

  Insert(parameters?: DeviceTypeModel, isLoading?: boolean) {
    return this._commonService.postRequest(`DeviceType/Insert`, parameters);
  }

  Update(parameters?: DeviceTypeModel, isLoading?: boolean) {
    return this._commonService.putRequest(`DeviceType/Update`, parameters);
  }

  Delete(parameters?: DeviceTypeModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`DeviceType/Delete/${parameters?.code}`, parameters);
  }
}
