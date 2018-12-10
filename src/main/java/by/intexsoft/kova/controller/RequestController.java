package by.intexsoft.kova.controller;

import by.intexsoft.kova.entity.*;
import by.intexsoft.kova.repository.RecordRepository;
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

/**
 * Controller for working with {@link Request}s.
 * This controller directed to working with {@link Request}.
 */
@CrossOrigin
@RestController
@RequestMapping("/requests")
@Slf4j
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class RequestController {

    @Autowired
    IRequestService requestService;

    @Autowired
    IBookService bookService;

    @Autowired
    IRecordService recordService;

    @Autowired
    IUserService userService;

    /**
     * Method for {@link Role} 'MODER'.
     * Get all {@link Request}'s.
     *
     * @return List {@link Request}.
     */
    @GetMapping
    @PreAuthorize("hasAuthority('MODER')")
    public List<Request> loadAll() {
        return requestService.findAll();
    }

    /**
     * Create {@link Request} from parameters.
     *
     * @param request for saving.
     */
    @PostMapping
    public void create(@RequestBody Request request) {
        requestService.save(request);
    }

    /**
     * Approving {@link Request}. After it go to {@link RecordRepository}.
     *
     * @param request for saving.
     * @param id      of {@link Request}.
     */
    @PostMapping("/approve-{id}")
    public void approve(@RequestBody Request request, @PathVariable int id) {
        requestService.save(request);

        Book book = bookService.changeStateById(request.book.getId());
        book.request = !book.request;
        bookService.save(book);

        User moder = userService.findById(request.book.user.getId());
        userService.decrementBookTaken(moder);
        userService.inscriptionBookGiven(moder);
        userService.update(moder);

        User user = userService.findById(request.user.getId());
        userService.inscriptionBookTaken(user);
        userService.update(user);

        Record record = recordService.build(request.book, request.user, "Тут описание");
        recordService.save(record);
    }

    /**
     * Deleting {@link Request} and changes {@link Book}'s state.
     *
     * @param id for deleting.
     */
    @DeleteMapping("/{id}")
    public void remove(@PathVariable int id) {
        Request request = requestService.findById(id);
        Book book = bookService.findById(request.book.getId());
        book = bookService.changeRequestStateById(book.getId());
        bookService.save(book);
        requestService.removeById(id);
    }


    /**
     * Checking {@link Request}'s and returning all matches.
     *
     * @param id for check {@link Request}.
     * @return List {@link Request}.
     */
    @GetMapping("/check-{id}")
    @PreAuthorize("hasAuthority('USER')")
    public List<Request> check(@PathVariable int id) {
        return requestService.findAllRequests(id);
    }

    /**
     * Loading all {@link Request} to current {@link User}.
     *
     * @param user_id this {@link User}.
     * @return List {@link Request}s.
     */
    @GetMapping("/user-{user_id}")
    @PreAuthorize("hasAuthority('USER')")
    public List<Request> loadByUserId(@PathVariable int user_id) {
        return requestService.findAllById(user_id);
    }

    @GetMapping("/moder-{user_id}")
    @PreAuthorize("hasAuthority('MODER')")
    public List<Request> loadByModerId(@PathVariable int user_id) {
        User user = userService.findById(user_id);
        return requestService.findByBookUser(user);
    }

    @GetMapping("/book-{book_id}-user-{user_id}")
    @PreAuthorize("hasAuthority('USER')")
    public Request findRequestByBookAndUser(@PathVariable int book_id, @PathVariable int user_id) {
        Book book = bookService.findById(book_id);
        User user = userService.findById(user_id);
        return requestService.findRequestByBookAndUser(book, user);
    }
}
