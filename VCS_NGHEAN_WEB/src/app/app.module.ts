import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {TranslateCacheModule, TranslateCacheSettings, TranslateCacheService} from 'ngx-translate-cache';
import {CookieService} from 'ngx-cookie-service';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgCacheRouteReuseModule} from 'ng-cache-route-reuse';
import {JwtModule} from '@auth0/angular-jwt';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxDocViewerModule} from 'ngx-doc-viewer';
import {LoginComponent} from './authentication/login/login.component';
import {HeaderInterceptor} from './services/Common/header-interceptor.service';
import {ToastrModule} from 'ngx-toastr';
import {FooterModule} from './@module/layout/footer/footer.module';
import {NavbarModule} from './@module/layout/navbar/navbar.module';
import {SidebarModule} from './@module/layout/sidebar/sidebar.module';
import {LayoutComponent} from './@module/layout/layout.component';
import {AuthGuard} from 'src/app/guards/auth-guard.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DrawerComponent} from 'src/app/@module/components/drawer/drawer.component';
import {HandleResponse} from 'src/app/utils/utils';
import {ResultComponent} from 'src/app/@module/components/result/result.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {DashboardComponent} from 'src/app/@module/components/dashboard/dashboard.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DisplayOrderComponent } from './@module/workspace/display/display-order/display-order.component';
import { DisplayTicketComponent } from './@module/workspace/display/display-ticket/display-ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    DrawerComponent,
    ResultComponent,
    DashboardComponent,
    DisplayOrderComponent,
    DisplayTicketComponent
  ],
  imports: [
    MatTooltipModule,
    MatAutocompleteModule,
    MatDialogModule,
    FooterModule,
    NavbarModule,
    SidebarModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    NgxPaginationModule,
    NgxDocViewerModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['https://localhost:4008/'],
        disallowedRoutes: [],
      },
    }),

    // Modul giữ cho trạng thái router không thay đổi khi chuyển sang router (dùng thuộc tính reuse ở phần router)
    NgCacheRouteReuseModule,

    //Load modul để change ngôn ngữ hệ thống
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
    // Modul lưu ngôn ngữ vào cache để khi load hoặc tắt thì ngôn ngữ vẫn được giữ nguyên
    TranslateCacheModule.forRoot({
      cacheService: {
        provide: TranslateCacheService,
        useFactory: (translateService: TranslateService, translateCacheSettings: TranslateCacheSettings) => {
          return new TranslateCacheService(translateService, translateCacheSettings);
        },
        deps: [TranslateService, TranslateCacheSettings],
      },
      cacheName: 'lang', // tên ngôn ngữ được lưu trong cache.
      cacheMechanism: 'LocalStorage', // nơi lưu trữ, xoá thuộc tính này thì mặc định là 'LocalStorage'.
      cookieExpiry: 1, // default value is 720, a month. Set to a negative value and the cookie becomes a session cookie.
      cookieAttributes: 'SameSite=Strict; Secure', // no default, optional specification of additional attributes.
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    HandleResponse,
    AuthGuard,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

//thay đổi đường dẫn khi thay đổi domain API để lấy tệp json ngôn ngữ
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'https://localhost:4008/api/LanguageTranslate/GetLang/', '.json');
}

export function tokenGetter() {
  return localStorage.getItem('jwt');
}
