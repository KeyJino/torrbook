package by.intexsoft.kova.controller;

import by.intexsoft.kova.service.impl.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("qiwi")
@Slf4j
public class AuthController {
    @Autowired
    UserService userService;

    @GetMapping
    public by.intexsoft.kova.entity.User getAuthorize(Authentication authentication) {
        log.info("Get authenticated user for front");
        return userService.findByUsername(((User) authentication.getPrincipal()).getUsername());
    }
}
