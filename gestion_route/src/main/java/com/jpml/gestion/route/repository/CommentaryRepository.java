package com.jpml.gestion.route.repository;

import com.jpml.gestion.route.model.Commentary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CommentaryRepository extends JpaRepository<Commentary, Long> {
}
