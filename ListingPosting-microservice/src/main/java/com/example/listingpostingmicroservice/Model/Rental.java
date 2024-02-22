package com.example.listingpostingmicroservice.Model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Data
@Document(collection = "rentals")
public class Rental {

    @Id
    private String id;
    private String title;
    private String description;
    private double pricePerDay;
    private boolean availability;
    private String location;
    private String pictureUrl;
    private String ownerId; // Assuming ownerId is a reference to the User
    private List<String> categoryIds; // References to Categories


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