package com.example.listingpostingmicroservice.Service;

import com.example.listingpostingmicroservice.Model.UserInteraction;
import com.example.listingpostingmicroservice.Repository.UserInteractionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserInteractionService {

    private final UserInteractionRepository userInteractionRepository;

    @Autowired
    public UserInteractionService(UserInteractionRepository userInteractionRepository) {
        this.userInteractionRepository = userInteractionRepository;
    }

    public void logUserInteraction(/*String userId,*/ String itemId, String interactionType) {
        UserInteraction userInteraction = new UserInteraction(/*userId,*/ itemId, interactionType, LocalDateTime.now());
        userInteractionRepository.save(userInteraction);
    }
}
