package by.intexsoft.kova.service.impl;

import by.intexsoft.kova.controller.RecordController;
import by.intexsoft.kova.entity.Role;
import by.intexsoft.kova.entity.User;
import by.intexsoft.kova.repository.UserRepository;
import by.intexsoft.kova.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service for working with {@link UserRepository}.
 */
@Service
public class UserService implements IUserService {

    final private
    UserRepository userRepository;

    final private
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    /**
     * Finding {@link User} in {@link UserRepository}.
     *
     * @param username for searching.
     * @return finding {@link User}.
     */
    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    /**
     * Finding {@link User} by his ID.
     *
     * @param id this {@link User}.
     * @return
     */
    @Override
    public User findById(int id) {
        return userRepository.findById(id).get();
    }

    /**
     * Get all {@link User}.
     *
     * @return List {@link User}.
     */
    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    /**
     * Removing {@link User} how object.
     *
     * @param user for removing.
     * @return removing {@link User}.
     */
    @Override
    public User remove(User user) {
        userRepository.delete(user);
        return user;
    }

    /**
     * Removing {@link User} by ID.
     *
     * @param id this {@link User}.
     * @return removing {@link User}.
     */
    @Override
    public User removeById(int id) {
        User user = findById(id);
        userRepository.deleteById(id);
        return user;
    }

    /**
     * Saving current {@link User} in {@link UserRepository}.
     *
     * @param user for add to repository.
     * @return saving {@link User}.
     */
    @Override
    public User save(User user) {
        user.password = bCryptPasswordEncoder.encode(user.password);
        return userRepository.save(user);
    }

    /**
     * Increase {@link User} counter GivenBook to +1.
     *
     * @param user current {@link User}.
     * @return updating said {@link User}.
     */
    @Override
    public User inscriptionBookGiven(User user) {
        user.bookGiven = user.bookGiven + 1;
        return user;
    }

    /**
     * Increase {@link User} counter TakeBook to +1.
     *
     * @param user current {@link User}.
     * @return updating said {@link User}.
     */
    @Override
    public User inscriptionBookTaken(User user) {
        user.bookTaken = user.bookTaken + 1;
        return user;
    }

    /**
     * Decrement {@link User} counter to -1.
     *
     * @param user current {@link User}.
     * @return updating said {@link User}.
     */
    @Override
    public User decrementBookTaken(User user) {
        user.bookTaken = user.bookTaken - 1;
        return user;
    }

    /**
     * Update {@link User}.
     *
     * @param user for saving in {@link UserRepository}.
     * @return {@link User}.
     * @see RecordController#remove(int)
     */
    @Override
    public User update(User user) {
        return userRepository.save(user);
    }

    /**
     * Banned some user.
     *
     * @param user current.
     * @return this user.
     */
    @Override
    public User ban(User user) {
        user.status = !user.status;
        return user;
    }

    /**
     * Finding {@link User} by {@link Role}.
     *
     * @param role current {@link Role}.
     * @return List of {@link User}.
     */
    @Override
    public List<User> findByRole(Role role) {
        return userRepository.findByRole(role);
    }
}
