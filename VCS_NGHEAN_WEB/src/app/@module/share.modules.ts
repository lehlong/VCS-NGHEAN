import {NgModule} from '@angular/core';
import {PaginationComponent} from './components/pagination/pagination.component';
import {EmptyComponent} from './components/empty/empty.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InputCustomComponent} from './components/input-custom/input-custom.component';
import {CommaSeparatedDirective} from 'src/app/@module/directive/comma-separated/comma.separated';
import {EllipsisDirective} from 'src/app/@module/directive/ellipsis-directive/ellipsis.directive';
import {ScrollToErrorDirective} from 'src/app/@module/directive/scroll-error/scroll.error';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    PaginationComponent,
    EmptyComponent,
    InputCustomComponent,
    CommaSeparatedDirective,
    ScrollToErrorDirective,
    EllipsisDirective,
  ],
  exports: [
    PaginationComponent,
    EmptyComponent,
    InputCustomComponent,
    CommaSeparatedDirective,
    ScrollToErrorDirective,
    EllipsisDirective,
  ],
})
export class SharedModule {}
