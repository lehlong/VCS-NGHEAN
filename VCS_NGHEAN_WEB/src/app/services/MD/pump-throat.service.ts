import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {PumpThroatModel} from 'src/app/models/MD/pump-throat.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Injectable({
  providedIn: 'root',
})
export class PumpThroatService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`PumpThroat/Search`, pagination);
  }

  Insert(parameters?: PumpThroatModel, isLoading?: boolean) {
    return this._commonService.postRequest(`PumpThroat/Insert`, parameters);
  }

  Update(parameters?: PumpThroatModel, isLoading?: boolean) {
    return this._commonService.putRequest(`PumpThroat/Update`, parameters);
  }
  Delete(parameters?: PumpThroatModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`PumpThroat/Delete/${parameters?.code}`, parameters);
  }
}
