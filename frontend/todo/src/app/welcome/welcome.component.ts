import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  //property: string =''

  // Activated Route - get the currently active route
  constructor(private route:ActivatedRoute,
    private service:WelcomeDataService,
    private oauthService: OAuthService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['name'])
  }

  public getWelcomeMessage() {
    //console.log("get welcome message");
    this.service.executeHelloWorldBeanService
  }

  public get givenName() {
    let name = this.getProperty('name');
    if (name === '') name = 'Anonymous User';
    return name;
  }

  public get uid() {
    return this.getProperty('sub');
  }

  private getProperty(property: string): string {
    let claims: any = this.oauthService.getIdentityClaims();
    let claimsJson = JSON.parse(JSON.stringify(claims));
    if(claimsJson && claimsJson[property]) {
      return claimsJson[property];
    }
    return '';    
  }
}
