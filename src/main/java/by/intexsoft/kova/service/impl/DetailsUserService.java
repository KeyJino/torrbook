package by.intexsoft.kova.service.impl;

import by.intexsoft.kova.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

/**
 * Implements UserDetailsService which downloading user's information.
 */
@Slf4j
@Service
public class DetailsUserService implements UserDetailsService {

    @Autowired
    private UserService userService;

    /**
     * Download user by username.
     *
     * @param username which using for searching.
     * @return userdetails.User.
     * @throws UsernameNotFoundException if username dont finding.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.findByUsername(username);
        Set<GrantedAuthority> roles = new HashSet<>();
        roles.add(new SimpleGrantedAuthority(user.role.title));
        return new org.springframework.security.core.userdetails.User(user.username,
                user.password,
                roles);
    }
}
