import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountGroupIndexComponent} from '../system-manage/account-group/account-group-index/account-group-index.component';
import {AccountIndexComponent} from './account/account-index/account-index.component';
import {MenuIndexComponent} from './menu/menu-index/menu-index.component';
import {RightIndexComponent} from './role/role-index/right-index.component';

const routes: Routes = [
  {path: 'phan-quyen', component: AccountGroupIndexComponent},
  {path: 'account', component: AccountIndexComponent},
  {path: 'account-group', component: AccountGroupIndexComponent},
  {path: 'menu', component: MenuIndexComponent},
  {path: 'role', component: RightIndexComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemManageRoutingModule {}
