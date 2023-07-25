import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UnitIndexComponent} from './unit/unit-index/unit-index.component';
import {CustomerIndexComponent} from './customer/customer-index/customer-index.component';
import {ProviderIndexComponent} from './provider/provider-index/provider-index.component';
import {WarehouseIndexComponent} from './warehouse/warehouse-index/warehouse-index.component';
import {ItemTypeIndexComponent} from './item-type/item-type-index/item-type-index.component';
import {DashboardComponent} from '../components/dashboard/dashboard.component';
import {AreaIndexComponent} from './area/area-index/area-index.component';
import {MixerIndexComponent} from './mixer';
import {ProductIndexComponent} from './product/product-index/product-index.component';
import {OrdertypeIndexComponent} from './ordertype/ordertype-index/ordertype-index.component';

import {PourTypeIndexComponent} from './pour-type';
import {DepartmentIndexComponent} from './department';
import {VehicleTypeIndexComponent} from './vehicle-type';
import {VehicleIndexComponent} from './vehicle';
import {PartnerIndexComponent} from './partner/partner-index/partner-index.component';

import {CustomerCareIndexComponent} from './customer-care';
import {ProfileInforComponent} from './profile/profile-infor/profile-infor.component';
import {DevicegroupIndexComponent} from './devicegroup/devicegroup-index/devicegroup-index.component';
import {DeviceTypeIndexComponent} from './device-type/device-type-index/device-type-index.component';
import {DeviceIndexComponent} from './device/device-index/device-index.component';
import { CameraIndexComponent } from './camera/camera-index/camera-index.component';
import { UserTypeIndexComponent } from './user-type/user-type-index/user-type-index.component';
import { PumpRigIndexComponent } from './pump-rig/pump-rig-index/pump-rig-index.component';
import { GoodsIndexComponent } from './goods/goods-index/goods-index.component';
import { PumpThroatIndexComponent } from './pump-throat/pump-throat-index/pump-throat-index.component';
import { DriversIndexComponent } from './drivers/drivers-index/drivers-index.component';
const routes: Routes = [
  {path: 'area', component: AreaIndexComponent},
  {path: 'camera', component: CameraIndexComponent},
  {path: 'user-type', component: UserTypeIndexComponent},
  {path: 'pump-rig', component: PumpRigIndexComponent},
  {path: 'pump-throat', component: PumpThroatIndexComponent},
  {path: 'goods', component: GoodsIndexComponent},
  {path: 'drivers', component: DriversIndexComponent},

  {path: 'unit', component: UnitIndexComponent},
  {path: 'customer', component: CustomerIndexComponent},
  {path: 'provider', component: ProviderIndexComponent},
  {path: 'stock', component: WarehouseIndexComponent},
  {path: 'item-type', component: ItemTypeIndexComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'mixer', component: MixerIndexComponent},
  {path: 'product', component: ProductIndexComponent},
  {path: 'pour-type', component: PourTypeIndexComponent},
  {path: 'order-type', component: OrdertypeIndexComponent},
  {path: 'department', component: DepartmentIndexComponent},
  {path: 'vehicle-type', component: VehicleTypeIndexComponent},
  {path: 'vehicle', component: VehicleIndexComponent},
  {path: 'partner', component: PartnerIndexComponent},
  {path: 'customer-care', component: CustomerCareIndexComponent},
  {path: 'profile', component: ProfileInforComponent},
  {path: 'device-group', component: DevicegroupIndexComponent},
  {path: 'device-type', component: DeviceTypeIndexComponent},
  {path: 'device', component: DeviceIndexComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterDataRoutingModule {}
