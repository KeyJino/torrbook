package by.intexsoft.kova.controller;

import by.intexsoft.kova.entity.Role;
import by.intexsoft.kova.entity.User;
import by.intexsoft.kova.repository.UserRepository;
import by.intexsoft.kova.service.IRoleService;
import by.intexsoft.kova.service.IUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for working with {@link User}
 */
@CrossOrigin
@RestController
@RequestMapping("/users")
@Slf4j
public class UserController {

    @Autowired
    IUserService userService;

    @Autowired
    IRoleService roleService;

    /**
     * Get all {@link User}.
     *
     * @return List {@link User}.
     */
    @GetMapping
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
    @PostMapping("/creating")
    public User create(@RequestBody User user) {
        userService.save(user);
        return user;
    }

    @GetMapping("/{username}")
    public by.intexsoft.kova.entity.User isCreatedUsername(@PathVariable String username) {
        return userService.findByUsername(username);
    }

    @GetMapping("/ban-{user_id}")
    public User ban(@PathVariable int user_id) {
        User user = userService.findById(user_id);
        userService.ban(user);
        return userService.update(user);
    }

    @GetMapping("/role-{role_id}")
    public List<User> findByRole(@PathVariable int role_id) {
        Role role = roleService.findById(role_id);
        return userService.findByRole(role);
    }
}
