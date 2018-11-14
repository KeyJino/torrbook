package by.intexsoft.kova.service;

import by.intexsoft.kova.entity.Book;
import by.intexsoft.kova.entity.Request;
import by.intexsoft.kova.entity.User;
import by.intexsoft.kova.repository.RequestRepository;
import by.intexsoft.kova.service.impl.RequestService;

import java.util.List;

/**
 * Interface using for manage {@link RequestService}.
 * Contains methods for working with {@link RequestRepository}.
 */
public interface IRequestService {

    /**
     * Create {@link Request} from value in parameters.
     *
     * @param request for saving in {@link RequestRepository}.
     * @return creating {@link Request}.
     */
    Request save(Request request);

    /**
     * Removing {@link Request} from {@link RequestRepository}.
     *
     * @param request for removing.
     * @return removing {@link Request}.
     */
    Request remove(Request request);

    /**
     * Finding {@link Request} using there ID.
     *
     * @param id of {@link Request}.
     * @return searching {@link Request}.
     */
    Request findById(int id);

    /**
     * Get all {@link Request} from {@link RequestRepository}.
     *
     * @return List {@link Request}.
     */
    List<Request> findAll();

    /**
     * Removing {@link Request} by ID.
     *
     * @param id of {@link Request}.
     */
    void removeById(int id);

    /**
     * Get all {@link Request} using {@link Book}Id.
     *
     * @param bookId of {@link Book}.
     * @return List {@link Request}.
     */
    List<Request> findAllRequests(int bookId);

    /**
     * Finding all {@link Request}s.
     * @param userId of {@link User}.
     * @return List {@link Request}.
     */
    List<Request> findAllById(int userId);

}
