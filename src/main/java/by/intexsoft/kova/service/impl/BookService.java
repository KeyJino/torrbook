package by.intexsoft.kova.service.impl;

import by.intexsoft.kova.entity.Book;
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

    @Autowired
    BookRepository bookRepository;

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

    @Deprecated
    @Override
    public List<Book> findByAuthor(String title) {
        return bookRepository.findByAuthor(title);
    }

    @Deprecated
    @Override
    public List<Book> findByDescription(String description) {
        return bookRepository.findByDescription(description);
    }

    @Deprecated
    @Override
    public List<Book> findByTitle(String title) {
        return bookRepository.findByTitle(title);
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

}
