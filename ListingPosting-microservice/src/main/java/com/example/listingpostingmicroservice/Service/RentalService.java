package com.example.listingpostingmicroservice.Service;

import com.example.listingpostingmicroservice.Model.Rental;
import com.example.listingpostingmicroservice.Repository.RentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RentalService {

    @Autowired
    private RentalRepository rentalRepository;

    public List<Rental> getAllRentals() {
        return rentalRepository.findAll();
    }

    public Optional<Rental> getRentalById(String id) {
        return rentalRepository.findById(id);
    }

    public Rental createRental(Rental rental) {
        return rentalRepository.save(rental);
    }

    public Rental updateRental(String id, Rental rental) {
        return rentalRepository.save(rental);
    }

    public void deleteRental(String id) {
        rentalRepository.deleteById(id);
    }
}