package by.intexsoft.kova.controller;

import by.intexsoft.kova.entity.Book;
import by.intexsoft.kova.entity.User;
import by.intexsoft.kova.service.IBookService;
import by.intexsoft.kova.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for working with {@link Book}.
 * Have for this some specified methods.
 */
@CrossOrigin
@RestController
@RequestMapping("user/books")
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class BookController {

    @Autowired
    IBookService bookService;

    @Autowired
    IUserService userService;

    /**
     * Get all {@link Book}s.
     *
     * @return List of Books.
     */
    @GetMapping
    public List<Book> bookList() {
        return bookService.findAll();
    }

    /**
     * Loading all {@link Book} for current {@link User}.
     *
     * @param user_id current {@link User}.
     * @return List of Book's.
     */
    @GetMapping("/load{user_id}")
    public List<Book> bookListById(@PathVariable int user_id) {
        User user = userService.findById(user_id);
        return bookService.findBooksByUser(user);
    }

    /**
     * Creating new {@link Book}.
     *
     * @param book new current {@link Book}.
     * @return just creating {@link Book}.
     */
    @PostMapping("/book-creating")
    @PreAuthorize("hasAuthority('MODER')")
    public Book create(@RequestBody Book book) {
        User user = userService.findById(book.user.getId());
        User updUser = userService.inscriptionBookTaken(user);
        userService.update(updUser);
        bookService.save(book);
        return book;
    }

    /**
     * Deleting {@link Book} by Id.
     *
     * @param id current {@link Book}.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('MODER')")
    public void remove(@PathVariable int id) {
        Book book = bookService.findById(id);
        User user = userService.findById(book.user.getId());
        User newUser = userService.decrementBookTaken(user);
        userService.update(newUser);
        bookService.removeById(id);
    }

    /**
     * When {@link Book} change state, here state will update.
     *
     * @param book current book.
     * @param id   only for right link.
     */
    @PostMapping("/change-request-{id}")
    public void changeRequest(@RequestBody Book book, @PathVariable int id) {
        bookService.save(book);
    }

    /**
     * Finding all {@link Book}s by here title.
     *
     * @param title current {@link Book}.
     * @return List of suitable Books.
     */
    @GetMapping("/&{title}")
    public List<Book> findBookByTitle(@PathVariable String title) {
        System.out.println(title);
        return bookService.findBookByTitle(title);
    }
}
