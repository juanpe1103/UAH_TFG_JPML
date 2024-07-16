package com.jpml.gestion.route.repository;
import java.util.Optional;

import com.jpml.gestion.route.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String name);
    Boolean existsByUsername(String username);
}
