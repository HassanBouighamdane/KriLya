package com.example.listingpostingmicroservice.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "user_interactions")
public class UserInteraction {

    @Id
    private String id;
    //private String userId;
    @Indexed
    private String itemId;
    @Indexed
    private String interactionType;
    private LocalDateTime timestamp;

    public UserInteraction(/*String userId,*/String itemId, String interactionType, LocalDateTime timestamp) {
        //this.userId = userId;
        this.itemId = itemId;
        this.interactionType = interactionType;
        this.timestamp = timestamp;
    }


}
