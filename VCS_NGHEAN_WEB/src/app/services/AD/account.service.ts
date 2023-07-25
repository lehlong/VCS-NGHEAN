import { Injectable } from '@angular/core';
import { CommonService } from '../Common/common.service';
import { BaseFilter } from 'src/app/@filter/Common/base-filter.model';
import { AdAccount, AdAccountCreate, AdAccountUpdateInfor, AdChangePassword } from 'src/app/models/AD/account.model';
import { AccountFilter } from 'src/app/@filter/Common/account-filter.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: AccountFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`Account/Search`, pagination);
  }

  Insert(parameters?: AdAccountCreate, isLoading?: boolean) {
    return this._commonService.postRequest(`Account/Insert`, parameters);
  }

  Update(parameters?: AdAccountCreate, isLoading?: boolean) {
    return this._commonService.putRequest(`Account/Update`, parameters);
  }

  Delete(parameters?: AdAccount, isLoading?: boolean) {
    return this._commonService.deleteRequest(`Account/Delete`, parameters);
  }
  UpdateInformation(parameters?:AdAccountUpdateInfor,isLoading?: boolean){
    return this._commonService.putRequest(`Account/UpdateInformation`, parameters);
  }
  getDetail(parameters?: string ,isLoading?: boolean){
    return this._commonService.getRequest(`Account/GetDetail?userName=${parameters}`);
  }
  changePassWord(parameters?:AdChangePassword,isLoading?: boolean){
    return this._commonService.putRequest(`Auth/ChangePassword`, parameters);
  }
}
