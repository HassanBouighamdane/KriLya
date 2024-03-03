package com.example.listingpostingmicroservice.Repository;

import com.example.listingpostingmicroservice.Model.Rental;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentalRepository extends MongoRepository<Rental, String>{
    Page<Rental> findByTitleContaining(String title, Pageable pageable);

   // List<Rental> findRentalBySearchText(String searchText);
}