package com.jpml.gestion.route.controller;
import java.util.*;
import java.util.List;

import javax.validation.Valid;

import com.jpml.gestion.route.app.service.LocationManager;
import com.jpml.gestion.route.dto.LocationDto;
import com.jpml.gestion.route.message.request.SignUpForm;
import com.jpml.gestion.route.message.request.LoginForm;
import com.jpml.gestion.route.message.response.JwtResponse;
import com.jpml.gestion.route.message.response.ResponseMessage;
import com.jpml.gestion.route.model.Commentary;
import com.jpml.gestion.route.model.Location;
import com.jpml.gestion.route.model.Locations;
import com.jpml.gestion.route.model.User;
import com.jpml.gestion.route.repository.UserRepository;
import com.jpml.gestion.route.security.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api") //TODO
public class AuthRestAPIs {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtProvider jwtProvider;

    @Autowired
    LocationManager locationManager;


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginForm loginRequest, BindingResult result) {

            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateJwtToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        if (result.hasErrors()) {
            return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities()));
        }

        return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpForm signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity<>(new ResponseMessage("The username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        List<Commentary> commentaries = new ArrayList<>();
        List<Location> favoriteLocations = new ArrayList<>();
        // Creating user's account
        User user = new User(signUpRequest.getName(), signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword()), commentaries, favoriteLocations);

        userRepository.save(user);

        return new ResponseEntity<>(new ResponseMessage("User registered successfully!"), HttpStatus.OK);
    }
    @GetMapping("/users/username/{username}")
    public User getUserByUsername(@PathVariable("username") String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user;
        } else {
            return null;
        }

    }
    @GetMapping("/users/id/{id}")
    public Optional<User> getUserById(@PathVariable("id") Long id) {
        return userRepository.findById(id);
    }

    @PutMapping("/users/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") Long userId, @Valid @RequestBody SignUpForm signUpRequest){
        Optional<User> users = userRepository.findById(userId);
        if (users.isPresent()) {
            User user = users.get();
            user.setName(signUpRequest.getName());
            user.setUsername(signUpRequest.getUsername());
   /*         _user.setEmail(user.getEmail());*/
            user.setPassword(encoder.encode(signUpRequest.getPassword()));
            return new ResponseEntity<User>(userRepository.save(user), HttpStatus.OK);
        }
        return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
    }
    @DeleteMapping("/users/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long userId) {
        userRepository.deleteById(userId);
        return new ResponseEntity<String>("User deleted!", HttpStatus.OK);
    }
}
