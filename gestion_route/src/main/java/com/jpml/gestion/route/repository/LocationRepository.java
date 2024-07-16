package com.jpml.gestion.route.repository;

import com.jpml.gestion.route.model.Location;
import com.jpml.gestion.route.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
      List<Location> findLocationByUser(User user);

}
