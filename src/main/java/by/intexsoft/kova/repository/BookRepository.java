package by.intexsoft.kova.repository;

import by.intexsoft.kova.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * JPA repository for user book's.
 */
public interface BookRepository extends JpaRepository<Book, Integer> {
}
