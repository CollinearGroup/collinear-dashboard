package com.collineargroup.kudosapi;

import java.util.Calendar;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@SpringBootApplication
@EnableScheduling
public class KudosApiApplication {
	@Autowired
	private KudoRepository repository;
  private static final Logger log = LoggerFactory.getLogger(KudosApiApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(KudosApiApplication.class, args);
	}

	@Scheduled(cron = "0 0 * * * *")
  public void reportCurrentTime() {
		for (Kudo k : repository.findAll()) {
			Calendar expiryTime = Calendar.getInstance();
			expiryTime.setTime(k.getCreatedDate());
			expiryTime.add(Calendar.DAY_OF_MONTH, 7);
			Date now = new Date();
			if (now.compareTo(expiryTime.getTime()) > 0 ) {
				log.info("Removing expired kudo of {}", k.getId());
				repository.delete(k);
			}
		}
  }
}
