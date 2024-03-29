package com.example.listingpostingmicroservice.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
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
    @Indexed
    private String title;
    private String description;
    private double pricePerDay;
    private boolean available;
    private String location;
    private List<Binary> pictures;
    private Date date;
    @Indexed
    private String ownerId;
    @Indexed
    private List<String> categoryIds;

    public Rental(String title,String description, double pricePerDay, boolean availability, String location,List<Binary> pictures,String ownerId,List<String> categoryIds) {
        this.title = title;
        this.description = description;
        this.pricePerDay = pricePerDay;
        this.available = availability;
        this.location = location;
        this.pictures = pictures;
        this.ownerId=ownerId;
        this.date = new Date();
        this.categoryIds=categoryIds;
    }
}