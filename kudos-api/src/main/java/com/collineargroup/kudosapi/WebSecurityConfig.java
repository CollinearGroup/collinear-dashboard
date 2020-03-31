package com.collineargroup.kudosapi;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * WebSecurityConfig
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.inMemoryAuthentication().withUser("dashboard").password("{noop}development").roles("USER");
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
    .httpBasic()
    .and()
    .authorizeRequests()
    .antMatchers(HttpMethod.GET, "/kudo").permitAll()
    .antMatchers(HttpMethod.POST, "/kudo").hasRole("USER")
    .and()
    .csrf().disable();
  }
}
