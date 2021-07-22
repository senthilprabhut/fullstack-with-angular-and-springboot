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

package org.dev.todo.todoservice.persistence.repository;

import java.util.List;
import org.dev.todo.todoservice.persistence.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Todo Jpa Repository.
 */
public interface TodoJpaRepository extends JpaRepository<Todo, Long> {

  List<Todo> findByUsername(String username);
}
