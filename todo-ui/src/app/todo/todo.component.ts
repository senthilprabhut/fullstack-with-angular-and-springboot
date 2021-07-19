import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../list-todos/list-todos.component';
import { TodoDataService } from '../service/data/todo-data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  id:number = 0
  todo:Todo = <Todo>{};

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private todoService:TodoDataService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (this.id != -1) {
      this.todoService.retrieveTodo('fritz', this.id).subscribe(
        response => {
          this.todo = response;
        }
      )
    }
  }

  saveTodo() {
    console.log(this.id);
    if (this.id == -1) {
      this.todoService.createTodo('fritz', this.todo).subscribe(
        response => {
          console.log("Creating: " + response);
          this.router.navigate(['/todos']);
        }
      )
    } else {
      console.log(this.todo);
      this.todoService.updateTodo('fritz', this.id, this.todo).subscribe(
        response => {
          console.log("Updating: " + response);
          this.router.navigate(['/todos']);
        }
      )
    }
  }

}
