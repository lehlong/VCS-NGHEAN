import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {PartnerModel} from 'src/app/models/MD/partner.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';
import {CustomerFilter} from '../../@filter/MD/customer-filter.model';
@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: CustomerFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`Partner/Search`, pagination);
  }

  Insert(parameters?: PartnerModel, isLoading?: boolean) {
    return this._commonService.postRequest(`Partner/Insert`, parameters);
  }

  Update(parameters?: PartnerModel, isLoading?: boolean) {
    return this._commonService.putRequest(`Partner/Update`, parameters);
  }
  Delete(parameters?: PartnerModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`Partner/Delete/${parameters?.code}`, parameters);
  }
}
