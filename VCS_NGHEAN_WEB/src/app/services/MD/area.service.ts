import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {AreaModel} from 'src/app/models/MD/area.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`Area/Search`, pagination);
  }

  Insert(parameters?: AreaModel, isLoading?: boolean) {
    return this._commonService.postRequest(`Area/Insert`, parameters);
  }

  Update(parameters?: AreaModel, isLoading?: boolean) {
    return this._commonService.putRequest(`Area/Update`, parameters);
  }
  Delete(parameters?: AreaModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`Area/Delete/${parameters?.code}`, parameters);
  }
}
