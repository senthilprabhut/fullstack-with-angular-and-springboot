import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(@Inject('BACKEND_API_URL') private apiUrl:string,
    private http:HttpClient  ) { }

  executeHelloWorldBeanService(): Observable<HelloWorldBean> {
    return this.http.get<HelloWorldBean>(`${this.apiUrl}/todo/api/hello-world-bean`)
  }

  executeHelloWorldBeanWithPathVariable(name:string) {
    // let bearerTokenHeaderString = 'Bearer ' + this.oauthService.getAccessToken();
    // let httpHeaders = new HttpHeaders({
    //   Authorization: bearerTokenHeaderString
    // })
    // return this.http.get<HelloWorldBean>(`${API_URL}/todo/hello-world-bean/${name}`, {headers : httpHeaders})
    return this.http.get<HelloWorldBean>(`${this.apiUrl}/todo/api/hello-world-bean/${name}`)
  }
}

export class HelloWorldBean {
  constructor(public message:string) {}
}