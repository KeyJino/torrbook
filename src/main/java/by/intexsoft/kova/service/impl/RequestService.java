package by.intexsoft.kova.service.impl;

import by.intexsoft.kova.entity.Book;
import by.intexsoft.kova.entity.Request;
import by.intexsoft.kova.entity.User;
import by.intexsoft.kova.repository.RequestRepository;
import by.intexsoft.kova.service.IRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * This class store Requests about deals between {@link User}s with their {@link Book}s.
 */
@Service
public class RequestService implements IRequestService {

    @Autowired
    RequestRepository requestRepository;

    /**
     * Create {@link Request} from value in parameters.
     *
     * @param request for saving in {@link RequestRepository}.
     * @return creating {@link Request}.
     */
    @Override
    public Request save(Request request) {
        requestRepository.save(request);
        return request;
    }

    /**
     * Removing {@link Request} from {@link RequestRepository}.
     *
     * @param request for removing.
     * @return removing {@link Request}.
     */
    @Override
    public Request remove(Request request) {
        requestRepository.delete(request);
        return request;
    }

    /**
     * Finding {@link Request} using there ID.
     *
     * @param id of {@link Request}.
     * @return searching {@link Request}.
     */
    @Override
    public Request findById(int id) {
        return requestRepository.findById(id).get();
    }

    /**
     * Get all {@link Request} from {@link RequestRepository}.
     *
     * @return List {@link Request}.
     */
    @Override
    public List<Request> findAll() {
        return requestRepository.findAll();
    }

    /**
     * Removing {@link Request} by ID.
     *
     * @param id of {@link Request}.
     */
    @Override
    public void removeById(int id) {
        requestRepository.deleteById(id);
    }

    /**
     * Finding all {@link Request}s.
     *
     * @param user_id of {@link User}.
     * @return List {@link Request}.
     */
    @Override
    public List<Request> findAllByUserId(int user_id) {
        return requestRepository.findAllByUserId(user_id);
    }

    /**
     * Finding {@link Request}s by Book_User
     *
     * @param user current {@link User}.
     * @return List of Requests.
     */
    @Override
    public List<Request> findByBookUser(User user) {
        return requestRepository.findByBook_User(user);
    }
}
