import {Routes} from '@angular/router';
import {ResultComponent} from 'src/app/@module/components/result/result.component';
import {DashboardComponent} from 'src/app/@module/components/dashboard/dashboard.component';
import { CheckInOutIndexComponent } from '../workspace/check-in-out/check-in-out-index/check-in-out-index.component';

export const LayoutRoutes: Routes = [
  {
    path: 'system-manage',
    loadChildren: () => import('../system-manage/system-manage.module').then((m) => m.SystemManageModule),
  },
  {
    path: 'sale-orders',
    loadChildren: () => import('../sale-orders/sale-orders.module').then((m) => m.SaleOrdersModule),
  },
  {
    path: 'master-data',
    loadChildren: () => import('../master-data/master-data.module').then((m) => m.MasterDataModule),
  },
  {
    path: 'workspace',
    loadChildren: () => import('../workspace/workspace.module').then((m) => m.WorkspaceModule),
  },

  {path: 'dashboard', component: DashboardComponent},
  {path: '', component: CheckInOutIndexComponent},
  {path: '**', component: ResultComponent},
];