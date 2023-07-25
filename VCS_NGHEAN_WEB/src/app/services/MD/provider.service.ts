import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {ProviderModel} from 'src/app/models/MD/provider.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';
import {ProviderFilter} from '../../@filter/MD/provider-filter.model';
@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: ProviderFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`Partner/Search`, pagination);
  }

  Insert(parameters?: ProviderModel, isLoading?: boolean) {
    return this._commonService.postRequest(`Partner/Insert`, parameters);
  }

  Update(parameters?: ProviderModel, isLoading?: boolean) {
    return this._commonService.putRequest(`Partner/Update`, parameters);
  }
  Delete(parameters?: ProviderModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`Partner/Delete/${parameters?.code}`, parameters);
  }
}
