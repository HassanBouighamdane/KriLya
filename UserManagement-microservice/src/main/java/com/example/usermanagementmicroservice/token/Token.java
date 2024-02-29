package com.example.usermanagementmicroservice.token;


import com.example.usermanagementmicroservice.models.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Token {
    @Id
    @GeneratedValue
    private Integer id;

    private String token;

    @Enumerated(EnumType.STRING)
    private TokenType tokenType;

    private  boolean expired;

    private boolean revoked;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
}
