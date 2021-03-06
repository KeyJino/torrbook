package by.intexsoft.kova.repository;

import by.intexsoft.kova.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * JPA repository class for user roles
 */
public interface RoleRepository extends JpaRepository<Role, Integer> {
}
