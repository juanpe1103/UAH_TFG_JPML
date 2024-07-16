package com.jpml.gestion.route.dto;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class LocationsDto {

    private Long id;

    private Integer pos;

    private Double lat;

    private Double lng;

    private String description;

    public LocationsDto(Long id, Integer pos, Double lat, Double lng, String description) {
        this.id = id;
        this.pos = pos;
        this.lat = lat;
        this.lng = lng;
        this.description = description;
    }

    public LocationsDto() {
    }
}
