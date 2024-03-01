package com.example.usermanagementmicroservice.authentication;

import com.example.usermanagementmicroservice.models.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {
    private String token ;
    private User user;

}
