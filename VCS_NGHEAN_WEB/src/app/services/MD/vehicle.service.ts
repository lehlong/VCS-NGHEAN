import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {UnitFilter} from 'src/app/@filter/MD/unit-filter.model';
import {VehicleModel} from 'src/app/models/MD/vehicle.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`Vehicle/Search`, pagination);
  }

  Insert(parameters?: VehicleModel, isLoading?: boolean) {
    return this._commonService.postRequest(`Vehicle/Insert`, parameters);
  }

  Update(parameters?: VehicleModel, isLoading?: boolean) {
    return this._commonService.putRequest(`Vehicle/Update`, parameters);
  }

  Delete(parameters?: VehicleModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`Vehicle/Delete/${parameters?.code}`, parameters);
  }

  GetDetail(code: string, isLoading?: boolean) {
    return this._commonService.getRequest(`Vehicle/GetDetail?code=${code}`);
  }

  CaptureImage(username: string, isLoading?: boolean) {
    return this._commonService.getRequest(`Vehicle/CaptureImage/${username}`);
  }
}
