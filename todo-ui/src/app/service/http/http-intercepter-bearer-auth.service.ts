import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterBearerAuthService implements HttpInterceptor{

  constructor(private oauthService: OAuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log(this.oauthService.hasValidAccessToken());
    if (this.oauthService.hasValidAccessToken()) {
      let bearerTokenHeaderString = 'Bearer ' + this.oauthService.getAccessToken();
      request = request.clone({
        setHeaders: {
          Authorization: bearerTokenHeaderString
        }
      });
    }

    return next.handle(request);
  }
}
