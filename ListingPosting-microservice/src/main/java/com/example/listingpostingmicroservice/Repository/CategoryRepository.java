package com.example.listingpostingmicroservice.Repository;

import com.example.listingpostingmicroservice.Model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CategoryRepository extends MongoRepository<Category,String> {
    List<Category> findCategoriesByNameContainingIgnoreCase(String text);
}
