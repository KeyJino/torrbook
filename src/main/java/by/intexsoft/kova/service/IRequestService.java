package by.intexsoft.kova.service;

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
     * Finding all {@link Request}s.
     *
     * @param userId of {@link User}.
     * @return List {@link Request}.
     */
    List<Request> findAllByUserId(int userId);

    /**
     * Finding {@link Request}s by Book_User
     *
     * @param user current {@link User}.
     * @return List of Requests.
     */
    List<Request> findByBookUser(User user);

}
