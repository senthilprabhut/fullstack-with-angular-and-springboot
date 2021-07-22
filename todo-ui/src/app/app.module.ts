import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Required for OAuth2
import { OAuthModule } from 'angular-oauth2-oidc'; // Required for OAuth2. Install using "npm i angular-oauth2-oidc --save"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LogoutComponent } from './logout/logout.component';
import { TodoComponent } from './todo/todo.component';
import { HttpIntercepterBearerAuthService } from './service/http/http-intercepter-bearer-auth.service';

@NgModule({
  declarations: [
    AppComponent,  
    WelcomeComponent,
    LoginComponent,
    ErrorComponent,
    ListTodosComponent,
    MenuComponent,
    FooterComponent,
    LogoutComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OAuthModule.forRoot()    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpIntercepterBearerAuthService, multi: true} // multi:true allows more interceptors to be configured in future. otherwise, new ones will override the current one.
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
