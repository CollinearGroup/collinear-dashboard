package com.collineargroup.kudosapi;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.CreationTimestamp;

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
  private String fromPerson;
  @CreationTimestamp
  private Date createdDate;
}
