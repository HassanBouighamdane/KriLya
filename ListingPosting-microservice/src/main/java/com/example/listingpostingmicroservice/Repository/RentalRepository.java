package com.example.listingpostingmicroservice.Repository;

import com.example.listingpostingmicroservice.Model.Rental;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RentalRepository extends MongoRepository<Rental, String>, PagingAndSortingRepository<Rental,String> {

}