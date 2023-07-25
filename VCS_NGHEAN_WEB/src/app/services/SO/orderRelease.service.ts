import {HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {OrderModel} from 'src/app/models/SO/order.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';
import {LIST_STATE} from 'src/app/utils/constant';
import {ORDER_RELEASE_STATES} from 'src/app/utils/constant/orderRelease';
import {UpdateStepModel} from 'src/app/models/SO/orderRelease.model';

@Injectable({
  providedIn: 'root',
})
export class OrderReleaseService {
  constructor(private _commonService: CommonService) {}
  search(pagination?: any, isLoading?: boolean) {
    let queryParams = new HttpParams();
    if (pagination.States.length == 0) {
      pagination.States = LIST_STATE.filter((s: any) => s.value != 'CHUA_XAC_NHAN').map((i: any) => i.value);
      return this._commonService.getRequest(`Order/Search`, pagination);
    } else {
      queryParams = queryParams.appendAll({States: pagination.States});
      return this._commonService.getRequest(`Order/Search?` + queryParams.toString(), pagination);
    }
  }

  Insert(parameters?: OrderModel, isLoading?: boolean) {
    return this._commonService.postRequest(`OrderRelease/Insert`, parameters);
  }

  Update(parameters?: OrderModel, isLoading?: boolean) {
    return this._commonService.putRequest(`OrderRelease/Update`, parameters);
  }

  UpdateStep(parameters?: UpdateStepModel, isLoading?: boolean) {
    return this._commonService.putRequest(`OrderRelease/UpdateStep`, parameters);
  }

  Delete(parameters?: OrderModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`OrderRelease/Delete`, parameters);
  }

  GetDetail(code: string, isLoading?: boolean) {
    return this._commonService.getRequest(`OrderRelease/GetDetail?code=${code}`);
  }
}
