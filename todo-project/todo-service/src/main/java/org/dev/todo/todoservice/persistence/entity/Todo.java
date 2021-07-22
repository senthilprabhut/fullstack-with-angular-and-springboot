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

package org.dev.todo.todoservice.persistence.entity;

import java.time.Instant;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Todo Model.
 */
@Entity(name = "todo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Todo {
  // ID of to-do
  @Id
  @GeneratedValue
  private long id;

  // Description of the to-do
  private String description;

  // User who created the to-do
  private String username;

  // Completion date
  private Instant targetDate;

  // Whether to-do is completed
  private boolean isDone;
}
