import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';

/**
 * If the access token has expired or is invalid, then routes should
 * not be accessible. This Guard protects the configured routes and
 * makes sure that the access token is still valid.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private oauthService: OAuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken()) {
        return true;
      }

      // Route user to login page
      this.router.navigate(['/login']);
      return false;
  }

}
