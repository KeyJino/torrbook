package by.intexsoft.kova.repository;

import by.intexsoft.kova.entity.Book;
import by.intexsoft.kova.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * JPA repository for holders.
 */
public interface RecordRepository extends JpaRepository<Record, Integer> {

    /**
     * Finding all {@link Record} from Holders by user, who take {@link Book}.
     *
     * @param user_take_id - user take {@link Book}.
     * @return List {@link Record}
     */
    @Query(value = "SELECT * FROM library_scheme.holder WHERE user_take_id=:user_take_id", nativeQuery = true)
    List<Record> findAllById(@Param("user_take_id") int user_take_id);
}
