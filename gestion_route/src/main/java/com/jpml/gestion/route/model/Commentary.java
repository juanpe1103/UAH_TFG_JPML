package com.jpml.gestion.route.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Setter
@Getter
@Entity
@Table(name = "commentary")

public class Commentary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer score;

    private String description;

    @JsonManagedReference
    @ManyToOne
    private User user;

    @JsonManagedReference
    @ManyToOne
    private Location location;

    public Commentary() {
    }

    public Commentary(Long id, Integer score, String description, User user, Location location) {
        this.id = id;
        this.score = score;
        this.description = description;
        this.user = user;
        this.location = location;
    }

}