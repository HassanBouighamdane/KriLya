package com.example.listingpostingmicroservice.Repository;

import com.example.listingpostingmicroservice.Model.Rental;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;


@Repository
public interface RentalRepository extends MongoRepository<Rental, String>{
    Page<Rental> findRentalByTitleContainingIgnoreCase(String title, Pageable pageable);
    Page<Rental> findRentalByDescriptionContainingIgnoreCase(String description,Pageable pageable);
    Page<Rental> findRentalByLocationContainingIgnoreCase(String location,Pageable pageable);
    Page<Rental> findRentalByPricePerDayGreaterThanEqual(double pricePerDay,Pageable pageable);
    Page<Rental> findRentalByPricePerDayLessThanEqual(double pricePerDay,Pageable pageable);
    Page<Rental> findRentalByDateAfter(Date date,Pageable pageable);
    Page<Rental> findRentalByDateBefore(Date date,Pageable pageable);
    Page<Rental> findRentalsByOwnerId(String ownerId,Pageable pageable);

}