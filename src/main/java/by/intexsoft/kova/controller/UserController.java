package by.intexsoft.kova.controller;

import by.intexsoft.kova.entity.Role;
import by.intexsoft.kova.entity.User;
import by.intexsoft.kova.repository.UserRepository;
import by.intexsoft.kova.service.IRoleService;
import by.intexsoft.kova.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for working with {@link User}
 */
@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {

    final private
    IUserService userService;

    final private
    IRoleService roleService;

    @Autowired
    public UserController(IUserService userService, IRoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

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

    /**
     * Getting {@link User} by here name.
     *
     * @param username name for searching.
     * @return {@link User}.
     */
    @GetMapping("/{username}")
    public by.intexsoft.kova.entity.User isCreatedUsername(@PathVariable String username) {
        return userService.findByUsername(username);
    }

    /**
     * Banning current {@link User}.
     *
     * @param user_id of {@link User}.
     * @return this user.
     */
    @GetMapping("/ban-{user_id}")
    public User ban(@PathVariable int user_id) {
        User user = userService.findById(user_id);
        userService.ban(user);
        return userService.update(user);
    }

    /**
     * Finding all {@link User} by {@link Role}.
     *
     * @param role_id for searching.
     * @return List {@link User} with current role.
     */
    @GetMapping("/role-{role_id}")
    public List<User> findByRole(@PathVariable int role_id) {
        Role role = roleService.findById(role_id);
        return userService.findByRole(role);
    }
}
