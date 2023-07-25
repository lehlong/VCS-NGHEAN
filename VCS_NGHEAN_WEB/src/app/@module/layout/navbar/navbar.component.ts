import {
  Component,
  OnInit,
} from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import { TranslateCacheService } from 'ngx-translate-cache';
import {GlobalService} from 'src/app/services/Common/global.service';

@Component({
  selector: "navbar-cmp",
  templateUrl: "navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  lstRight = JSON.parse(localStorage.getItem('lstRight') || '{}') 
  lang = localStorage.getItem('lang');
  token = localStorage.getItem("jwt");
  username: string = '';
  fullName: string = '';
  constructor(public translate: TranslateService, translateCache: TranslateCacheService,  private globalService: GlobalService){
    // translate.addLangs(['vi', 'en']);
    // translate.setDefaultLang('vi');
    // translateCache.init();
    const UserInfo = this.globalService.getUserInfo();
    this.username = UserInfo?.userName;
    this.fullName = UserInfo?.fullName;
  }
  ngOnInit(): void {
    
  }

  sidebarToggle() {
    this.globalService.setToggleSidebar(!this.globalService.toggleSidebar);
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.lang = localStorage.getItem('lang');
  }

  logOut(){
    localStorage.clear();
    window.location.reload();
  }
}
