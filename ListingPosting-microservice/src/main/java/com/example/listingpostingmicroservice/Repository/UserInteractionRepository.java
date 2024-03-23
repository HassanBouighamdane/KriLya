package com.example.listingpostingmicroservice.Repository;

import com.example.listingpostingmicroservice.Model.UserInteraction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserInteractionRepository extends MongoRepository<UserInteraction, String> {
    // Add custom query methods if needed
}
