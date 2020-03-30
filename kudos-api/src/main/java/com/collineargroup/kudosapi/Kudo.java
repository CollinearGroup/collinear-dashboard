package com.collineargroup.kudosapi;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Kudos
 */
@Entity
public class Kudo {
  protected Kudo() {}
  public Kudo(String message) {
    this.message = message;
  }
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String message;
  
  /**
   * @return the message
   */
  public String getMessage() {
    return message;
  }
}