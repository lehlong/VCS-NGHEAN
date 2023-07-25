import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SystemManageRoutingModule} from './system-manage-routing.module';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgSelectModule} from '@ng-select/ng-select';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {SharedModule} from '../share.modules';
import {AccountGroupIndexComponent} from './account-group/account-group-index/account-group-index.component';
import {AccountGroupEditComponent} from './account-group/account-group-edit/account-group-edit.component';
import {AccountGroupCreateComponent} from './account-group/account-group-create/account-group-create.component';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {AccountIndexComponent} from './account/account-index/account-index.component';
import {AccountEditComponent} from './account/account-edit/account-edit.component';
import {AccountCreateComponent} from './account/account-create/account-create.component';
import {MenuIndexComponent} from './menu/menu-index/menu-index.component';
import {MenuEditComponent} from './menu/menu-edit/menu-edit.component';
import {MenuCreateComponent} from './menu/menu-create/menu-create.component';
import {RightIndexComponent} from './role/role-index/right-index.component';
import { RightEditComponent } from './role/right-edit/right-edit.component';
import { RightCreateComponent } from './role/right-create/right-create.component';

@NgModule({
  declarations: [
    AccountGroupIndexComponent,
    AccountGroupEditComponent,
    AccountGroupCreateComponent,
    AccountIndexComponent,
    AccountEditComponent,
    AccountCreateComponent,
    MenuIndexComponent,
    MenuEditComponent,
    MenuCreateComponent,
    RightIndexComponent,
    RightEditComponent,
    RightCreateComponent,
  ],
  imports: [
    NgbModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    MatIconModule,
    MatCheckboxModule,
    MatTreeModule,
    MatTableModule,
    SharedModule,
    ToastrModule,
    CommonModule,
    SystemManageRoutingModule,
    NgbModule,
    NgxPaginationModule,
    FormsModule,
    NgSelectModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
})
export class SystemManageModule {}
