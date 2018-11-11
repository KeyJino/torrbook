package by.intexsoft.kova.repository;

import by.intexsoft.kova.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * JPA repository for user book's.
 */
public interface BookRepository extends JpaRepository<Book, Integer> {

    @Query("select book from Book book where book.author=:author")
    List<Book> findByAuthor(@Param("author")String author);

    @Query("select book from Book book where book.description=:description")
    List<Book> findByDescription(@Param("description")String description);

    @Query("select book from Book book where book.title=:title")
    List<Book> findByTitle(@Param("title")String title);

}
