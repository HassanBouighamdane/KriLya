package com.example.listingpostingmicroservice.Controller;

import com.example.listingpostingmicroservice.Model.Rental;
import com.example.listingpostingmicroservice.Service.RentalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rentals")
public class RentalController {

    @Autowired
    private RentalService rentalService;

    @GetMapping
    public ResponseEntity<List<Rental>> getAllRentals() {
        List<Rental> rentals = rentalService.getAllRentals();
        return new ResponseEntity<>(rentals, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rental> getRentalById(@PathVariable("id") String id) {
        Optional<Rental> rental = rentalService.getRentalById(id);
        return rental.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Rental> createRental(@RequestBody Rental rental) {
        Rental createdRental = rentalService.createRental(rental);
        return new ResponseEntity<>(createdRental, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Rental> updateRental(@PathVariable("id") String id, @RequestBody Rental rental) {
        Rental updatedRental = rentalService.updateRental(id, rental);
        return new ResponseEntity<>(updatedRental, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRental(@PathVariable("id") String id) {
        rentalService.deleteRental(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}