package com.jpml.gestion.route.dto;

import java.util.List;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class LocationDto {

    private Long id;

    private Double lat;

    private Double lng;

    private Double distance;

    private String description;

    private List<LocationsDto> locations;

    private List<CommentaryDto> commentaries;

}
