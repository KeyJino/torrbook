package by.intexsoft.kova.repository;

import by.intexsoft.kova.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * JPA repository for holders.
 */
public interface RecordRepository extends JpaRepository<Record, Integer> {
}
