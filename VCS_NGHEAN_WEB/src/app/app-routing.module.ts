import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './authentication/login/login.component';
import {LayoutComponent} from 'src/app/@module/layout/layout.component';
import {AuthGuard} from 'src/app/guards/auth-guard.service';
import {ResultComponent} from 'src/app/@module/components/result/result.component';
import {LayoutRoutes} from './@module/layout/layout.routing';

const routes: Routes = [
  {path: 'Login', component: LoginComponent},
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/@module/layout/layout.module').then((m) => m.LayoutModule),
      },
    ],
  },
  {path: '**', component: ResultComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
