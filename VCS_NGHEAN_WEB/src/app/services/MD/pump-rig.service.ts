import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {PumpRigModel} from 'src/app/models/MD/pump-rig.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Injectable({
  providedIn: 'root',
})
export class PumpRigService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`PumpRig/Search`, pagination);
  }

  Insert(parameters?: PumpRigModel, isLoading?: boolean) {
    return this._commonService.postRequest(`PumpRig/Insert`, parameters);
  }

  Update(parameters?: PumpRigModel, isLoading?: boolean) {
    return this._commonService.putRequest(`PumpRig/Update`, parameters);
  }
  Delete(parameters?: PumpRigModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`PumpRig/Delete/${parameters?.code}`, parameters);
  }
}
