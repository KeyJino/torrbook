package by.intexsoft.kova.service.impl;

import by.intexsoft.kova.entity.Book;
import by.intexsoft.kova.entity.User;
import by.intexsoft.kova.repository.BookRepository;
import by.intexsoft.kova.service.IBookService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Book's service. This class has all methods to work with {@link Book}'s Repository.
 */
@Service
public class BookService implements IBookService{

    private final
    BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    /**
     * Search book by Id.
     * @param id current book's Id.
     * @return searching {@link Book} from repository.
     */
    @Override
    public Book findById(int id){
        return bookRepository.findById(id).get();
    }

    /**
     * Finding all books in the repository.
     * @return List of {@link Book}.
     */
    @Override
    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    /**
     * Method finding {@link Book} by here title.
     * @param title of {@link Book}.
     * @return all {@link Book} which has this title.
     */
    @Override
    public List<Book> findBookByTitle(String title) {
        List<Book> books = new ArrayList<>();
        for(Book item : findAll()) {
            if(item.title.equals(title)) {
                books.add(item);
            }
        }
        return books;
    }

    /**
     * Method finding {@link Book} by here author.
     * @param author of {@link Book}.
     * @return all {@link Book} which has this author.
     */
    @Override
    public List<Book> findBookByAuthor(String author) {
        List<Book> books = new ArrayList<>();
        for(Book item : findAll()) {
            if(item.title.equals(author)) {
                books.add(item);
            }
        }
        return books;
    }

    /**
     * Method finding {@link Book} by here description.
     * @param description of {@link Book}.
     * @return all {@link Book} which has this description.
     */
    @Override
    public List<Book> findBookByDescription(String description) {
        List<Book> books = new ArrayList<>();
        for(Book item : findAll()) {
            if(item.description.equals(description)) {
                books.add(item);
            }
        }
        return books;
    }

    /**
     * Method create {@link Book}.
     * @param title of a {@link Book}.
     * @param author of a {@link Book}.
     * @param description of a {@link Book}.
     * @param user who is owner of a {@link Book}.
     * @return just creating a {@link Book}.
     */
    @Override
    public Book create(String title, String author, String description, User user) {
        Book book = new Book();
        book.title = title;
        book.author = author;
        book.description = description;
        book.user = user;
        bookRepository.save(book);
        return book;
    }

    /**
     * Service method delete {@link Book} from repository.
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
     * Update {@link Book}'s title.
     * @param title current book's title.
     * @param newTitle new book's title.
     * @return {@link Book} with new title.
     */
    @Override
    public Book updateBookTitle(String title, String newTitle) {
        Book book = new Book();
        for(Book item : findAll()) {
            if(item.title.equals(title)) {
                item.title = newTitle;

            }
        }
        return book;
    }

    /**
     * Update {@link Book}'s author.
     * @param author current book's author.
     * @param newAuthor new book's author.
     * @return {@link Book} with new author.
     */
    @Override
    public Book updateBookAuthor(String author, String newAuthor) {
        Book book = new Book();
        for(Book item : findAll()) {
            if(item.author.equals(author)) {
                item.author = newAuthor;
            }
        }
        return book;
    }

    /**
     * Update {@link Book}'s title.
     * @param description current book's description.
     * @param newDescription new book's description.
     * @return {@link Book} with new description.
     */
    @Override
    public Book updateShotDescription(String description, String newDescription) {
        Book book = new Book();
        for(Book item : findAll()) {
            if(item.description.equals(description)) {
                item.description = newDescription;
            }
        }
        return book;
    }
}
