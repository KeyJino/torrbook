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

    /**
     * Finding all {@link Book}'s by author
     *
     * @param author - filed to search and returning List {@link Book}
     * @return List {@link Book}
     */
    @Query("select book from Book book where book.author=:author")
    List<Book> findByAuthor(@Param("author") String author);


    /**
     * Finding all {@link Book}'s by description
     *
     * @param description - filed to search and returning List {@link Book}
     * @return List {@link Book}
     */
    @Query("select book from Book book where book.description=:description")
    List<Book> findByDescription(@Param("description") String description);


    /**
     * Finding all {@link Book}'s by title
     *
     * @param title - filed to search and returning List {@link Book}
     * @return List {@link Book}
     */
    List<Book> findBookByTitleContaining(@Param("title") String title);

}
