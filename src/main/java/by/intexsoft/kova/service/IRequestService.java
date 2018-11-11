package by.intexsoft.kova.service;

import by.intexsoft.kova.entity.Request;

import java.util.List;

public interface IRequestService {

    Request save(Request request);

    Request remove(Request request);

    Request findById(int id);

    List<Request> findAll();

    void removeById(int id);
}
