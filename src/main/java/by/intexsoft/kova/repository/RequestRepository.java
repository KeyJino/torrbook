package by.intexsoft.kova.repository;

import by.intexsoft.kova.entity.Book;
import by.intexsoft.kova.entity.Request;
import by.intexsoft.kova.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Integer> {

    /**
     * Finding all {@link Request}s by {@link Book}id.
     *
     * @param book_id - book for searching.
     * @return List of {@link Request}.
     */
    @Query(value = "SELECT * FROM library_scheme.request WHERE book_id=:book_id", nativeQuery = true)
    List<Request> findAllRequests(@Param("book_id") int book_id);

    /**
     * Finding all {@link Request}s by {@link User}id.
     *
     * @param user_take_id - user id for searching.
     * @return List of {@link Request}.
     */
    @Query(value = "SELECT * FROM library_scheme.request WHERE user_take_id=:user_take_id", nativeQuery = true)
    List<Request> findAllById(@Param("user_take_id") int user_take_id);

    Request findRequestByBook(Book book);

    Request findRequestByBookAndUser(Book book, User user);

    List<Request> findByBook_User(User user);
}
