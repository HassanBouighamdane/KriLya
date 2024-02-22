package com.example.listingpostingmicroservice.Model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "categories")
public record Category(@Id String id,String name,String description) { }