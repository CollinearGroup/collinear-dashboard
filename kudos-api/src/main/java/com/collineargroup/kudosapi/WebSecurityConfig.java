package com.collineargroup.kudosapi;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

/**
 * WebSecurityConfig
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    // http.authorizeRequests().antMatchers(HttpMethod.GET, "/kudo").permitAll();
    http
    .authorizeRequests().antMatchers(HttpMethod.GET, "/kudo").permitAll()
    .antMatchers(HttpMethod.POST, "/kudo").authenticated()
    .and().formLogin()
    .and().csrf().disable();
  }

  @Bean
  @Override
  protected UserDetailsService userDetailsService() {
    UserDetails user =
      User.withDefaultPasswordEncoder()
        .username("dashboard")
        .password("development")
        .roles("USER")
        .build();
      return new InMemoryUserDetailsManager(user);
  }

  
}