package by.intexsoft.kova.service;

import by.intexsoft.kova.entity.Book;

import java.util.List;

public interface IService<T> {

    T findById(int id);

    List<T> findAll();

    T removeById(int id);

    T remove(T object);

}
