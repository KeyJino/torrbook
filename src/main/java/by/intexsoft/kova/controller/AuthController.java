package by.intexsoft.kova.controller;

import by.intexsoft.kova.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for check authorize.
 */
@CrossOrigin
@RestController
@RequestMapping("qiwi")
public class AuthController {

    final private
    UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Main method for check authorize.
     *
     * @param authentication input authentication.
     * @return finding {@link User}.
     */
    @GetMapping
    public by.intexsoft.kova.entity.User getAuthorize(Authentication authentication) {
        return userService.findByUsername(((User) authentication.getPrincipal()).getUsername());
    }
}
