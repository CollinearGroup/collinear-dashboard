package com.collineargroup.kudosapi;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * KudosRepository
 */
@RepositoryRestResource(collectionResourceRel = "kudo", path = "kudo")
public interface KudoRepository extends CrudRepository<Kudo, Long> {
}
