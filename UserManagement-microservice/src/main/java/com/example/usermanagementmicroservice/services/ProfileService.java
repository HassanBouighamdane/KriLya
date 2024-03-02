package com.example.usermanagementmicroservice.services;

import com.example.usermanagementmicroservice.models.Profile;
import com.example.usermanagementmicroservice.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;

    @Autowired
    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    public Profile createProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    public Optional<Profile> getProfileById(String id) {
        return profileRepository.findById(id);
    }

    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }

    public Profile updateProfile(String id, Profile updatedProfile) {
        Optional<Profile> existingProfileOptional = profileRepository.findById(id);
        if (existingProfileOptional.isPresent()) {
            Profile existingProfile = existingProfileOptional.get();
            
            if (updatedProfile.getBio() != null) {
                existingProfile.setBio(updatedProfile.getBio());
            }

            if (updatedProfile.getPhone() != null) {
                existingProfile.setPhone(updatedProfile.getPhone());
            }
            
           if (updatedProfile.getFirstName() != null) {
                existingProfile.setFirstName(updatedProfile.getFirstName());
            }
    
            if (updatedProfile.getLastName() != null) {
                existingProfile.setLastName(updatedProfile.getLastName());
            }
    
            if (updatedProfile.getPicture() != null) {
                existingProfile.setPicture(updatedProfile.getPicture());
            }
    
            if (updatedProfile.getLocation() != null) {
                existingProfile.setLocation(updatedProfile.getLocation());
            }
    
            if (updatedProfile.getStatus() != null) {
                existingProfile.setStatus(updatedProfile.getStatus());
            }
    
            if (updatedProfile.getGender() != null) {
                existingProfile.setGender(updatedProfile.getGender());
            }
    
            if (updatedProfile.getResponseRate() != null) {
                existingProfile.setResponseRate(updatedProfile.getResponseRate());
            }
            return profileRepository.save(existingProfile);
        } else {
            return null;
        }
    }

    public void deleteProfileById(String id) {
        profileRepository.deleteById(id);
    }


}
