package by.intexsoft.kova.repository;

import by.intexsoft.kova.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * JPA repository for holders.
 */
public interface RecordRepository extends JpaRepository<Record, Integer> {

}
