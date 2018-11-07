package by.intexsoft.kova.controller;

import by.intexsoft.kova.service.IBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping("/welcome")
public class HelloController {

    @Autowired
    IBookService bookService;

    @GetMapping
    public String message() {
        return bookService.findById(1).author;
    }
}
