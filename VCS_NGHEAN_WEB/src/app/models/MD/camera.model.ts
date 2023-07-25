import { AreaModel } from "./area.model";

export interface CameraModel {
    id: string;
    name?: string;
    sourceRtsp?: string;
    linkPlay?:string;
    areaCode?:string;
    inOut?:string;
    linkCapture?:string;
    userName?:string;
    password?:string;
    area?: AreaModel;
    isActive?: string;
  }