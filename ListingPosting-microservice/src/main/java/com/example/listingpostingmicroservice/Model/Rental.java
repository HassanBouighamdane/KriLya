package com.example.listingpostingmicroservice.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Getter;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
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
    private boolean available;
    @Getter
    private String location;
    @Getter
    private List<Binary> pictures;
    @Getter
    private Date date;
    @Getter
    private String ownerId;
    @Getter
    private List<String> categoryIds;


    public Rental(String title, String description, double pricePerDay, boolean availability, String location,List<Binary> pictures, String ownerId, List<String> categoryIds) {
        this.title = title;
        this.description = description;
        this.pricePerDay = pricePerDay;
        this.available = availability;
        this.location = location;
        this.pictures = pictures;
        this.ownerId = ownerId;
        this.categoryIds = categoryIds;
        this.date = new Date();
    }

    public Rental(String title,String description, double pricePerDay, boolean availability, String location,List<Binary> pictures) {
        this.title = title;
        this.description = description;
        this.pricePerDay = pricePerDay;
        this.available = availability;
        this.location = location;
        this.pictures = pictures;
        this.date = new Date();
    }
}