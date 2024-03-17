package com.example.usermanagementmicroservice.config;





import com.example.usermanagementmicroservice.models.User;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;

import org.springframework.security.core.userdetails.UserDetails;


import java.util.Collection;
import java.util.List;

@Data
public class UserRegistrationDetails implements UserDetails{
    private String username;
    private String password;
    private List<GrantedAuthority> authorities;

    public UserRegistrationDetails(User personne) {
        this.username = personne.getEmail();
        this.password = personne.getPassword();
        /* List<GrantedAuthority> authorityList = Arrays.stream(personne.getType().toString().split(""))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());*/
     /*   List<GrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority(personne.getType().toString()));
        this.authorities = authorityList;
    */
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
