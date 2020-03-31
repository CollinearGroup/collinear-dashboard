package com.collineargroup.kudosapi;

import java.util.Map;

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
    Map<String, String> env = System.getenv();
    String password = env.get("KUDO_PASSWORD");
    if (password == null || password.isEmpty()) {
      password = "development";
    }
    auth.inMemoryAuthentication().withUser("dashboard").password("{noop}" + password).roles("USER");
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
