package by.intexsoft.kova.controller;

import by.intexsoft.kova.entity.Book;
import by.intexsoft.kova.entity.Record;
import by.intexsoft.kova.entity.User;
import by.intexsoft.kova.service.IBookService;
import by.intexsoft.kova.service.IRecordService;
import by.intexsoft.kova.service.IUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for working with {@link Record}.
 * Have specified methods to this goal.
 */
@CrossOrigin
@RestController
@RequestMapping("/records")
@Slf4j
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class RecordController {

    @Autowired
    IBookService bookService;

    @Autowired
    IUserService userService;

    @Autowired
    IRecordService recordService;

    /**
     * Getting all {@link Record}.
     *
     * @return List {@link Record}.
     */
    @GetMapping
    public List<Record> recordList() {
        return recordService.findAll();
    }

    /**
     * Creating {@link Record}.
     *
     * @param record said record.
     * @return saving {@link Record}.
     */
    @PostMapping
    @PreAuthorize("hasAuthority('USER')")
    public Record create(@RequestBody Record record) {
        recordService.save(record);
        return record;
    }

    /**
     * Removing {@link Record} by ID.
     *
     * @param id this {@link Record}.
     */
    @DeleteMapping("/{id}")
    public void remove(@PathVariable int id) {
        Record record = recordService.findById(id);

        Book book = record.book;
        book = bookService.changeRequestStateById(book.getId());
        book = bookService.changeStateById(book.getId()); //возможно баг
        bookService.save(book);

        User moder = record.book.user;
        System.out.println("Moder id:" + moder.getId() + " name: " + moder.username);

        System.out.println("Moder метод incrementBookTaken ДО:" + moder.bookTaken);
        userService.inscriptionBookTaken(moder); // модеру увеличиваем общее количество книг
        System.out.println("Moder метод incrementBookTaken ПОСЛЕ:" + moder.bookTaken);

        System.out.println("Moder метод сохранение BookTaken/Given:" + moder.bookTaken + " / " + moder.bookGiven);
        userService.update(moder);



        User user = record.user;
        System.out.println("Moder id:" + user.getId() + " name: " + user.username);

        System.out.println("Moder метод decrementBookTaken ДО:" + user.bookTaken);
        userService.decrementBookTaken(user); //по возвращению юзеру уменьшаем "взятых книг"
        System.out.println("Moder метод decrementBookTaken ПОСЛЕ:" + user.bookTaken);


        System.out.println("Moder метод incrementBookGiven ПОСЛЕ:" + user.bookGiven);
        userService.inscriptionBookGiven(user); // и увеличиваем возвращённых
        System.out.println("Moder метод incrementBookGiven ПОСЛЕ:" + user.bookGiven);

        System.out.println("User метод сохранение BookTaken/Given:" + user.bookTaken + " / " + user.bookGiven);
        userService.update(user);

        recordService.removeById(id);
    }

    /**
     * Getting all {@link Record} for current {@link User}.
     *
     * @param user_id for downloading {@link Record}s.
     * @return List {@link Record}s.
     */
    @GetMapping("/user-{user_id}")
    @PreAuthorize("hasAuthority('USER')")
    public List<Record> loadById(@PathVariable int user_id) {
        return recordService.findAllById(user_id);
    }

}
