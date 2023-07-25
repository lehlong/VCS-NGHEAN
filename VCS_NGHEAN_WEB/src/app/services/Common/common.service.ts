import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { TranferObject } from 'src/app/models/Common/tranfer-object.model';
import { share } from 'rxjs';
import { METHOD } from 'src/app/utils/constant/index';
import { HandleResponse } from 'src/app/utils/utils';
declare function ShowLoading(): any;
declare function HideLoading(): any;

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  apiUrl: string = environment.baseApiUrl;

  constructor(
    private http: HttpClient,
    private handleResponse: HandleResponse
  ) {}

  getRequest(url: string, params?: any): Observable<TranferObject> {
    var tranferObject = this.http
      .get<TranferObject>(this.apiUrl + url, { params: params })
      .pipe(share());
    tranferObject.subscribe({
      next: (response) => {
        HideLoading();
        this.handleResponse.showMessage(response, METHOD.GET);
      },
    });
    return tranferObject;
  }

  postRequest(url: string, request: any): Observable<TranferObject> {
    var tranferObject = this.http
      .post<TranferObject>(this.apiUrl + url, request)
      .pipe(share());
    tranferObject.subscribe({
      next: (response) => {
        this.handleResponse.showMessage(response, METHOD.POST);
      },
    });
    return tranferObject;
  }

  putRequest(url: string, request: any): Observable<TranferObject> {
    var tranferObject = this.http
      .put<TranferObject>(this.apiUrl + url, request)
      .pipe(share());
    tranferObject.subscribe({
      next: (response) => {
        this.handleResponse.showMessage(response, METHOD.PUT);
      },
    });
    return tranferObject;
  }

  deleteRequest(url: string, request: any): Observable<TranferObject> {
    var tranferObject = this.http
      .delete<TranferObject>(this.apiUrl + url, { body: request })
      .pipe(share());
    tranferObject.subscribe({
      next: (response) => {
        this.handleResponse.showMessage(response, METHOD.DELETE);
      },
    });
    return tranferObject;
  }
}
