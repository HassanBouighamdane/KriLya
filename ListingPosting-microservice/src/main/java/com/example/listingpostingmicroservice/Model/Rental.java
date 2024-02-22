package com.example.listingpostingmicroservice.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Data

@Document(collection = "rentals")
public class Rental {

    @Id
    private String id;
    @Getter
    private String title;
    @Getter
    private String description;
    @Getter
    private double pricePerDay;
    @Getter
    private boolean availability;
    @Getter
    private String location;
    @Getter
    private String pictureUrl;
    @Getter
    private String ownerId;
    @Getter
    private List<String> categoryIds; 


    public Rental(String title, String description, double pricePerDay, boolean availability, String location,String pictureUrl, String ownerId, List<String> categoryIds) {
        this.title = title;
        this.description = description;
        this.pricePerDay = pricePerDay;
        this.availability = availability;
        this.location = location;
        this.pictureUrl = pictureUrl;
        this.ownerId = ownerId;
        this.categoryIds = categoryIds;
    }

}