package by.intexsoft.kova.repository;

import by.intexsoft.kova.entity.Book;
import by.intexsoft.kova.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * JPA repository for user book's.
 */
public interface BookRepository extends JpaRepository<Book, Integer> {

    /**
     * Finding all {@link Book}'s by title
     *
     * @param title - filed to search and returning List {@link Book}
     * @return List {@link Book}
     */
    List<Book> findBookByTitleContaining(String title);

    /**
     * Finding {@link Book}s by {@link User}.
     *
     * @param user current {@link User}.
     * @return List of Books.
     */
    List<Book> findBooksByUser(User user);

}
