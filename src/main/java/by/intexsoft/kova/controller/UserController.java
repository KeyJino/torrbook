package by.intexsoft.kova.controller;

import by.intexsoft.kova.entity.User;
import by.intexsoft.kova.service.IUserService;
import by.intexsoft.kova.service.impl.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for working with user
 */
@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    private final IUserService userService;

    /**
     * Default constructor
     */
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Get all users
     */
    @GetMapping
    public org.springframework.security.core.userdetails.User getAuthorize(Authentication authentication) {
        return (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
    }

    /**
     * Add new user and returns saved object
     */
    @PostMapping
    public User create(@RequestBody User user) {
        return userService.save(user);
    }
}
