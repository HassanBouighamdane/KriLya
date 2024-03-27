package com.example.usermanagementmicroservice.controllers;

import com.example.usermanagementmicroservice.models.Profile;
import com.example.usermanagementmicroservice.services.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users/profiles")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfileController {

    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping
    public ResponseEntity<Profile> createProfile(@RequestBody Profile profile) {
        Profile newProfile = profileService.createProfile(profile);
        return new ResponseEntity<>(newProfile, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profile> getProfileById(@PathVariable("id") String id) {
        Optional<Profile> profileOptional = profileService.getProfileById(id);
        return profileOptional.map(profile -> new ResponseEntity<>(profile, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/{profileId}/image")
    public ResponseEntity<byte[]> getProfileImage(@PathVariable String profileId) {
        Optional<Profile> profileOptional = profileService.getProfileById(profileId);
        if (profileOptional.isPresent()) {
            Profile profile = profileOptional.get();
            byte[] imageBytes = profile.getPicture().getBytes(); // Assuming profile.getPicture() returns the byte array of the picture
            if (imageBytes != null) {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.IMAGE_JPEG);
                return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new byte[0], HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(new byte[0], HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<Profile>> getAllProfiles() {
        List<Profile> profiles = profileService.getAllProfiles();
        return new ResponseEntity<>(profiles, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Profile> updateProfile(@PathVariable String id,
                                                 @RequestPart("profile") Profile profile,
                                                 @RequestPart("picture") MultipartFile picture) {
        try {
            Profile updatedProfile = profileService.updateProfile(id, profile, picture);
            return new ResponseEntity<>(updatedProfile, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // @PutMapping("/{id}")
    // public ResponseEntity<Profile> updateProfile(@PathVariable("id") String id, @RequestBody Profile updatedProfile) {
    //     Profile updated = profileService.updateProfile(id, updatedProfile);
    //     return updated != null ? new ResponseEntity<>(updated, HttpStatus.OK)
    //             : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    // }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable("id") String id) {
        profileService.deleteProfileById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
