import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgSelectModule} from '@ng-select/ng-select';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {SharedModule} from '../share.modules';
import {MatCheckboxModule} from '@angular/material/checkbox';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CheckInOutIndexComponent } from './check-in-out/check-in-out-index/check-in-out-index.component';
import { CheckInComponent } from './check-in-out/check-in/check-in.component';
import { CheckOutComponent } from './check-in-out/check-out/check-out.component';
import { QueueHandlingComponent } from './queue-handling/queue-handling.component';


@NgModule({
  declarations: [
    CheckInOutIndexComponent,
    CheckInComponent,
    CheckOutComponent,
    QueueHandlingComponent,
  ],
  imports: [
    MatTableModule,
    SharedModule,
    ToastrModule,
    CommonModule,
    WorkspaceRoutingModule,
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
export class WorkspaceModule {}
