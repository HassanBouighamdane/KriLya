package com.example.usermanagementmicroservice.authentication;

import com.example.usermanagementmicroservice.config.JwtService;
import com.example.usermanagementmicroservice.config.UserRegistrationDetails;
import com.example.usermanagementmicroservice.models.Role;
import com.example.usermanagementmicroservice.models.User;
import com.example.usermanagementmicroservice.repository.UserRepository;
import com.example.usermanagementmicroservice.token.Token;
import com.example.usermanagementmicroservice.token.TokenRepository;
import com.example.usermanagementmicroservice.token.TokenType;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService ;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) throws Exception {
        if (repository.existsByEmail(request.getEmail()) || repository.existsByUsername(request.getUsername())) {
            throw new Exception("Email or Username is already in use");
        }

        var user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        var savedUser = repository.save(user);
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        saveUserToken(savedUser, jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .user(user)
                .build();
    }
    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllvalidTokensByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }
    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .revoked(false)
                .expired(false)
                .build();
        tokenRepository.save(token);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user =repository.findByEmail(request.getEmail());
        UserDetails userDetails = new UserRegistrationDetails(user);
        var jwtToken = jwtService.generateToken(userDetails);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .id(user.getId())
                .build();
    }
}
