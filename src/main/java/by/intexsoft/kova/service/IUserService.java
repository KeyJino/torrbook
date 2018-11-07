package by.intexsoft.kova.service;

import by.intexsoft.kova.entity.User;

import java.util.List;

/**
 * Service for working with {@link User}
 */
public interface IUserService {

    User findById(int id);

    List<User> findAll();

    User removeById(int id);

    User remove(User object);
    /**
     * Find user by name
     */
    User findByUsername(String username);

    /**
     * Add user to DB
     */
    User save(User user);
}
