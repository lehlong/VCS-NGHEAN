import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SaleOrderRoutingModule} from './sale-orders-routing.module';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgSelectModule} from '@ng-select/ng-select';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../share.modules';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {OrderIndexComponent} from './order/order-index/order-index.component';
import {OrderCreateComponent} from './order/order-create/order-create.component';
import {OrderEditComponent} from './order/order-edit/order-edit.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {OrderReleaseIndexComponent} from './batching/order-release-index/order-release-index.component';
import {OrderReleaseCreateComponent} from './batching/order-release-create/order-release-create.component';
import {OrderReleaseEditComponent} from './batching/order-release-edit/order-release-edit.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRippleModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {OrderReleaseDetailComponent} from './batching/order-release-detail/order-release-detail.component';
import {DebtIndexComponent} from 'src/app/@module/sale-orders/debt/debt-index/debt-index.component';
import {DebtEditComponent} from 'src/app/@module/sale-orders/debt/debt-detail/debt-edit.component';
import {ExportIndexComponent} from './export/export-index/export-index.component';
import {ExportDetailComponent} from './export/export-detail/export-detail.component';
import {OrderReleaseInfoComponent} from './batching/order-release-info/order-release-info.component';
import {OrderScaleIndexComponent} from './orderscale/order-scale-index/order-scale-index.component';
import {OrderScaleEditComponent} from './orderscale/order-scale-edit/order-scale-edit.component';

@NgModule({
  declarations: [
    DebtEditComponent,
    DebtIndexComponent,
    OrderIndexComponent,
    OrderCreateComponent,
    OrderEditComponent,
    OrderReleaseIndexComponent,
    OrderReleaseCreateComponent,
    OrderReleaseEditComponent,
    OrderReleaseDetailComponent,
    ExportIndexComponent,
    ExportDetailComponent,
    OrderReleaseInfoComponent,
    OrderScaleIndexComponent,
    OrderScaleEditComponent,
  ],
  imports: [
    MatTooltipModule,
    ScrollingModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    MatIconModule,
    MatCheckboxModule,
    MatTreeModule,
    MatTableModule,
    SharedModule,
    CommonModule,
    SaleOrderRoutingModule,
    NgbModule,
    NgxPaginationModule,
    FormsModule,
    NgSelectModule,
    TranslateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatRippleModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
})
export class SaleOrdersModule {}
