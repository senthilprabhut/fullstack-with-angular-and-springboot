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

package org.dev.todo.todoservice.api.service;

import java.sql.Date;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import org.dev.todo.todoservice.dto.Todo;
import org.springframework.stereotype.Service;

/**
 * Service which works on Todos.
 */
@Service
public class TodoHardcodedService {

  private static List<Todo> todos = new ArrayList<>();
  private static int idCounter = 0;

  static {
    todos.add(new Todo(++idCounter, "Learn to Dance", "fritz",
        Date.from(Instant.now().plus(2L, ChronoUnit.DAYS)), false));
    todos.add(new Todo(++idCounter, "Learn about Microservices", "fritz",
        Date.from(Instant.now().plus(2L, ChronoUnit.DAYS)), false));
    todos.add(new Todo(++idCounter, "Learn about Angular", "fritz",
        Date.from(Instant.now().plus(2L, ChronoUnit.DAYS)), false));
  }

  /**
   * List all the todos.
   */
  public List<Todo> findAll() {
    return todos;
  }

  /**
   * Find a todo by its id.
   */
  public Todo findById(long id) {
    for (Todo todo : todos) {
      if (todo.getId() == id) {
        return todo;
      }
    }
    return null;
  }

  /**
   * Delete a todo by id.
   */
  public void deleteById(long id) {
    Todo todo = findById(id);
    if (todo != null) {
      todos.remove(todo);
    }
  }

  /**
   * Save or update a todo.
   */
  public Todo save(Todo todo) {
    if (todo.getId() == -1 || todo.getId() == 0) {
      todo.setId(++idCounter);
      todos.add(todo);
    } else {
      deleteById(todo.getId());
      todos.add(todo);
    }
    return todo;
  }
}
