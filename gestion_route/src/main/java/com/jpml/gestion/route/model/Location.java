package com.jpml.gestion.route.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "location")
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double lat;

    private Double lng;

    private Double distance;

    private String description;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name ="location_id", referencedColumnName=
            "id")
    @JsonManagedReference
    private List<Locations> locations;

    @JsonManagedReference
    @ManyToOne
    private User user;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true, mappedBy = "location") // CASCADE ALL --> Borra los comentarios antes de borrar la location
    private List<Commentary> commentaries;

    @ManyToMany(cascade = CascadeType.ALL, mappedBy = "favoriteLocations")
    @JsonManagedReference
    private List<User> favoritedByUsers;

    public Location() {}

    public Location(Long id, Double lat, Double lng, Double distance, String description, List<Locations> locations, User user, List<Commentary> commentaries, List<User> favoritedByUsers) {
        this.id = id;
        this.lat = lat;
        this.lng = lng;
        this.distance = distance;
        this.description = description;
        this.locations = locations;
        this.user = user;
        this.commentaries = commentaries;
        this.favoritedByUsers = favoritedByUsers;
    }
}
