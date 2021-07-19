import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http:HttpClient,
    private oauthService: OAuthService
  ) { }

  executeHelloWorldBeanService(): Observable<HelloWorldBean> {
    return this.http.get<HelloWorldBean>('http://localhost:8081/todo/hello-world-bean')
  }

  executeHelloWorldBeanWithPathVariable(name:string) {
    let bearerTokenHeaderString = this.createBearerTokenHttpHeader();
    let httpHeaders = new HttpHeaders({
      Authorization: bearerTokenHeaderString
    })
    return this.http.get<HelloWorldBean>(`http://localhost:8081/todo/hello-world-bean/${name}`, {headers : httpHeaders})
  }

  createBearerTokenHttpHeader() {
    let bearerTokenHeaderString = 'Bearer ' + this.oauthService.getAccessToken();
    return bearerTokenHeaderString;
  }
}

export class HelloWorldBean {
  constructor(public message:string) {}
}