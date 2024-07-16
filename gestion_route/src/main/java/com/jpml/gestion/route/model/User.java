package com.jpml.gestion.route.model;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;

@Setter
@Getter
@Entity
@Table(name = "usuarios", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "username"
        }),
})
public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min=3, max = 50)
    private String name;

    @NotBlank
    private String username;

    @NotBlank
    @Size(min=6, max = 100)
    private String password;

    @ManyToMany
    @JoinTable(
            name = "user_favorite_locations",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "location_id")
    )
    @JsonBackReference
    private List<Location> favoriteLocations;


    @JsonBackReference
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "user")
    private List<Commentary> commentaries;

    public User() {}

    public User(String name, String username, String password, List<Commentary> commentaries, List<Location> favoriteLocations) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.commentaries = commentaries;
        this.favoriteLocations = favoriteLocations;
    }

}
