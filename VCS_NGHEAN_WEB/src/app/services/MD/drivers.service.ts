import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {UnitFilter} from 'src/app/@filter/MD/unit-filter.model';
import {DriversModel} from 'src/app/models/MD/drivers.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Injectable({
  providedIn: 'root',
})
export class DriversService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`Drivers/Search`, pagination);
  }

  Insert(parameters?: DriversModel, isLoading?: boolean) {
    return this._commonService.postRequest(`Drivers/Insert`, parameters);
  }

  Update(parameters?: DriversModel, isLoading?: boolean) {
    return this._commonService.putRequest(`Drivers/Update`, parameters);
  }

  Delete(parameters?: DriversModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`Drivers/Delete/${parameters?.id}`, parameters);
  }

  GetDetail(code: string, isLoading?: boolean) {
    return this._commonService.getRequest(`Drivers/GetDetail?code=${code}`);
  }

  CaptureImage(username: string, isLoading?: boolean) {
    return this._commonService.getRequest(`Drivers/CaptureImage/${username}`);
  }
}
