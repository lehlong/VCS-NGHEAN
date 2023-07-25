import { AreaModel } from "./area.model";

export interface PumpRigModel {
    code: string;
    name?: string;
    areaCode?:string;
    area?: AreaModel;
    isActive?: string;
  }