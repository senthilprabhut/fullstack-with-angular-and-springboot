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

package org.dev.todo.todoservice.config;

import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

/**
 * Security configuration for the application.
 */
@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  @Autowired
  public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
    //auth.inMemoryAuthentication().passwordEncoder(NoOpPasswordEncoder.getInstance())
    //.withUser("in28Minutes").password("dummy")
    //.roles("USER", "ADMIN");
  }

  @Override
  protected void configure(HttpSecurity httpSecurity) throws Exception {
    // CORS by default uses a Bean by the name of corsConfigurationSource
    httpSecurity.cors().and()
        // Disable csrf protection - https://www.techdreams.site/posts/spring-csrf
        .csrf().disable()
        // don't create session
        .sessionManagement()
        .sessionCreationPolicy(
            SessionCreationPolicy.STATELESS).and()
        .authorizeRequests()
        .antMatchers(HttpMethod.OPTIONS).permitAll()
        .antMatchers("/login", "/h2-console/**").permitAll()
        //.antMatchers("/","/*todo*/**").access("hasRole('USER')")
        .antMatchers("/", "/*todo*/**", "/users/**").permitAll()
        .and()
        .formLogin();

    // disable page caching
    httpSecurity.headers().cacheControl().disable();
    httpSecurity.headers().frameOptions().disable();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("x-requested-with", "Accept", "Accept-Language", "Content-Language", "Content-Type", "Authorization"));
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }
}
