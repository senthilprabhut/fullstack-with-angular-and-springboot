import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo';
  message = "Welcome to Angular!"

  constructor() {}

  ngOnInit(): void {
    console.log("> Calling AppComponent.ngOnInit()...")
  }  
}
