package com.example.listingpostingmicroservice.Service;

import com.example.listingpostingmicroservice.Model.Rental;
import com.example.listingpostingmicroservice.Repository.RentalRepository;
import com.example.listingpostingmicroservice.Service.Interfaces.RentalService;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class RentalServiceImp implements RentalService {

    private final RentalRepository rentalRepository;
    @Autowired
    public RentalServiceImp(RentalRepository rentalRepository) {
        this.rentalRepository = rentalRepository;
    }
    //CRUD Operations
    public List<Rental> getAllRentals() {
        return rentalRepository.findAll();
    }
    public List<Rental> getAllRentals(int pageNo,int pageSize,String sortBy) {
        Pageable paging =PageRequest.of(pageNo,pageSize, Sort.by(sortBy));
        Page<Rental> pageResult=rentalRepository.findAll(paging);
        return pageResult.getContent();
    }
    public Optional<Rental> getRentalById(String id) {
        return rentalRepository.findById(id);
    }
    public Rental createRental(String title, String description, double pricePerDay, boolean availability, String location, MultipartFile[] pictures) throws IOException {
        List<Binary> pictureDataList = null;
        if (pictures != null && pictures.length > 0) {
            pictureDataList = convertMultipartFilesToBinaries(pictures);
        }
        Rental rental = new Rental(title, description, pricePerDay, availability, location, pictureDataList);
        return rentalRepository.save(rental);
    }
    public Rental updateRental(String id, Rental rentalUpdates) {
        Optional<Rental> optionalRental = rentalRepository.findById(id);
        if (optionalRental.isPresent()) {
            Rental existingRental = optionalRental.get();
            // Update only the fields that are provided in rentalUpdates
            if (rentalUpdates.getTitle() != null && !rentalUpdates.getTitle().equals(existingRental.getTitle())) {
                existingRental.setTitle(rentalUpdates.getTitle());
            }
            if (rentalUpdates.getDescription() != null && !rentalUpdates.getDescription().equals(existingRental.getDescription())) {
                existingRental.setDescription(rentalUpdates.getDescription());
            }
            if (rentalUpdates.getPricePerDay() != 0 && rentalUpdates.getPricePerDay()!=existingRental.getPricePerDay()) {
                existingRental.setPricePerDay(rentalUpdates.getPricePerDay());
            }
            if (rentalUpdates.isAvailable() != existingRental.isAvailable()) {
                existingRental.setAvailable(rentalUpdates.isAvailable());
            }
            if (rentalUpdates.getLocation() != null && !rentalUpdates.getLocation().equals(existingRental.getLocation())) {
                existingRental.setLocation(rentalUpdates.getLocation());
            }

            // Save the updated rental
            return rentalRepository.save(existingRental);
        } else {
            // Handle case when rental with given id is not found
            return null;
        }
    }
    public void deleteRental(String id) {
        rentalRepository.deleteById(id);
    }
    //pagination and Sorting


    public List<Binary> convertMultipartFilesToBinaries(MultipartFile[] files) throws IOException {
        List<Binary> binaries = new ArrayList<>();
        for (MultipartFile file : files) {
            binaries.add(new Binary(file.getBytes()));
        }
        return binaries;
    }

    public List<Rental> dynamicSearch(String query, SearchCriteria criteria, int pageNo, int pageSize, String sortBy) {
        Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));

        return switch (criteria) {
            case TITLE -> rentalRepository.findRentalByTitleContainingIgnoreCase(query, pageable).getContent();
            case DESCRIPTION ->
                    rentalRepository.findRentalByDescriptionContainingIgnoreCase(query, pageable).getContent();
            case LOCATION -> rentalRepository.findRentalByLocationContainingIgnoreCase(query, pageable).getContent();
            case PRICE_PER_DAY_GREATER_THAN_EQUAL -> {
                double pricePerDayGTE = Double.parseDouble(query);
                yield rentalRepository.findRentalByPricePerDayGreaterThanEqual(pricePerDayGTE, pageable).getContent();
            }
            case PRICE_PER_DAY_LESS_THAN_EQUAL -> {
                double pricePerDayLTE = Double.parseDouble(query);
                yield rentalRepository.findRentalByPricePerDayLessThanEqual(pricePerDayLTE, pageable).getContent();
            }
            case DATE_AFTER -> {
                Date dateAfter = new Date(Long.parseLong(query));
                yield rentalRepository.findRentalByDateAfter(dateAfter, pageable).getContent();
            }
            case DATE_BEFORE -> {
                Date dateBefore = new Date(Long.parseLong(query));
                yield rentalRepository.findRentalByDateBefore(dateBefore, pageable).getContent();
            }
            default -> throw new IllegalArgumentException("Invalid search criteria: " + criteria);
        };
    }
    //
/*
    public List<Rental> searchRentals(String searchText){
        return rentalRepository.findRentalBySearchText(searchText);
    }
/*
    public List<Rental> searchByCategory(String category, String sortBy, String sortOrder)  {
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
    }*/
}