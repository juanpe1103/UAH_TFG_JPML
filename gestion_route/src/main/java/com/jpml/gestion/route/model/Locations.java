package com.jpml.gestion.route.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Setter
@Getter
@Entity
@Table(name = "locations")
public class Locations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double lat;

    private Integer pos;


    private Double lng;

    private String description;

    @JsonBackReference
    @JoinColumn(name = "location_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Location location;

    public Locations() {}

    public Locations(Long id, Double lat, Integer pos, Double lng, String description, Location location) {
        this.id = id;
        this.lat = lat;
        this.pos = pos;
        this.lng = lng;
        this.description = description;
        this.location = location;
    }
}
