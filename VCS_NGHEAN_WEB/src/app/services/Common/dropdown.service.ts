import {Injectable} from '@angular/core';
import {CommonService} from './common.service';

@Injectable({
  providedIn: 'root',
})
export class DropdownService {
  constructor(private _commonService: CommonService) {}

  GetAllUnit(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Unit/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllItemType(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`ItemType/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllPartner(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Partner/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllPourType(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`PourType/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }
  GetAllOrderType(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`OrderType/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }
  GetAllOrder(parameters?: '', isLoading?: boolean) {
    return this._commonService.getRequest(`Order/GetAll`, parameters);
  }

  GetAllArea(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Area/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllItem(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Item/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllSand(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Sand/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllStone(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Stone/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllMixer(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`Mixer/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }

  GetAllDeviceType(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`DeviceType/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }
  GetAllDeviceGroup(parameters?: {}, isActive: boolean = true) {
    return this._commonService.getRequest(`DeviceGroup/GetAll`, {
      ...parameters,
      IsActive: isActive,
    });
  }
}
