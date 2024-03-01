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

    private String firstName;

    private String lastName;

    private String picture;

    private String location;

    private String status;

    private String rating;

    private String responseRate;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // public Profile(Long id, String username) {
    //     this.id = id;
    //     this.username = username;
    // }

    // public Long getId() {
    //     return id;
    // }

    // public void setId(Long id) {
    //     this.id = id;
    // }

    // public String getUsername() {
    //     return username;
    // }

    // public void setUsername(String username) {
    //     this.username = username;
    // }

    // public String getBio() {
    //     return bio;
    // }

    // public void setBio(String bio) {
    //     this.bio = bio;
    // }

    // public String getFirstName() {
    //     return firstName;
    // }

    // public void setFirstName(String firstName) {
    //     this.firstName = firstName;
    // }

    // public String getLastName() {
    //     return lastName;
    // }

    // public void setLastName(String lastName) {
    //     this.lastName = lastName;
    // }

    // public String getPicture() {
    //     return picture;
    // }

    // public void setPicture(String picture) {
    //     this.picture = picture;
    // }

    // public String getLocation() {
    //     return location;
    // }

    // public void setLocation(String location) {
    //     this.location = location;
    // }

    // public String getStatus() {
    //     return status;
    // }

    // public void setStatus(String status) {
    //     this.status = status;
    // }

    // public String getRating() {
    //     return rating;
    // }

    // public void setRating(String rating) {
    //     this.rating = rating;
    // }

    // public String getResponseRate() {
    //     return responseRate;
    // }

    // public void setResponseRate(String responseRate) {
    //     this.responseRate = responseRate;
    // }

    // public User getUser() {
    //     return user;
    // }

    // public void setUser(User user) {
    //     this.user = user;
    // }


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
        if (rating != null && !rating.isEmpty()) completedFields++;
        return (double) completedFields / totalFields * 100;
    }
    

    
}
