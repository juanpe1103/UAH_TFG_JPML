package com.jpml.gestion.route.app.service;

import com.jpml.gestion.route.dto.LocationDto;
import com.jpml.gestion.route.dto.UserDto;
import com.jpml.gestion.route.mapper.IMapper;
import com.jpml.gestion.route.mapper.LocationListMapper;
import com.jpml.gestion.route.model.Location;
import com.jpml.gestion.route.model.User;
import com.jpml.gestion.route.repository.CommentaryRepository;
import com.jpml.gestion.route.repository.LocationRepository;
import com.jpml.gestion.route.repository.LocationsRepository;
import com.jpml.gestion.route.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class LocationManagerImpl implements LocationManager {

    @Autowired
    private final LocationRepository locationRepository;
    @Autowired
    private final LocationsRepository locationsRepository;
    @Autowired
    private final IMapper iMapper;
    @Autowired
    private final LocationListMapper locationListMapper;
    @Autowired
    private final UserRepository userRepository;


    public LocationManagerImpl(LocationRepository locationRepository, LocationsRepository locationsRepository,IMapper iMapper, LocationListMapper locationListMapper, UserRepository userRepository) {
        this.locationsRepository = locationsRepository;
        this.locationRepository = locationRepository;
        this.iMapper = iMapper;
        this.locationListMapper = locationListMapper;
        this.userRepository = userRepository;
    }

        @Override
        public void saveLocation(LocationDto locationDto, Long idUser){
            this.locationsRepository.deleteByLocationId(locationDto.getId());
            User user = userRepository.findById(idUser).orElse(null);
            Location location = iMapper.toModel(locationDto);
            location.setUser(user);
            locationRepository.save(location);
        }
    @Override
    public List<LocationDto> findAllLocationForUser(Long idUser){
        Optional<User> user = userRepository.findById(idUser);
        return user.isPresent() ? locationListMapper.toDTOList(locationRepository.findLocationByUser(user.get())) : new ArrayList<>();
    }

    @Override
    public void deleteLocation(Long id){
    locationRepository.deleteById(id);
    }

    @Override
    public List<LocationDto> findAllLocation(){
        return locationListMapper.toDTOList(locationRepository.findAll());
    }

    @Override
    public LocationDto findLocationById(Long idLocation){
        Location location = locationRepository.findById(idLocation).orElse(null);
        return iMapper.toDTO(location);
    }
    @Override
    public void addFavoriteLocation(Long userId, Long locationId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Location location = locationRepository.findById(locationId).orElseThrow(() -> new RuntimeException("Location not found"));
        user.getFavoriteLocations().add(location);
        userRepository.save(user);
    }

    @Override
    public void removeFavoriteLocation(Long userId, Long locationId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Location location = locationRepository.findById(locationId).orElseThrow(() -> new RuntimeException("Location not found"));
        user.getFavoriteLocations().remove(location);
        userRepository.save(user);
    }
    @Override
    public List<LocationDto> findUserFavorites(Long idUser){
        Optional<User> userOptional = userRepository.findById(idUser);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return locationListMapper.toDTOList(user.getFavoriteLocations());
        } else {
            return null;
        }
    }
}
