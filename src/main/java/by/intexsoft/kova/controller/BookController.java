package by.intexsoft.kova.controller;

import by.intexsoft.kova.entity.Book;
import by.intexsoft.kova.entity.User;
import by.intexsoft.kova.service.IBookService;
import by.intexsoft.kova.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
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

    @GetMapping
    public List<Book> bookList() {
        return bookService.findAll();
    }

    @GetMapping("/load{user_id}")
    public List<Book> bookListById(@PathVariable int user_id) {
        User user = userService.findById(user_id);
        return bookService.findBooksByUser(user);
    }

    @PostMapping("/book-creating")
    @PreAuthorize("hasAuthority('MODER')")
    public Book create(@RequestBody Book book) {
        User user = userService.findById(book.user.getId());
        User updUser = userService.inscriptionBookTaken(user);
        userService.update(updUser);
        bookService.save(book);
        return book;
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('MODER')")
    public void remove(@PathVariable int id) {
        Book book = bookService.findById(id);
        User user = userService.findById(book.user.getId());
        User newUser = userService.decrementBookTaken(user);
        userService.update(newUser);
        bookService.removeById(id);
    }

    @PostMapping("/change-request-{id}")
    public void changeRequest(@RequestBody Book book, @PathVariable int id) {
        bookService.save(book);
    }

    @GetMapping("/&{title}")
    public List<Book> findBookByTitle(@PathVariable String title) {
        System.out.println(title);
        return bookService.findBookByTitle(title);
    }
}
