package by.intexsoft.kova.repository;

import by.intexsoft.kova.entity.Holder;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * JPA repository for holders.
 */
public interface HolderRepository extends JpaRepository<Holder, Integer> {
}
