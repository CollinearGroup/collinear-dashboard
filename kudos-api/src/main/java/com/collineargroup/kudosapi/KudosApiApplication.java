package com.collineargroup.kudosapi;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class KudosApiApplication {

	private static final Logger log = LoggerFactory.getLogger(KudosApiApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(KudosApiApplication.class, args);
	}

	@Bean
  public CommandLineRunner log(KudoRepository kudoRepository) {
    return (args) -> {
      Kudo first = new Kudo("The Message");
      kudoRepository.save(first);
      Iterable<Kudo> kudos = kudoRepository.findAll();
      for (Kudo kudo : kudos) {
        log.info(kudo.getMessage());
      }
    };
  }

}
