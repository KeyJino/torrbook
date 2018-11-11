package by.intexsoft.kova.service;

import by.intexsoft.kova.entity.Book;
import by.intexsoft.kova.entity.User;

import java.util.List;

public interface IBookService {

    Book removeById(int id);

    Book remove(Book book);

    Book save(Book book);

    Book findById(int id);

    List<Book> findAll();

    List<Book> findByAuthor(String title);

    List<Book> findByDescription(String description);

    List<Book> findByTitle(String title);

    Book changeStateById(int id);

//    Book updateBookTitle(String title, String newTitle);
//
//    Book updateBookAuthor(String author, String newAuthor);
//
//    Book updateShotDescription(String description, String newDescription);
//
//    List<Book> findBookByTitle(String title);
//
//    List<Book> findBookByAuthor(String author);
//
//    List<Book> findBookByDescription(String description);

}
