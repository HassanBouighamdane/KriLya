package com.example.listingpostingmicroservice.Service;

import com.example.listingpostingmicroservice.Model.Rental;
import com.example.listingpostingmicroservice.Repository.RentalRepository;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

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

    public Rental createRental(String title,String description, double pricePerDay, boolean availability, String location, MultipartFile[] pictures) throws Exception {
        List<Binary> pictureDataList = convertMultipartFilesToBinaries(pictures);
        Rental rental = new Rental(title,description, pricePerDay, availability, location, pictureDataList);
        return rentalRepository.save(rental);
    }


    public Rental updateRental(String id, Rental rental) {
        return rentalRepository.save(rental);
    }

    public void deleteRental(String id) {
        rentalRepository.deleteById(id);
    }

    private List<Binary> convertMultipartFilesToBinaries(MultipartFile[] files) throws IOException {
        List<Binary> binaries = new ArrayList<>();
        for (MultipartFile file : files) {
            binaries.add(new Binary(file.getBytes()));
        }
        return binaries;
    }
    //

    public List<Rental> searchByCategory(String category, String sortBy, String sortOrder) {
        List<Rental> rentals = getAllRentals();
        Comparator<Rental> comparator = getComparator(sortBy, sortOrder);
        return rentals.stream()
                .filter(rental -> rental.getCategoryIds().contains(category))
                .sorted(comparator)
                .collect(Collectors.toList());
    }

    public List<Rental> searchByTitle(String title, String sortBy, String sortOrder) {
        List<Rental> rentals = getAllRentals();
        Comparator<Rental> comparator = getComparator(sortBy, sortOrder);
        return rentals.stream()
                .filter(rental -> rental.getTitle().equalsIgnoreCase(title))
                .sorted(comparator)
                .collect(Collectors.toList());
    }

    public List<Rental> searchByCategoryAndTitle(String category, String title, String sortBy, String sortOrder) {
        List<Rental> rentalsByCategory = searchByCategory(category, sortBy, sortOrder);
        List<Rental> rentalsByTitle = searchByTitle(title, sortBy, sortOrder);
        rentalsByCategory.retainAll(rentalsByTitle);
        return rentalsByCategory;
    }


    private Comparator<Rental> getComparator(String sortBy, String sortOrder) {
        Comparator<Rental> comparator = switch (sortBy.toLowerCase()) {
            case "title" -> Comparator.comparing(Rental::getTitle);
            case "price" -> Comparator.comparing(Rental::getPricePerDay);
            default -> Comparator.comparing(Rental::getTitle); // Add a break statement here
        };
        if (sortOrder.equalsIgnoreCase("desc")) {
            comparator = comparator.reversed();
        }
        return comparator; // Return the comparator outside the switch statement
    }
}