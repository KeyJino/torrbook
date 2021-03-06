package by.intexsoft.kova.service.impl;

import by.intexsoft.kova.entity.Book;
import by.intexsoft.kova.entity.User;
import by.intexsoft.kova.repository.BookRepository;
import by.intexsoft.kova.service.IBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Book's service. This class has all methods to work with {@link Book}'s Repository.
 *
 * @see IBookService;
 */
@Service
public class BookService implements IBookService {

    final private
    BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    /**
     * Search book by Id.
     *
     * @param id current book's Id.
     * @return searching {@link Book} from repository.
     */
    @Override
    public Book findById(int id) {
        return bookRepository.findById(id).get();
    }

    /**
     * Finding all books in the repository.
     *
     * @return List of {@link Book}.
     */
    @Override
    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    /**
     * Create new {@link Book} in {@link BookRepository}.
     *
     * @param book - {@link Book} for saving.
     * @return this {@link Book}.
     */
    @Override
    public Book save(Book book) {
        bookRepository.save(book);
        return book;
    }

    /**
     * Change {@link Book}'s state by there Id.
     *
     * @param id of {@link Book}.
     * @return {@link Book} with changes.
     */
    @Override
    public Book changeStateById(int id) {
        Book book = findById(id);
        book.state = !book.state;
        return book;
    }

    /**
     * Change request state {@link Book}, using there ID.
     *
     * @param id if {@link Book}.
     * @return {@link Book} with changes.
     */
    @Override
    public Book changeRequestStateById(int id) {
        Book book = findById(id);
        book.request = !book.request;
        return book;
    }

    /**
     * Service method delete {@link Book} from repository.
     *
     * @param book will be deleted.
     * @return just deleting {@link Book}.
     */
    @Override
    public Book remove(Book book) {
        Book removeBook = findById(book.getId());
        bookRepository.delete(book);
        return removeBook;
    }

    /**
     * Service method delete {@link Book} from repository, but using book's ID for this.
     *
     * @param id of a {@link Book}'s which will be deleting.
     * @return just deleting {@link Book}.
     */
    @Override
    public Book removeById(int id) {
        Book book = findById(id);
        bookRepository.deleteById(id);
        return book;
    }

    /**
     * Finding {@link Book}s with current title.
     *
     * @param title current title.
     * @return all suitable {@link Book}.
     */
    @Override
    public List<Book> findBookByTitle(String title) {
        return bookRepository.findBookByTitleContaining(title);
    }

    /**
     * Finding {@link Book}s with current user.
     *
     * @param user current {@link User}.
     * @return all suitable {@link Book}.
     */
    @Override
    public List<Book> findBooksByUser(User user) {
        return bookRepository.findBooksByUser(user);
    }

}
