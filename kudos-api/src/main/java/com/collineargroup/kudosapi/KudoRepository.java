package com.collineargroup.kudosapi;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 * KudosRepository
 */
@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "kudo", path = "kudo")
public interface KudoRepository extends CrudRepository<Kudo, Long> {
}
