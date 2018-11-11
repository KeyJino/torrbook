package by.intexsoft.kova.controller;

import by.intexsoft.kova.entity.Book;
import by.intexsoft.kova.service.IBookService;
import by.intexsoft.kova.service.IRecordService;
import by.intexsoft.kova.service.IUserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("user/books")
@EnableGlobalMethodSecurity(prePostEnabled=true)
public class BookController {

    private final
    IBookService bookService;

    private final
    IUserService userService;

    private final
    IRecordService recordService;

    public BookController(IBookService bookService, IUserService userService, IRecordService recordService) {
        this.bookService = bookService;
        this.userService = userService;
        this.recordService = recordService;
    }

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
}
