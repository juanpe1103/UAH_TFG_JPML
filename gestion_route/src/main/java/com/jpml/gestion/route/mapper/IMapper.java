package com.jpml.gestion.route.mapper;

import com.jpml.gestion.route.dto.CommentaryDto;
import com.jpml.gestion.route.dto.LocationDto;
import com.jpml.gestion.route.dto.LocationsDto;
import com.jpml.gestion.route.dto.UserDto;
import com.jpml.gestion.route.model.Commentary;
import com.jpml.gestion.route.model.Location;
import com.jpml.gestion.route.model.Locations;
import com.jpml.gestion.route.model.User;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface IMapper {
    LocationDto toDTO(Location model);
    Location toModel(LocationDto dto);
    CommentaryDto toDTO(Commentary model, Class<CommentaryDto> commentaryDtoClass);
    Commentary toModel(CommentaryDto dto, Class<Commentary> commentaryClass);

    LocationsDto toDTO(Locations model);
    Locations toModel(LocationsDto dto);
    UserDto toDTO(User model);
    User toModel(UserDto dto);


}