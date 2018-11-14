package by.intexsoft.kova.controller;

import by.intexsoft.kova.entity.Role;
import by.intexsoft.kova.entity.User;
import by.intexsoft.kova.repository.UserRepository;
import by.intexsoft.kova.service.IUserService;
import by.intexsoft.kova.service.impl.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for working with {@link User}
 */
@CrossOrigin
@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

    private final
    IUserService userService;

    /**
     * Default constructor
     */
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Get all {@link User}.
     *
     * @return List {@link User}.
     */
    @GetMapping("/")
    public List<User> getAll() {
        return userService.findAll();
    }

    /**
     * Getting {@link User}'s {@link Role}
     *
     * @return {@link User} role.
     */
    @GetMapping("/role")
    public String getRoleTitle() {
        return userService.findById(1).role.title;
    }

    /**
     * Creating {@link User} from input parameter.
     *
     * @param user for saving to {@link UserRepository}.
     * @return saving {@link User}.
     */
    @PostMapping
    public User create(@RequestBody User user) {
        return userService.save(user);
    }
}
