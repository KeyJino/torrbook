package by.intexsoft.kova.service;

import by.intexsoft.kova.entity.Book;
import by.intexsoft.kova.entity.Record;
import by.intexsoft.kova.entity.User;

import java.util.List;

public interface IRecordService {

    Record findById(int id);

    List<Record> findAll();

    Record removeById(int id);

    Record remove(Record object);

    Record save(Record record);

    Record build(Book book, User user);

    Record build(Book book, User user, String description);

//    Record findRecordByUserId(int userId);
//
//    Record findRecordByBookId(int bookId);
//
//    Record updateRecordDescriptionById(int recordId, String description);

}
