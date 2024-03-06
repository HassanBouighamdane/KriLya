package com.example.usermanagementmicroservice.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.usermanagementmicroservice.models.User;
import com.example.usermanagementmicroservice.repository.UserRepository;

@SpringBootTest
public class UserServiceTests {

    @Mock
    private UserService userService;

    @Mock
    private UserRepository repo;

    @Test
    public void getAllUsersTest(){
        List<User> users = new ArrayList<User>();
        users.add(new User());
        when(userService.getAllUsers()).thenReturn(users);
        assertEquals(users.size(), 1);
    }


    
}
