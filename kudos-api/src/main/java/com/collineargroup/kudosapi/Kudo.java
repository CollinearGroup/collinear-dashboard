package com.collineargroup.kudosapi;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

/**
 * Kudos
 */
@Entity
@Data
public class Kudo {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String message;
  private String from_person;
  private String to_person;
}
