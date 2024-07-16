package com.jpml.gestion.route.app.service;

import com.jpml.gestion.route.dto.CommentaryDto;
import com.jpml.gestion.route.mapper.IMapper;
import com.jpml.gestion.route.model.Commentary;
import com.jpml.gestion.route.model.Location;
import com.jpml.gestion.route.model.User;
import com.jpml.gestion.route.repository.CommentaryRepository;
import com.jpml.gestion.route.repository.LocationRepository;
import com.jpml.gestion.route.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CommentaryManagerImpl implements CommentaryManager {

    @Autowired
    private final IMapper iMapper;

    @Autowired
    private final CommentaryRepository commentaryRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final LocationRepository locationRepository;

    @Autowired
    public CommentaryManagerImpl(IMapper iMapper, CommentaryRepository commentaryRepository, UserRepository userRepository, LocationRepository locationRepository) {
        this.iMapper = iMapper;
        this.commentaryRepository = commentaryRepository;
        this.userRepository = userRepository;
        this.locationRepository = locationRepository;
    }

    @Override
    public CommentaryDto saveCommentary(CommentaryDto commentaryDto, Long idLocation, Long idUser) {
        Commentary commentary = iMapper.toModel(commentaryDto, Commentary.class);
        User user = userRepository.findById(idUser).orElse(null);
        Location location = locationRepository.findById(idUser).orElse(null);
        commentary.setUser(user);
        commentary.setLocation(location);
        return iMapper.toDTO(commentaryRepository.save(commentary), CommentaryDto.class);
    }
}
