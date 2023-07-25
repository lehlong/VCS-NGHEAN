import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {OrderExportModel} from 'src/app/models/SO/orderExport.model';
import {OrderExportFilter} from 'src/app/@filter/SO/export-filter.model';

@Injectable({
  providedIn: 'root',
})
export class OrderExportService {
  constructor(private _commonService: CommonService) {}
  search(pagination?: OrderExportFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`OrderExport/Search`, pagination);
  }

  GetDetail(code: string, isLoading?: boolean) {
    return this._commonService.getRequest(`OrderExport/GetDetail?code=${code}`);
  }
}
