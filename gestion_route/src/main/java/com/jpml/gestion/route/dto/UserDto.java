package com.jpml.gestion.route.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
@Data
public class UserDto {

    private Long id;

    private String name;

    private String username;

    private String password;

}
