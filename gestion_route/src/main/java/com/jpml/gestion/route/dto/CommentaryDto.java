package com.jpml.gestion.route.dto;



import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class CommentaryDto {

    private Long id;

    private Integer score;

    private String description;

}