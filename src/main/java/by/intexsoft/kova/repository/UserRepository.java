package by.intexsoft.kova.repository;

import by.intexsoft.kova.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the User entity
 */
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
}
