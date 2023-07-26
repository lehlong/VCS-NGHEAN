import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {UnitFilter} from 'src/app/@filter/MD/unit-filter.model';
import {CheckInModel} from 'src/app/models/WS/check-in.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Injectable({
  providedIn: 'root',
})
export class CheckInService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`CheckIn/Search`, pagination);
  }

  Insert(parameters?: CheckInModel, isLoading?: boolean) {
    return this._commonService.postRequest(`CheckIn/Insert`, parameters);
  }

  Update(parameters?: CheckInModel, isLoading?: boolean) {
    return this._commonService.putRequest(`CheckIn/Update`, parameters);
  }

  Delete(parameters?: CheckInModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`CheckIn/Delete/${parameters?.id}`, parameters);
  }

  GetDetail(code: string, isLoading?: boolean) {
    return this._commonService.getRequest(`CheckIn/GetDetail?code=${code}`);
  }

  CaptureImage(username: string, isLoading?: boolean) {
    return this._commonService.getRequest(`CheckIn/CaptureImage/${username}`);
  }
}
