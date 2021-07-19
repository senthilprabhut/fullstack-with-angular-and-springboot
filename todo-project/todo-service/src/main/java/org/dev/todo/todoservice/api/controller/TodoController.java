/*
 * Copyright (c) 2021 ToDo Service Contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 */

package org.dev.todo.todoservice.api.controller;

import java.net.URI;
import java.util.List;
import org.dev.todo.todoservice.api.service.TodoHardcodedService;
import org.dev.todo.todoservice.dto.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

/**
 * Controller for Todos.
 */
@RestController
@RequestMapping(path = "/users/{username}/todos")
public class TodoController {

  @Autowired
  private TodoHardcodedService todoService;

  @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseStatus(HttpStatus.CREATED)
  public ResponseEntity<Void> createTodo(@RequestBody Todo todo) {
    Todo createdTodo =  todoService.save(todo);
    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
        .buildAndExpand(createdTodo.getId()).toUri();
    return ResponseEntity.created(uri).build();
  }

  @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
  public List<Todo> listTodos(@PathVariable String username) {
    return todoService.findAll();
  }

  @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
  public Todo getTodo(@PathVariable String username, @PathVariable long id) {
    return todoService.findById(id);
  }

  @PutMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseStatus(HttpStatus.OK)
  public Todo updateTodo(@PathVariable String username, @PathVariable long id, @RequestBody Todo todo) {
    return todoService.save(todo);
  }

  @DeleteMapping(path = "/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteTodo(@PathVariable String username, @PathVariable long id) {
    todoService.deleteById(id);
  }
}
