import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {DeviceModel} from 'src/app/models/MD/device.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`Device/Search`, pagination);
  }

  Insert(parameters?: DeviceModel, isLoading?: boolean) {
    return this._commonService.postRequest(`Device/Insert`, parameters);
  }

  Update(parameters?: DeviceModel, isLoading?: boolean) {
    return this._commonService.putRequest(`Device/Update`, parameters);
  }

  Delete(parameters?: DeviceModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`Device/Delete/${parameters?.code}`, parameters);
  }
}
