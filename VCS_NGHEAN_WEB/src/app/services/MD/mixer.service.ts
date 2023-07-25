import {Injectable} from '@angular/core';
import {CommonService} from '../Common/common.service';
import {MixerModel} from 'src/app/models/MD/mixer.model';
import {BaseFilter} from 'src/app/@filter/Common/base-filter.model';

@Injectable({
  providedIn: 'root',
})
export class MixerService {
  constructor(private _commonService: CommonService) {}

  search(pagination?: BaseFilter, isLoading?: boolean) {
    return this._commonService.getRequest(`Mixer/Search`, pagination);
  }

  Insert(parameters?: MixerModel, isLoading?: boolean) {
    return this._commonService.postRequest(`Mixer/Insert`, parameters);
  }

  Update(parameters?: MixerModel, isLoading?: boolean) {
    return this._commonService.putRequest(`Mixer/Update`, parameters);
  }
  Delete(parameters?: MixerModel, isLoading?: boolean) {
    return this._commonService.deleteRequest(`Mixer/Delete/${parameters?.code}`, parameters);
  }
  GetDetail(code: string, isLoading?: boolean) {
    return this._commonService.getRequest(`Mixer/GetDetail?code=${code}`);
  }
}
