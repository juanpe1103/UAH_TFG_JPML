package com.jpml.gestion.route.mapper;

import com.jpml.gestion.route.dto.LocationDto;
import com.jpml.gestion.route.model.Location;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring", uses = IMapper.class, injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface LocationListMapper {

    List<Location> toModelList(List<LocationDto> dtos);

    List<LocationDto> toDTOList(List<Location> models);
}
