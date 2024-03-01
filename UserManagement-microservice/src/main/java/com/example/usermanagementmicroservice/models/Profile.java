package com.example.usermanagementmicroservice.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "profile")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String bio;

    private String phone;

    private String firstName;

    private String lastName;

    private String picture;

    private String location;

    private String status;

    private String rating;

    private String responseRate;

    private String gender;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

   

    public double calculateProfileCompleteness() {
        int totalFields = 8; 
        int completedFields = 0;
        if (username != null && !username.isEmpty()) completedFields++;
        if (firstName != null && !firstName.isEmpty()) completedFields++;
        if (lastName != null && !lastName.isEmpty()) completedFields++;
        if (bio != null && !bio.isEmpty()) completedFields++;
        if (picture != null && !picture.isEmpty()) completedFields++;
        if (location != null && !location.isEmpty()) completedFields++;
        if (status != null && !status.isEmpty()) completedFields++;
        if (gender != null && !gender.isEmpty()) completedFields++;
        return (double) completedFields / totalFields * 100;
    }
    

    
}
