import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Todo } from 'src/app/list-todos/list-todos.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(@Inject('BACKEND_API_URL') private apiUrl:string,
    private http:HttpClient
  ) { }

  retrieveAllTodos() {
    return this.http.get<Todo[]>(`${this.apiUrl}/todo/api/todos`);
  }

  deleteTodo(id:number) {
    return this.http.delete(`${this.apiUrl}/todo/api/todos/${id}`);
  }

  retrieveTodo(id:number) {
    return this.http.get<Todo>(`${this.apiUrl}/todo/api/todos/${id}`);
  }

  updateTodo(id:number, todo:Todo) {
    return this.http.put<Todo>(`${this.apiUrl}/todo/api/todos/${id}`, todo);
  }

  createTodo(todo:Todo) {
    return this.http.post(`${this.apiUrl}/todo/api/todos`, todo);
  }
}
