package by.intexsoft.kova.controller;

import by.intexsoft.kova.entity.Book;
import by.intexsoft.kova.service.IBookService;
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

    @GetMapping
    public List<Book> bookList() {
        return bookService.findAll();
    }

    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public Book create(@RequestBody Book book) {
        bookService.save(book);
        return book;
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public void remove(@PathVariable int id) {
        bookService.removeById(id);
    }

    @PostMapping("/change-request-{id}")
    public void changeRequest(@RequestBody Book book, @PathVariable int id) {
        bookService.save(book);
    }
}
