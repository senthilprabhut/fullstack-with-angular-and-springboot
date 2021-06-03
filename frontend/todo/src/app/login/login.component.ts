import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthService } from '../service/hardcoded-auth.service';

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

  // Router - dependency injection
  constructor(private router: Router,
    private hardcodedAuthService: HardcodedAuthService) { }

  ngOnInit(): void {
  }

  handleLogin() {
    if(this.hardcodedAuthService.authenticate(this.username,this.password)) {
      // Redirect to Welcome page
      this.router.navigate(['welcome', this.username])
      this.invalidLogin=false
    } else {
      this.invalidLogin=true
    }
    console.log(this.invalidLogin);
  }
}
