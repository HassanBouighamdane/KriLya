package com.example.listingpostingmicroservice.Service;

import com.example.listingpostingmicroservice.Model.Rental;
import com.example.listingpostingmicroservice.Repository.RentalRepository;
import com.example.listingpostingmicroservice.Service.Interfaces.RentalService;
import org.bson.types.Binary;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RentalServiceImpTest {

    @Mock
    private RentalRepository rentalRepository;

    @InjectMocks
    private RentalService rentalService = new RentalServiceImp(rentalRepository);

    private Rental rental1;
    private Rental rental2;
    private List<Rental> rentalList;

    @BeforeEach
    public void setUp() {
        rental1 = new Rental( "Title 1", "Description 1", 100.0, true, "Location 1", new ArrayList<>(),"1", new ArrayList<>());
        rental2 = new Rental("Title 2", "Description 2", 200.0, false, "Location 2", new ArrayList<>(),"2", new ArrayList<>());
        rentalList = new ArrayList<>();
        rentalList.add(rental1);
        rentalList.add(rental2);
    }


    @Test
    public void testGetAllRentals() {
        when(rentalRepository.findAll()).thenReturn(rentalList);
        List<Rental> result = rentalService.getAllRentals();
        assertEquals(rentalList, result);
    }

    @Test
    public void testGetAllRentalsWithPaginationAndSorting() {
        Pageable pageable = PageRequest.of(0, 10, Sort.by("title"));
        when(rentalRepository.findAll(pageable)).thenReturn(new PageImpl<>(rentalList));
        List<Rental> result = rentalService.getAllRentals(0, 10, "title");
        assertEquals(rentalList, result);
    }

    @Test
    public void testGetRentalById() {
        String id = "1";
        when(rentalRepository.findById(id)).thenReturn(Optional.of(rental1));
        Optional<Rental> result = rentalService.getRentalById(id);
        assertEquals(rental1, result.orElse(null));
    }

    @Test
    public void testCreateRental() throws Exception {
        MultipartFile[] pictures = null;
        when(rentalRepository.save(any())).thenReturn(rental1);
        Rental result = rentalService.createRental("Title", "Description", 100.0, true, "Location", pictures);
        assertEquals(rental1, result);
    }

    @Test
    public void testUpdateRental() {
        String id = "1";
        Rental rentalUpdates = new Rental("Updated Title", "Updated Description", 150.0, false, "Updated Location", null);
        when(rentalRepository.findById(id)).thenReturn(Optional.of(rental1));
        when(rentalRepository.save(any())).thenReturn(rentalUpdates);
        Rental result = rentalService.updateRental(id, rentalUpdates);
        assertEquals(rentalUpdates, result);
    }

    @Test
    public void testDeleteRental() {
        String id = "1";
        rentalService.deleteRental(id);
        verify(rentalRepository, times(1)).deleteById(id);
    }
}
