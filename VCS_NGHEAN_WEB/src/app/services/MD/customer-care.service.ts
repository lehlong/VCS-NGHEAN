import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {CustomerCareModel} from 'src/app/models/MD/customer-care.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';
import {CustomerCareFilter} from '../../@filter/MD/customer-care-filter.model';
@Injectable({
  providedIn: 'root',
})
export class CustomerCareService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: CustomerCareFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`CustomerCare/Search`, pagination);
  }

  Insert(parameters?: CustomerCareModel, isLoading?: boolean) {
    return this._commonService.postRequest(`CustomerCare/Insert`, parameters);
  }

  Update(parameters?: CustomerCareModel, isLoading?: boolean) {
    return this._commonService.putRequest(`CustomerCare/Update`, parameters);
  }
  Delete(parameters?: CustomerCareModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`CustomerCare/Delete`, parameters);
  }
}
