package com.jpml.gestion.route.app.service;

import com.jpml.gestion.route.dto.LocationDto;
import com.jpml.gestion.route.dto.UserDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface LocationManager {

    void saveLocation(LocationDto locationdto, Long idUser);
    List<LocationDto> findAllLocationForUser(Long idUser);
    void deleteLocation(Long id);
    List<LocationDto> findAllLocation();
    LocationDto findLocationById(Long idLocation);
    void addFavoriteLocation(Long userId, Long locationId);
    void removeFavoriteLocation(Long userId, Long locationId);
    List<LocationDto> findUserFavorites(Long idUser);
}





















