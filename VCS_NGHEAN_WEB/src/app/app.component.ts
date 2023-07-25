import { Component, enableProdMode, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { TranslateCacheService } from 'ngx-translate-cache';
import * as signalR from '@microsoft/signalr';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
  dataUser = JSON.parse(localStorage.getItem('user') || '{}');
  lstRight = JSON.parse(localStorage.getItem('lstRight') || '{}') 
  lang = localStorage.getItem('lang');
  token = localStorage.getItem("jwt");
  constructor(public translate: TranslateService, translateCache: TranslateCacheService,public cookie: CookieService, private router: Router,private jwtHelper : JwtHelperService ){
    // translate.addLangs(['vi', 'en']);
    // translate.setDefaultLang('vi');
    // translateCache.init();
    // this.startConnection();
    // if (this.token && !this.jwtHelper.isTokenExpired(this.token)) {
    //   this.startConnection();
    // }
  }
  

  private hubConnection: signalR.HubConnection | undefined;
  public startConnection =() =>{
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(`https://localhost:4008/UserOnline` + '?username=' + this.dataUser.USER_NAME)  
    .build();
    this.hubConnection
    .start()
    .then(()=>{
      //console.log("Connection started!")
    })
    .catch(err =>{
      console.log(err)
    })
  }

  checkUserRight(right: string){
    var checkRight = false;
    var length = this.lstRight.length;
    for(var i = 0; i< length;i++){
      if(this.lstRight[i] == right){
        checkRight = true;
      }
    }
    return checkRight;
  }

  ngOnInit(): void {
    //LoadScript
    this.loadScript('./assets/vendor/bootstrap/js/bootstrap.bundle.min.js');
    this.loadScript('./assets/vendor/quill/quill.min.js');
    this.loadScript('./assets/vendor/simple-datatables/simple-datatables.js');
    this.loadScript('./assets/vendor/tinymce/tinymce.min.js');
    this.loadScript('./assets/vendor/php-email-form/validate.js');
    this.loadScript('./assets/js/main.js');
    this.loadScript('./assets/js/global.js');
    this.loadScript('./assets/select2/select2.min.js');
    this.loadScript('./assets/zTree/jquery.ztree.core-3.5.min.js');
    this.loadScript('./assets/zTree/jquery.ztree.excheck-3.5.min.js');
    this.loadScript('./assets/zTree/jquery.ztree.exedit-3.5.min.js');
    this.loadScript('./assets/zTree/jquery.ztree.exhide-3.5.min.js'); 

    const token = localStorage.getItem("jwt");
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      localStorage.clear();
      this.router.navigate(['Login']);
    }

    enableProdMode()
  }
  title = 'PMS';

  loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.lang = localStorage.getItem('lang');
  }

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  logOut(){
    localStorage.clear();
    window.location.reload();
  }
}
