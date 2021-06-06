import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators'; 
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { oauthConfig } from '../oauth-config.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'test'
  password = ''
  errorMessage = 'Invalid Credentials'
  invalidLogin = false

  constructor(private router: Router,
    private oauthService: OAuthService) { 

      // Use setStorage to use sessionStorage or another implementation of the TS-type Storage
      // instead of localStorage
      this.oauthService.setStorage(sessionStorage);

      // set to true, to receive also an id_token via OpenId Connect (OIDC) in addition to the
      // OAuth2-based access_token
      this.oauthService.oidc = true; // ID_Token      

      this.oauthService.showDebugInformation = true;
    }

  ngOnInit(): void {
    console.log("> Calling LoginComponent.ngOnInit()...")

    // configure oauth
    this.oauthService.configure(oauthConfig);
    this.oauthService.loadDiscoveryDocument()
    .then((doc) => {
      console.log("> In discovery doc load success")
      this.oauthService.tryLoginCodeFlow({})      
    });  

    // subscribe to token events
    this.oauthService.events
    .pipe(filter((e: any) => {
      return e.type === 'token_received';
    }))
    .subscribe(() => {
      console.log("Redirect to Welcome page");
      this.router.navigate(['welcome']);   
    });

    // this.oauthService.events.subscribe(({ type }: OAuthEvent) => {
    //   switch (type) {
    //     case 'token_received':
    //       this.router.navigate(['welcome']);
    //       break;
    //     }
    // });    
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  // private handleNewToken() {
    // this.decodedAccessToken = this.oauthService.getAccessToken();
    // this.decodedIDToken = this.oauthService.getIdToken();

  // }  
}
