import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/app.constants';
import { Todo } from 'src/app/list-todos/list-todos.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {

  constructor(
    private http:HttpClient
  ) { }

  retrieveAllTodos() {
    return this.http.get<Todo[]>(`${API_URL}/todo/api/todos`);
  }

  deleteTodo(id:number) {
    return this.http.delete(`${API_URL}/todo/api/todos/${id}`);
  }

  retrieveTodo(id:number) {
    return this.http.get<Todo>(`${API_URL}/todo/api/todos/${id}`);
  }

  updateTodo(id:number, todo:Todo) {
    return this.http.put<Todo>(`${API_URL}/todo/api/todos/${id}`, todo);
  }

  createTodo(todo:Todo) {
    return this.http.post(`${API_URL}/todo/api/todos`, todo);
  }
}
