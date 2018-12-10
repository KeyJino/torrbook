package by.intexsoft.kova.service;

import by.intexsoft.kova.entity.Book;
import by.intexsoft.kova.entity.User;
import by.intexsoft.kova.repository.BookRepository;
import by.intexsoft.kova.service.impl.BookService;

import java.util.List;

/**
 * Interface using for manage {@link BookService}.
 * Contains methods for working with {@link BookRepository}.
 */
public interface IBookService {

    /**
     * Removing {@link Book} by Identity.
     *
     * @param id - identity of {@link Book}.
     * @return {@link Book}.
     */
    Book removeById(int id);

    /**
     * Remove {@link Book} from {@link BookRepository}.
     *
     * @param book - is current {@link Book}.
     * @return this {@link Book}.
     */
    Book remove(Book book);

    /**
     * Create new {@link Book} in {@link BookRepository}.
     *
     * @param book - {@link Book} for saving.
     * @return this {@link Book}.
     */
    Book save(Book book);

    /**
     * Finding {@link Book} by Book's Id.
     *
     * @param id - this {@link Book}.
     * @return searched {@link Book}.
     */
    Book findById(int id);

    /**
     * Method get all {@link BookRepository}.
     *
     * @return List{@link Book}s from {@link BookRepository}.
     */
    List<Book> findAll();

    /**
     * Change {@link Book}'s state by there Id.
     *
     * @param id of {@link Book}.
     * @return {@link Book} with changes.
     */
    Book changeStateById(int id);

    /**
     * Change request state {@link Book}, using there ID.
     *
     * @param id if {@link Book}.
     * @return {@link Book} with changes.
     */
    Book changeRequestStateById(int id);

    /**
     * Finding all {@link Book}s by here title.
     * @param title current title.
     * @return List of Books.
     */
    List<Book> findBookByTitle(String title);

    /**
     * Finding all {@link Book}s by here title.
     * @param user current user.
     * @return List of Books.
     */
    List<Book> findBooksByUser(User user);

}
