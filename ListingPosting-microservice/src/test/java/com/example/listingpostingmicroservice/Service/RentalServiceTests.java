package com.example.listingpostingmicroservice.Service;


import com.example.listingpostingmicroservice.Model.Rental;
import com.example.listingpostingmicroservice.Repository.RentalRepository;
import org.bson.types.Binary;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class RentalServiceTests {
    @Mock
    private RentalRepository rentalRepository;
    @InjectMocks
    private RentalService rentalService;
/*
    @Test
    void createRentalTests() throws IOException {
        String title = "Title";
        String description = "Description";
        double pricePerDay = 100.0;
        boolean available = false;
        String location = "Location";
        MultipartFile[] mockPictures = {};
        Binary picture1 = new Binary("Image 1".getBytes());
        Binary picture2 = new Binary("Image 2".getBytes());
        List<Binary> mockBinaryList =Arrays.asList(picture1, picture2);

        Rental rental = new Rental(title, description, pricePerDay, available, location, mockBinaryList);

        when(rentalService.convertMultipartFilesToBinaries(mockPictures)).thenReturn(mockBinaryList);
        when(rentalRepository.save(any(Rental.class))).thenReturn(rental);

        Rental result = rentalService.createRental(title, description, pricePerDay, available, location, mockPictures);

        // Assertions
        assertNotNull(result);
        assertEquals(title, result.getTitle());
        assertEquals(description, result.getDescription());
        assertEquals(pricePerDay, result.getPricePerDay());
        assertEquals(available, result.isAvailable());
        assertEquals(location, result.getLocation());
        assertEquals(mockBinaryList, result.getPictures());
        assertEquals(pricePerDay, result.getPricePerDay());
    }
*/
    @Test
    void getAllRentalsTests(){
        Binary picture1 = new Binary("Image 1".getBytes());
        Binary picture2 = new Binary("Image 2".getBytes());
        List<Binary> pictures = Arrays.asList(picture1, picture2);

        Rental rental1 = new Rental("Title 1", "Description 1", 100.0, true, "Location 1", pictures, "OwnerId1", Arrays.asList("categoryId1", "categoryId2"));
        Rental rental2 = new Rental("Title 2", "Description 2", 200.0, true, "Location 2", pictures, "OwnerId2", Arrays.asList("categoryId1", "categoryId2"));

        List<Rental> rentals=new ArrayList<>();
        rentals.add(rental1);
        rentals.add(rental2);

        when(rentalRepository.findAll()).thenReturn(rentals);
        List<Rental> result = rentalService.getAllRentals();

        assertEquals(rentals.size(), result.size());
        assertEquals(rental1, result.get(0));
        assertEquals(rental2, result.get(1));
    }

    @Test
    void getRentalByIdTests(){
        Binary picture1 = new Binary("Image 1".getBytes());
        Binary picture2 = new Binary("Image 2".getBytes());
        List<Binary> pictures = Arrays.asList(picture1, picture2);
        Rental rental = new Rental("Title", "Description", 100.0, true, "Location", pictures, "OwnerId", Arrays.asList("categoryId1", "categoryId2"));
        Optional<Rental> optionalRental=Optional.of(rental);
        when(rentalRepository.findById(rental.getId())).thenReturn(optionalRental);

        Optional<Rental> result=rentalService.getRentalById(rental.getId());

        assertFalse(optionalRental.isEmpty());
        assertEquals(optionalRental, result);
        assertEquals(optionalRental.get(), rental);
        assertEquals(optionalRental.get().getId(), rental.getId());
        assertEquals(optionalRental.get().getTitle(), rental.getTitle());
        assertEquals(optionalRental.get().getDescription(), rental.getDescription());
        assertEquals(optionalRental.get().getLocation(), rental.getLocation());
        assertEquals(optionalRental.get().getPictures(), rental.getPictures());
        assertTrue(optionalRental.get().isAvailable());
    }



    @Test
    void updateRentalTests(){
        Binary picture1 = new Binary("Image 1".getBytes());
        Binary picture2 = new Binary("Image 2".getBytes());
        List<Binary> pictures = Arrays.asList(picture1, picture2);
        Rental rental = new Rental("Title", "Description", 100.0, true, "Location", pictures, "OwnerId", Arrays.asList("categoryId1", "categoryId2"));
        Optional<Rental> optionalRental=Optional.of(rental);

    }
    @Disabled
    @Test
    void updateRental_BasicUpdate() {

        Rental existingRental = new Rental("Title", "Description", 100.0, true, "Location", null, null, null);
        String rentalId = "1";
        existingRental.setId(rentalId);

        when(rentalRepository.findById(rentalId)).thenReturn(Optional.of(existingRental));

        Rental rentalUpdates = new Rental();
        rentalUpdates.setTitle("Updated Title");
        rentalUpdates.setDescription("Updated Description");
        rentalUpdates.setPricePerDay(200.0);
        rentalUpdates.setAvailable(false);
        rentalUpdates.setLocation("Updated Location");


        Rental updatedRental = rentalService.updateRental(rentalId, rentalUpdates);

        // Assertions
        assertNotNull(updatedRental);
        assertEquals(rentalUpdates.getTitle(), updatedRental.getTitle());
        assertEquals(rentalUpdates.getDescription(), updatedRental.getDescription());
        assertEquals(rentalUpdates.getPricePerDay(), updatedRental.getPricePerDay());
        assertEquals(rentalUpdates.isAvailable(), updatedRental.isAvailable());
        assertEquals(rentalUpdates.getLocation(), updatedRental.getLocation());
    }
    @Disabled
    @Test
    void updateRental_NoUpdate() {
        Rental existingRental = new Rental("Title", "Description", 100.0, true, "Location", null, null, null);
        String rentalId = "1";
        existingRental.setId(rentalId);

        when(rentalRepository.findById(rentalId)).thenReturn(Optional.of(existingRental));

        Rental rentalUpdates = new Rental();

        Rental updatedRental = rentalService.updateRental(rentalId, rentalUpdates);
        assertNotNull(updatedRental);
        assertEquals(existingRental, updatedRental);
    }

    @Test
    void deleteRental_ValidId() {
        String rentalId = "1";
        rentalService.deleteRental(rentalId);
        verify(rentalRepository, Mockito.times(1)).deleteById(rentalId);
    }

}
