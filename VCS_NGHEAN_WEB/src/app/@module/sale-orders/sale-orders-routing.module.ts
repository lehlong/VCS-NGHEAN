import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderIndexComponent} from './order/order-index/order-index.component';
import {OrderReleaseIndexComponent} from './batching/order-release-index/order-release-index.component';
import {DebtIndexComponent} from './debt/debt-index/debt-index.component';
import {ExportIndexComponent} from './export/export-index/export-index.component';
import {OrderScaleIndexComponent} from './orderscale/order-scale-index/order-scale-index.component';

const routes: Routes = [
  {path: 'order', component: OrderIndexComponent},
  {path: 'debt', component: DebtIndexComponent},
  {path: 'batching', component: OrderReleaseIndexComponent},
  {path: 'export', component: ExportIndexComponent},
  {path: 'orderscale', component: OrderScaleIndexComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaleOrderRoutingModule {}
