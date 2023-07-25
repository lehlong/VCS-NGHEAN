import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {DebtModel} from 'src/app/models/SO/debt.model';
import {DebtFilter, DebtDetail} from 'src/app/@filter/SO/debt-filter.model';

@Injectable({
  providedIn: 'root',
})
export class DebtService {
  constructor(private _commonService: CommonService) {}
  search(pagination?: DebtFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`Order/Search`, pagination);
  }

  GetDetail(pagination?: DebtDetail, isLoading?: boolean) {
    return this._commonService.getRequest(`Order/GetDetail`, pagination);
  }

  Insert(parameters?: DebtModel, isLoading?: boolean) {
    return this._commonService.postRequest(`Order/Insert`, parameters);
  }

  Update(parameters?: DebtModel, isLoading?: boolean) {
    return this._commonService.putRequest(`Order/Update`, parameters);
  }

  Delete(parameters?: DebtModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`Order/Delete`, parameters);
  }

  UpdateStep(parameters?: any, isLoading?: boolean) {
    return this._commonService.putRequest(`Order/UpdateStep`, parameters);
  }

  CompleteState(parameters?: any, isLoading?: boolean) {
    return this._commonService.putRequest(`Order/CompleteState`, parameters);
  }

  RejectState(parameters?: any, isLoading?: boolean) {
    return this._commonService.putRequest(`Order/RejectState`, parameters);
  }

  CancelState(parameters?: any, isLoading?: boolean) {
    return this._commonService.putRequest(`Order/CancelState`, parameters);
  }
}
