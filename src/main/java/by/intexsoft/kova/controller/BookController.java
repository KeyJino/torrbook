package by.intexsoft.kova.controller;

import by.intexsoft.kova.entity.Book;
import by.intexsoft.kova.entity.Record;
import by.intexsoft.kova.service.IBookService;
import by.intexsoft.kova.service.IRecordService;
import by.intexsoft.kova.service.IUserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin
@RestController
@RequestMapping("user/books")
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

    @GetMapping("/")
    public List<Book> bookList() {
        return bookService.findAll();
    }
}
