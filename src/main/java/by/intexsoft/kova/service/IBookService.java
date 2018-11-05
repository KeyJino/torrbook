package by.intexsoft.kova.service;

import by.intexsoft.kova.entity.Book;

import java.util.List;

public interface IBookService {

    Book findBookById(int id);

    List<Book> findAll();
}
