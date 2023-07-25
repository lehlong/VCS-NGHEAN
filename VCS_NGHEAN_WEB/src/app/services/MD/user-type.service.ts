import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {UserTypeModel} from 'src/app/models/MD/user-type.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Injectable({
  providedIn: 'root',
})
export class UserTypeService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`UserType/Search`, pagination);
  }

  Insert(parameters?: UserTypeModel, isLoading?: boolean) {
    return this._commonService.postRequest(`UserType/Insert`, parameters);
  }

  Update(parameters?: UserTypeModel, isLoading?: boolean) {
    return this._commonService.putRequest(`UserType/Update`, parameters);
  }
  Delete(parameters?: UserTypeModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`UserType/Delete/${parameters?.id}`, parameters);
  }
}
