package by.intexsoft.kova.controller;


import by.intexsoft.kova.entity.Book;
import by.intexsoft.kova.entity.Record;
import by.intexsoft.kova.entity.Request;
import by.intexsoft.kova.service.IBookService;
import by.intexsoft.kova.service.IRecordService;
import by.intexsoft.kova.service.IRequestService;
import by.intexsoft.kova.service.IUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/requests")
@Slf4j
@EnableGlobalMethodSecurity(prePostEnabled=true)
public class RequestController {

    @Autowired
    IRequestService requestService;

    @Autowired
    IBookService bookService;

    @Autowired
    IRecordService recordService;

    @Autowired
    IUserService userService;

    @GetMapping
    public List<Request> loadAll() {
        return requestService.findAll();
    }

    @PostMapping
    public void create(@RequestBody Request request) {
        requestService.save(request);
    }

    @PostMapping("/approve-{id}")
    public void approve(@RequestBody Request request, @PathVariable int id) {
        requestService.save(request);

        Book book = bookService.changeStateById(request.book.getId());
        bookService.save(book);

        Record record = recordService.build(request.book, request.user, "Проверка");
        recordService.save(record);
        userService.inscriptionBookTaken(request.user);
        userService.inscriptionBookTaken(book.user);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('MODER')")
    public void remove(@PathVariable int id) {
        requestService.removeById(id);
    }


}
