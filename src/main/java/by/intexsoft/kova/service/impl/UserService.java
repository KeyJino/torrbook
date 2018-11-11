package by.intexsoft.kova.service.impl;

import by.intexsoft.kova.entity.User;
import by.intexsoft.kova.repository.UserRepository;
import by.intexsoft.kova.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User findById(int id) {
        return userRepository.findById(id).get();
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User remove(User user) {
        userRepository.delete(user);
        return user;
    }

    @Override
    public User removeById(int id) {
        User user = findById(id);
        userRepository.deleteById(id);
        return user;
    }

    @Override
    public User save(User user) {
        user.password = bCryptPasswordEncoder.encode(user.password);
        return userRepository.save(user);
    }

    @Override
    public void inscriptionBookGiven(User user) {
        ++user.bookGiven;
        userRepository.save(user);
    }

    @Override
    public void inscriptionBookTaken(User user) {
        ++user.bookTaken;
        userRepository.save(user);
    }
}
