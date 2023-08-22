import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {UnitFilter} from 'src/app/@filter/MD/unit-filter.model';
import {OrderCarModel} from 'src/app/models/WS/order-car.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Injectable({
  providedIn: 'root',
})
export class OrderCarService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`OrderCar/Search`, pagination);
  }

  Insert(parameters?: OrderCarModel, isLoading?: boolean) {
    return this._commonService.postRequest(`OrderCar/Insert`, parameters);
  }

  Update(parameters?: OrderCarModel, isLoading?: boolean) {
    return this._commonService.putRequest(`OrderCar/Update`, parameters);
  }

  Delete(parameters?: OrderCarModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`OrderCar/Delete/${parameters?.id}`, parameters);
  }

  GetDetail(code: string, isLoading?: boolean) {
    return this._commonService.getRequest(`OrderCar/GetDetail?code=${code}`);
  }

}
