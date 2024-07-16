package com.jpml.gestion.route.app.service;

import com.jpml.gestion.route.dto.CommentaryDto;
import org.springframework.stereotype.Service;

@Service
public interface CommentaryManager {

    CommentaryDto saveCommentary(CommentaryDto commentaryDto, Long idLocation, Long idUser);
}
