package com.jpml.gestion.route.repository;

import com.jpml.gestion.route.model.Locations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface LocationsRepository extends JpaRepository<Locations, Long> {
      void deleteByLocationId(Long locationId);

}
