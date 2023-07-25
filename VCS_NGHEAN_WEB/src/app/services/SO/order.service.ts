import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {OrderModel} from 'src/app/models/SO/order.model';
import {OrderFilter, OrderDetail} from 'src/app/@filter/SO/order-filter.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private _commonService: CommonService) {}
  search(pagination?: OrderFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`Order/Search`, pagination);
  }

  GetDetail(pagination?: OrderDetail, isLoading?: boolean) {
    return this._commonService.getRequest(`Order/GetDetail`, pagination);
  }

  Insert(parameters?: OrderModel, isLoading?: boolean) {
    return this._commonService.postRequest(`Order/Insert`, parameters);
  }

  Update(parameters?: OrderModel, isLoading?: boolean) {
    return this._commonService.putRequest(`Order/Update`, parameters);
  }

  Delete(parameters?: OrderModel, isLoading?: boolean) {
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
