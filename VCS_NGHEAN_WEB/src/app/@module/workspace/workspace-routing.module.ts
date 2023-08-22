import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckInOutIndexComponent } from './check-in-out/check-in-out-index/check-in-out-index.component';
import { CheckInComponent } from './check-in-out/check-in/check-in.component';
import { CheckOutComponent } from './check-in-out/check-out/check-out.component';
import { QueueHandlingComponent } from './queue-handling/queue-handling.component';

const routes: Routes = [
    { path: 'check-in-out', component: CheckInOutIndexComponent },
    { path: 'check-in', component: CheckInComponent },
    { path: 'check-out', component: CheckOutComponent },
    { path: 'queue-handling', component: QueueHandlingComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WorkspaceRoutingModule { }
