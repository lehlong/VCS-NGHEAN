import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {OrderScaleModel} from 'src/app/models/MD/orderscale.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Injectable({
  providedIn: 'root',
})
export class OrderScaleService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`OrderScale/Search`, pagination);
  }

  GetDetail(code: string, isLoading?: boolean) {
    return this._commonService.getRequest(`OrderScale/GetDetail?code=${code}`);
  }
}
