import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutRoutes } from './layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MasterDataModule } from '../master-data/master-data.module';
import { SystemManageModule } from '../system-manage/system-manage.module';
import { SaleOrdersModule } from '../sale-orders/sale-orders.module';
import { WorkspaceModule } from '../workspace/workspace.module';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LayoutRoutes),
    NgbModule,
    MasterDataModule,
    SystemManageModule,
    WorkspaceModule,
    SaleOrdersModule
  ],
  declarations: [],
})
export class LayoutModule {}
