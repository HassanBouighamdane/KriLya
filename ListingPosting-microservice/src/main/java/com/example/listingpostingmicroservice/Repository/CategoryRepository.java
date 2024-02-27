package com.example.listingpostingmicroservice.Repository;

import com.example.listingpostingmicroservice.Model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category,String> {
}
