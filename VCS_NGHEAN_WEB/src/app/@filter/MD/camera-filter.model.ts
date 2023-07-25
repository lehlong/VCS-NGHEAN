import {BaseFilter} from '../Common/base-filter.model';

export class CameraFilter extends BaseFilter {
  id: string = '';
  name: string = '';
  sourceRtsp: string ='';
  linkPlay:string= '';
  areaCode :string= '';
  inOut : string = '';
  
  isActive: boolean | string = '';
}
export interface optionsArea {
  id: string;
  name: string;
}

export interface optionsInOut {
  id: string;
  name: string;
}
