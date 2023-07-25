import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {UnitFilter} from 'src/app/@filter/MD/unit-filter.model';
import {SandModel} from 'src/app/models/MD/sand.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Injectable({
  providedIn: 'root',
})
export class SandService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`Sand/Search`, pagination);
  }

  Insert(parameters?: SandModel, isLoading?: boolean) {
    return this._commonService.postRequest(`Sand/Insert`, parameters);
  }

  Update(parameters?: SandModel, isLoading?: boolean) {
    return this._commonService.putRequest(`Sand/Update`, parameters);
  }

  Delete(parameters?: SandModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`Sand/Delete/${parameters?.code}`, parameters);
  }
}
