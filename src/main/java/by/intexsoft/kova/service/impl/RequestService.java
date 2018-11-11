package by.intexsoft.kova.service.impl;

import by.intexsoft.kova.entity.Request;
import by.intexsoft.kova.repository.RequestRepository;
import by.intexsoft.kova.service.IRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestService implements IRequestService {

    @Autowired
    RequestRepository requestRepository;

    @Override
    public Request save(Request request) {
        requestRepository.save(request);
        return request;
    }

    @Override
    public Request remove(Request request) {
        requestRepository.delete(request);
        return request;
    }

    @Override
    public Request findById(int id) {
        return requestRepository.findById(id).get();
    }

    @Override
    public List<Request> findAll() {
        return requestRepository.findAll();
    }

    @Override
    public void removeById(int id) {
        requestRepository.deleteById(id);
    }


}
