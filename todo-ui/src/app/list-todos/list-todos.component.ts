import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';

export class Todo {
  constructor(
      public id: number, 
      public description: string, 
      public done: boolean,
      public targetDate: Date
    ) {

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  // todos = [
  //   new Todo(1, 'Learn to dance', false, new Date()),
  //   new Todo(2, 'Become an expert in angular', false, new Date()),
  //   new Todo(3, 'Visit india', false, new Date())
  // ]

  todos:Todo[] = []
  message:string = ''

  constructor(
    private todoService:TodoDataService,
    private router:Router) { }

  ngOnInit(): void {
    this.refreshTodos();
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos().subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    ) 
  }

  deleteTodo(id:number) {
    console.log(`Delete todo ${id}`);
    this.todoService.deleteTodo(id).subscribe(
      response => {
        this.message = `Delete of Todo ${id} Successful!`;
        this.refreshTodos();
      }
    );
  }

  updateTodo(id:number) {
    console.log(`Update todo ${id}`);
    this.router.navigate(['todos', id]);
  }

  addTodo() {
    this.router.navigate(['todos', -1]);
  }    
}
