import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MasterDataRoutingModule} from './master-data-routing.module';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgSelectModule} from '@ng-select/ng-select';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {SharedModule} from '../share.modules';
import {UnitEditComponent} from './unit/unit-edit/unit-edit.component';
import {UnitCreateComponent} from './unit/unit-create/unit-create.component';
import {UnitIndexComponent} from './unit/unit-index/unit-index.component';
import {MatTableModule} from '@angular/material/table';
import {CustomerIndexComponent} from './customer/customer-index/customer-index.component';
import {CustomerCreateComponent} from './customer/customer-create/customer-create.component';
import {CustomerEditComponent} from './customer/customer-edit/customer-edit.component';
import {ProviderIndexComponent} from './provider/provider-index/provider-index.component';
import {ProviderCreateComponent} from './provider/provider-create/provider-create.component';
import {ProviderEditComponent} from './provider/provider-edit/provider-edit.component';
import {WarehouseIndexComponent} from './warehouse/warehouse-index/warehouse-index.component';
import {WarehouseCreateComponent} from './warehouse/warehouse-create/warehouse-create.component';
import {WarehouseEditComponent} from './warehouse/warehouse-edit/warehouse-edit.component';
import {ItemTypeIndexComponent} from './item-type/item-type-index/item-type-index.component';
import {ItemTypeCreateComponent} from './item-type/item-type-create/item-type-create.component';
import {ItemTypeEditComponent} from './item-type/item-type-edit/item-type-edit.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AreaIndexComponent} from './area/area-index/area-index.component';
import {AreaCreateComponent} from './area/area-create/area-create.component';
import {AreaEditComponent} from './area/area-edit/area-edit.component';
import {ProductIndexComponent} from './product/product-index/product-index.component';
import {ProductCreateComponent} from './product/product-create/product-create.component';
import {ProductEditComponent} from './product/product-edit/product-edit.component';
import {MixerIndexComponent, MixerCreateComponent, MixerEditComponent} from './mixer';
import {PourTypeIndexComponent, PourTypeCreateComponent, PourTypeEditComponent} from './pour-type';
import {OrdertypeIndexComponent} from './ordertype/ordertype-index/ordertype-index.component';
import {OrdertypeCreateComponent} from './ordertype/ordertype-create/ordertype-create.component';
import {OrdertypeEditComponent} from './ordertype/ordertype-edit/ordertype-edit.component';
import {DepartmentCreateComponent, DepartmentEditComponent, DepartmentIndexComponent} from './department';
import {VehicleTypeCreateComponent, VehicleTypeIndexComponent, VehicleTypeEditComponent} from './vehicle-type';
import {VehicleIndexComponent, VehicleEditComponent, VehicleCreateComponent} from './vehicle';
import {PartnerIndexComponent} from './partner/partner-index/partner-index.component';
import {PartnerEditComponent} from './partner/partner-edit/partner-edit.component';
import {PartnerCreateComponent} from './partner/partner-create/partner-create.component';
import {
  CustomerCareIndexComponent,
  CustomerCareCreateComponent,
  CustomerCareEditComponent,
  CustomerInforComponent,
} from './customer-care';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {ProfileInforComponent} from './profile/profile-infor/profile-infor.component';
import {DevicegroupIndexComponent} from './devicegroup/devicegroup-index/devicegroup-index.component';
import {DevicegroupCreateComponent} from './devicegroup/devicegroup-create/devicegroup-create.component';
import {DevicegroupEditComponent} from './devicegroup/devicegroup-edit/devicegroup-edit.component';
import {DeviceTypeIndexComponent} from './device-type/device-type-index/device-type-index.component';
import {DeviceTypeCreateComponent} from './device-type/device-type-create/device-type-create.component';
import {DeviceTypeEditComponent} from './device-type/device-type-edit/device-type-edit.component';
import {DeviceIndexComponent} from './device/device-index/device-index.component';
import {DeviceCreateComponent} from './device/device-create/device-create.component';
import {DeviceEditComponent} from './device/device-edit/device-edit.component';
import {CustomerListOrderComponent} from './customer-care/customer-list-order/customer-list-order.component';
import { CameraIndexComponent } from './camera/camera-index/camera-index.component';
import { CameraEditComponent } from './camera/camera-edit/camera-edit.component';
import { CameraCreateComponent } from './camera/camera-create/camera-create.component';
import { UserTypeIndexComponent } from './user-type/user-type-index/user-type-index.component';
import { UserTypeEditComponent } from './user-type/user-type-edit/user-type-edit.component';
import { UserTypeCreateComponent } from './user-type/user-type-create/user-type-create.component';
import { PumpRigIndexComponent } from './pump-rig/pump-rig-index/pump-rig-index.component';
import { PumpRigEditComponent } from './pump-rig/pump-rig-edit/pump-rig-edit.component';
import { PumpRigCreateComponent } from './pump-rig/pump-rig-create/pump-rig-create.component';
import { GoodsIndexComponent } from './goods/goods-index/goods-index.component';
import { GoodsEditComponent } from './goods/goods-edit/goods-edit.component';
import { GoodsCreateComponent } from './goods/goods-create/goods-create.component';
import { PumpThroatIndexComponent } from './pump-throat/pump-throat-index/pump-throat-index.component';
import { PumpThroatEditComponent } from './pump-throat/pump-throat-edit/pump-throat-edit.component';
import { PumpThroatCreateComponent } from './pump-throat/pump-throat-create/pump-throat-create.component';
import { DriversIndexComponent } from './drivers/drivers-index/drivers-index.component';
import { DriversCreateComponent } from './drivers/drivers-create/drivers-create.component';
import { DriversEditComponent } from './drivers/drivers-edit/drivers-edit.component';

@NgModule({
  declarations: [
    UnitEditComponent,
    UnitCreateComponent,
    UnitIndexComponent,
    CustomerIndexComponent,
    CustomerCreateComponent,
    CustomerEditComponent,
    ProviderIndexComponent,
    ProviderCreateComponent,
    ProviderEditComponent,
    WarehouseIndexComponent,
    WarehouseCreateComponent,
    WarehouseEditComponent,
    ItemTypeIndexComponent,
    ItemTypeCreateComponent,
    ItemTypeEditComponent,
    AreaIndexComponent,
    AreaCreateComponent,
    AreaEditComponent,
    MixerIndexComponent,
    MixerCreateComponent,
    MixerEditComponent,
    PourTypeIndexComponent,
    PourTypeCreateComponent,
    PourTypeEditComponent,
    ProductIndexComponent,
    ProductCreateComponent,
    ProductEditComponent,
    OrdertypeIndexComponent,
    OrdertypeCreateComponent,
    OrdertypeEditComponent,
    DepartmentIndexComponent,
    DepartmentCreateComponent,
    DepartmentEditComponent,
    VehicleTypeIndexComponent,
    VehicleTypeCreateComponent,
    VehicleTypeEditComponent,
    VehicleIndexComponent,
    VehicleCreateComponent,
    VehicleEditComponent,
    PartnerIndexComponent,
    PartnerEditComponent,
    PartnerCreateComponent,
    CustomerCareIndexComponent,
    CustomerCareCreateComponent,
    CustomerCareEditComponent,
    CustomerInforComponent,
    ProfileInforComponent,
    DevicegroupIndexComponent,
    DevicegroupCreateComponent,
    DevicegroupEditComponent,
    DeviceTypeIndexComponent,
    DeviceTypeCreateComponent,
    DeviceTypeEditComponent,
    DeviceIndexComponent,
    DeviceCreateComponent,
    DeviceEditComponent,
    CustomerListOrderComponent,
    CameraIndexComponent,
    CameraEditComponent,
    CameraCreateComponent,
    UserTypeIndexComponent,
    UserTypeEditComponent,
    UserTypeCreateComponent,
    PumpRigIndexComponent,
    PumpRigEditComponent,
    PumpRigCreateComponent,
    GoodsIndexComponent,
    GoodsEditComponent,
    GoodsCreateComponent,
    PumpThroatIndexComponent,
    PumpThroatEditComponent,
    PumpThroatCreateComponent,
    DriversIndexComponent,
    DriversCreateComponent,
    DriversEditComponent,
  ],
  imports: [
    MatTableModule,
    SharedModule,
    ToastrModule,
    CommonModule,
    MasterDataRoutingModule,
    NgbModule,
    NgxPaginationModule,
    FormsModule,
    NgSelectModule,
    TranslateModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatIconModule,
  ],
})
export class MasterDataModule {}
