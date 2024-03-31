package com.example.listingpostingmicroservice.Controller;

import com.example.listingpostingmicroservice.Model.Rental;
import com.example.listingpostingmicroservice.Model.UserInteraction;

import com.example.listingpostingmicroservice.Service.Interfaces.IRentalService;
import com.example.listingpostingmicroservice.Service.RentalService;
import com.example.listingpostingmicroservice.Service.SearchCriteria;
import com.example.listingpostingmicroservice.Service.UserInteractionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/postes/rentals")
public class RentalController {


    private final UserInteractionService userInteractionService;
    private final IRentalService rentalService;

    @Autowired
    public RentalController(UserInteractionService userInteractionService, RentalService rentalService) {
        this.userInteractionService = userInteractionService;
        this.rentalService = rentalService;
    }

    @PostMapping("/logUserInteraction")
    public ResponseEntity<?> logUserInteraction(@RequestBody UserInteraction userInteractionRequest) {
        //String userId = userInteractionRequest.getUserId();
        String itemId = userInteractionRequest.getItemId();
        String interactionType = userInteractionRequest.getInteractionType();

        userInteractionService.logUserInteraction(/*userId,*/itemId, interactionType);

        return ResponseEntity.ok().build();
    }


    @PostMapping("/rental")
    public ResponseEntity<?> rentItem(/*@RequestParam String userId,*/ @RequestParam String itemId) {
        // Logic to handle item rental

        // Log the rental interaction
        userInteractionService.logUserInteraction(/*userId,*/itemId, "rental");

        return ResponseEntity.ok().build();
    }



    @GetMapping
    public ResponseEntity<Page<Rental>> getAllRentals(
            @RequestParam (defaultValue = "0") int pageNo,
            @RequestParam (defaultValue = "10") int pageSize,
            @RequestParam (defaultValue = "id") String sortBy) {
        Page<Rental> rentals = rentalService.getAllRentals(pageNo,pageSize,sortBy);
        return new ResponseEntity<>(rentals, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rental> getRentalById(@PathVariable("id") String id) {
        Optional<Rental> rental = rentalService.getRentalById(id);
        return rental.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<Page<Rental>> getRentalsByOwnerId(
            @PathVariable("id") String id,
            @RequestParam (defaultValue = "0") int pageNo,
            @RequestParam (defaultValue = "10") int pageSize,
            @RequestParam (defaultValue = "id") String sortBy) {
        Page<Rental> rentals = rentalService.getRentalsByUserId(id,pageNo,pageSize,sortBy);
        return new ResponseEntity<>(rentals, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Rental> createRental(@RequestParam("title") String title,
                                               @RequestParam("description") String description,
                                               @RequestParam("pricePerDay") double pricePerDay,
                                               @RequestParam("location") String location,
                                                @RequestParam(value = "pictures", required = false) MultipartFile[] pictures,
                                                @RequestParam("categoryIds") List<String> categoryIds,
                                                @RequestParam("ownerId") String ownerId) {
        try {
            Rental rental = rentalService.createRental(title,description, pricePerDay, location, pictures,ownerId,categoryIds);
            return new ResponseEntity<>(rental, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
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

    @GetMapping("/search")
    public ResponseEntity<Page<Rental>> dynamicSearch(
            @RequestParam String query,
            @RequestParam SearchCriteria criteria,
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "id") String sortBy) {

        Page<Rental> result = rentalService.dynamicSearch(query, criteria, pageNo, pageSize, sortBy);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
/*
    @GetMapping("/search")
    public ResponseEntity<List<Rental>> searchRentals(@RequestParam String searchText){
        List<Rental> foundRentals=rentalService.searchRentals(searchText);
        if(!foundRentals.isEmpty()) {
            return new ResponseEntity<>(foundRentals, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }
/*
    //search by category , title && sorting
    @GetMapping("/search")
    public ResponseEntity<List<Rental>> searchRentals(
            @RequestParam(name = "category", required = false) String category,
            @RequestParam(name = "title", required = false) String title,
            @RequestParam(name = "sortBy", defaultValue = "title") String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = "asc") String sortOrder
    ) {
        List<Rental> rentals;
        if (category != null && title != null) {
            rentals = rentalService.searchByCategoryAndTitle(category, title, sortBy, sortOrder);
        } else if (category != null) {
            rentals = rentalService.searchByCategory(category, sortBy, sortOrder);
        } else if (title != null) {
            rentals = rentalService.searchByTitle(title, sortBy, sortOrder);
        } else {
            return ResponseEntity.badRequest().build();
        }
        return new ResponseEntity<>(rentals, HttpStatus.OK);
    }
*/
}