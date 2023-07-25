import { AreaModel } from "./area.model";
import { GoodsModel } from "./goods.model";
import { PumpRigModel } from "./pump-rig.model";

export interface PumpThroatModel {
    code: string;
    name?: string;
    areaCode?:string;
    goodsCode?:string;
    pumpRigCode?:string;
    wattage?: number;
    area?: AreaModel;
    goods?: GoodsModel;
    pumpRig?: PumpRigModel;
    isActive?: string;
  }