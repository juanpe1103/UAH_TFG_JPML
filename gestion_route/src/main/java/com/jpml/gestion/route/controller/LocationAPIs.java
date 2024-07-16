package com.jpml.gestion.route.controller;

import com.jpml.gestion.route.app.service.CommentaryManager;
import com.jpml.gestion.route.app.service.LocationManager;
import com.jpml.gestion.route.dto.CommentaryDto;
import com.jpml.gestion.route.dto.LocationDto;
import com.jpml.gestion.route.message.response.ResponseMessage;
import com.jpml.gestion.route.security.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class LocationAPIs {

    @Autowired
    LocationManager locationManager;
    
    @Autowired
    JwtProvider jwtProvider;

    @Autowired
    CommentaryManager commentaryManager;

    @PostMapping("/route/saveCommentary")
    public ResponseEntity<?> saveLocation(@Valid @RequestBody LocationDto locationDto, long idUser) {
        locationManager.saveLocation(locationDto, idUser);
        return new ResponseEntity<>(new ResponseMessage("Location registered successfully!"), HttpStatus.OK);
    }
    @GetMapping("/route/findAllLocationForUser/{idUser}")
    public List<LocationDto> findAllLocationForUser(@PathVariable Long idUser) {
       return locationManager.findAllLocationForUser(idUser);
    }
    @GetMapping("/route/findLocationById/{idLocation}")
    public LocationDto findLocationById(@PathVariable Long idLocation) {
        return locationManager.findLocationById(idLocation);
    }
    @PostMapping(value = "/route/{idUser}")
    public void saveRoute(@RequestBody LocationDto locationDto, @PathVariable("idUser") Long idUser) {
        System.out.println("Recibida solicitud para guardar la ruta");
        locationManager.saveLocation(locationDto, idUser);
    }
    @DeleteMapping("/route/deleteLocation/{idLocation}")
    public ResponseEntity<?> deleteLocation(@PathVariable("idLocation") Long idLocation) {
        locationManager.deleteLocation(idLocation);
        return new ResponseEntity<>(new ResponseMessage("Location deleted successfully!"), HttpStatus.OK);
    }
    @GetMapping("/route/findAllLocation")
    public List<LocationDto> findAllLocation() {
        return locationManager.findAllLocation();
    }

    @PostMapping("/route/addFavoriteLocation/{idUser}/{idLocation}")
    public ResponseEntity<?> addFavoriteRoute(@PathVariable("idUser") Long idUser, @PathVariable("idLocation") Long idLocation) {
        locationManager.addFavoriteLocation(idUser, idLocation);
        return new ResponseEntity<>(new ResponseMessage("Location added successfully!"), HttpStatus.OK);
    }
    @DeleteMapping("/route/removeFavoriteLocation/{idUser}/{idLocation}")
    public ResponseEntity<?> removeFavoriteRoute(@PathVariable("idUser") Long idUser, @PathVariable("idLocation") Long idLocation) {
        locationManager.removeFavoriteLocation(idUser, idLocation);
        return new ResponseEntity<>(new ResponseMessage("Location added successfully!"), HttpStatus.OK);
    }
    @PutMapping("/route/saveCommentary/{idUser}/{idLocation}")
    public ResponseEntity<?> registerCommentary(@Valid @RequestBody CommentaryDto commentaryDto, @PathVariable("idUser") Long idUser, @PathVariable("idLocation") Long idLocation) {
        commentaryManager.saveCommentary(commentaryDto, idLocation, idUser);
        return new ResponseEntity<>(new ResponseMessage("Commentary registered successfully!"), HttpStatus.OK);
    }
    @GetMapping("/route/findUserFavorites/{idUser}")
    public List<LocationDto> findUserFavorites(@PathVariable("idUser") Long idUser) {
        return locationManager.findUserFavorites(idUser);
    }
}
