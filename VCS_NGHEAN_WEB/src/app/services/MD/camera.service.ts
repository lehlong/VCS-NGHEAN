import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {CameraModel} from 'src/app/models/MD/camera.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`Camera/Search`, pagination);
  }

  Insert(parameters?: CameraModel, isLoading?: boolean) {
    return this._commonService.postRequest(`Camera/Insert`, parameters);
  }

  Update(parameters?: CameraModel, isLoading?: boolean) {
    return this._commonService.putRequest(`Camera/Update`, parameters);
  }
  Delete(parameters?: CameraModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`Camera/Delete/${parameters?.id}`, parameters);
  }
}
