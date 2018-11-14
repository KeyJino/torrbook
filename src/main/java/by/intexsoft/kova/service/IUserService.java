package by.intexsoft.kova.service;

import by.intexsoft.kova.controller.RecordController;
import by.intexsoft.kova.entity.User;
import by.intexsoft.kova.repository.UserRepository;

import java.util.List;

/**
 * Interface service for working with {@link UserRepository}
 */
public interface IUserService {

    /**
     * Finding {@link User} by his ID.
     * @param id this {@link User}.
     * @return
     */
    User findById(int id);

    /**
     * Get all {@link User}.
     * @return List {@link User}.
     */
    List<User> findAll();

    /**
     * Removing {@link User} by ID.
     * @param id this {@link User}.
     * @return removing {@link User}.
     */
    User removeById(int id);

    /**
     * Removing {@link User} how object.
     * @param user for removing.
     * @return removing {@link User}.
     */
    User remove(User user);

    /**
     * Finding {@link User} in {@link UserRepository}.
     * @param username for searching.
     * @return finding {@link User}.
     */
    User findByUsername(String username);

    /**
     * Saving current {@link User} in {@link UserRepository}.
     * @param user for add to repository.
     * @return saving {@link User}.
     */
    User save(User user);

    /**
     * Increase {@link User} counter GivenBook to +1.
     * @param user current {@link User}.
     * @return updating said {@link User}.
     */
    User inscriptionBookGiven(User user);

    /**
     * Increase {@link User} counter TakeBook to +1.
     * @param user current {@link User}.
     * @return updating said {@link User}.
     */
    User inscriptionBookTaken(User user);

    /**
     * Update {@link User}.
     * @see RecordController#remove(int)
     * @param user for saving in {@link UserRepository}.
     * @return {@link User}.
     */
    User update(User user);
}
