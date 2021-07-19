import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { HelloWorldBean, WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  //property: string =''
  welcomeMessage:string = ''

  // Activated Route - get the currently active route
  constructor(private route:ActivatedRoute,
    private service:WelcomeDataService,
    private oauthService: OAuthService) { }

  ngOnInit(): void {
    // console.log(this.route.snapshot.params['name'])
  }

  // public getWelcomeMessage() {
  //   // console.log("get welcome message");
  //   console.log(this.service.executeHelloWorldBeanService());
  //   this.service.executeHelloWorldBeanService().subscribe(
  //     response => this.handleSuccessfulResponse(response),
  //     error => this.handleErrorResponse(error)
  //   );
  // }

  public getWelcomeMessageWithParameter() {
    this.service.executeHelloWorldBeanWithPathVariable(this.givenName).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  handleSuccessfulResponse(response:HelloWorldBean) {
    console.log(response.message)
    this.welcomeMessage = response.message;
  }

  handleErrorResponse(error:any) {
    console.log(error);
    console.log(error.error);

    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }    
    this.welcomeMessage = errorMessage;
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
