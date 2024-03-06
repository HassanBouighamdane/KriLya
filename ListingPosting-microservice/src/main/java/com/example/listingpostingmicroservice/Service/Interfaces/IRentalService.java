package com.example.listingpostingmicroservice.Service.Interfaces;

import com.example.listingpostingmicroservice.Model.Rental;
import com.example.listingpostingmicroservice.Service.SearchCriteria;
import org.bson.types.Binary;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface IRentalService {
    List<Rental> getAllRentals();
    Page<Rental> getAllRentals(int pageNo, int pageSize, String sortBy);
    Optional<Rental> getRentalById(String id);
    Rental createRental(String title, String description, double pricePerDay, String location, MultipartFile[] pictures,String ownerId,List<String> categoryIds) throws IOException;
    Rental updateRental(String id, Rental rentalUpdates);
    void deleteRental(String id);
    List<Binary> convertMultipartFilesToBinaries(MultipartFile[] files) throws IOException;
    Page<Rental> dynamicSearch(String query, SearchCriteria criteria, int pageNo, int pageSize, String sortBy);
}
