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
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.dev.sbc.auth.utils.OktaSecurityContextUtils;
import org.dev.todo.todoservice.dto.TodoDto;
import org.dev.todo.todoservice.mapper.TodoMapper;
import org.dev.todo.todoservice.persistence.entity.Todo;
import org.dev.todo.todoservice.persistence.repository.TodoJpaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Required;
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
@RequiredArgsConstructor
@RestController
@RequestMapping(path = ServiceUriPaths.TODO_API)
public class TodoController {

  private final TodoJpaRepository repository;
  private final TodoMapper mapper;

  /**
   * Create a Todo.
   */
  @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE,
      consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseStatus(HttpStatus.CREATED)
  public ResponseEntity<Void> createTodo(@RequestBody TodoDto todo) {
    todo.setUsername(OktaSecurityContextUtils.getUserName());
    Todo createdTodo =  repository.save(mapper.toEntity(todo, null));
    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
        .buildAndExpand(createdTodo.getId()).toUri();
    return ResponseEntity.created(uri).build();
  }

  /**
   * List Todos.
   */
  @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
  public List<TodoDto> listTodos() {
    String username = OktaSecurityContextUtils.getUserName();
    return repository.findByUsername(username)
        .stream().map(mapper::toDto)
        .collect(Collectors.toList());
  }

  /**
   * Get Todo by id.
   */
  @GetMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
  public TodoDto getTodo(@PathVariable long id) {
    return repository.findById(id)
        .map(mapper::toDto).get();
  }

  /**
   * Update a Todo.
   */
  @PutMapping(path = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE,
      consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseStatus(HttpStatus.OK)
  public TodoDto updateTodo(@PathVariable long id, @RequestBody TodoDto dto) {
    dto.setUsername(OktaSecurityContextUtils.getUserName());
    Todo entity = repository.findById(dto.getId()).get();
    Todo mergedEntity = repository.save(mapper.toEntity(dto, entity));
    return mapper.toDto(mergedEntity);
  }

  /**
   * Delete a Todo.
   */
  @DeleteMapping(path = "/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteTodo(@PathVariable long id) {
    repository.deleteById(id);
  }
}
