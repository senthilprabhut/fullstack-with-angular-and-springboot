import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private oauthService: OAuthService) { }


  /**
   * Logout of the application. Revokes the access token
   * and initiates a complete logout.
   */  
  ngOnInit(): void {
    console.log("> Calling LogoutComponent.ngOnInit()...")
    if (this.oauthService.hasValidAccessToken()) {
      this.oauthService.revokeTokenAndLogout().catch(

        // This takes care of the case when revoking a token fails
        // because its already invalid. So this makes sure that we
        // still log out of the application and session cleanup is
        // done
        (error:any) => {
          console.log("> Calling just logout...")
          this.oauthService.logOut();
        }
      )
    }
  }

}
