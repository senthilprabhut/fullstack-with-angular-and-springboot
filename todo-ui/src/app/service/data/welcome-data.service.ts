import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http:HttpClient  ) { }

  executeHelloWorldBeanService(): Observable<HelloWorldBean> {
    return this.http.get<HelloWorldBean>(`${API_URL}/todo/hello-world-bean`)
  }

  executeHelloWorldBeanWithPathVariable(name:string) {
    // let bearerTokenHeaderString = 'Bearer ' + this.oauthService.getAccessToken();
    // let httpHeaders = new HttpHeaders({
    //   Authorization: bearerTokenHeaderString
    // })
    // return this.http.get<HelloWorldBean>(`${API_URL}/todo/hello-world-bean/${name}`, {headers : httpHeaders})
    return this.http.get<HelloWorldBean>(`${API_URL}/todo/hello-world-bean/${name}`)
  }
}

export class HelloWorldBean {
  constructor(public message:string) {}
}