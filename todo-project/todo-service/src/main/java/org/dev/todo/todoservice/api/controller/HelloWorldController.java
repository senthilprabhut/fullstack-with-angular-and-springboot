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

import org.dev.todo.todoservice.dto.HelloWorldBean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

/**
 * Hello world controller.
 */
@RestController
public class HelloWorldController {

  @GetMapping(path = "/todo/hello-world")
  public String helloWorld() {
    return "Hello World";
  }

  @GetMapping(path = "/todo/hello-world-bean")
  public HelloWorldBean helloWorldBean() {
    //return new HelloWorldBean("Hello World");
    throw new RuntimeException("Runtime error from backend");
  }

  @GetMapping(path = "/todo/hello-world-bean/{name}")
  public HelloWorldBean helloWorldBean(@PathVariable String name) {
    return new HelloWorldBean(String.format("Hello World, %s", name));
  }
}
