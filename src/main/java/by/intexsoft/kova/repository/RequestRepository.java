package by.intexsoft.kova.repository;

import by.intexsoft.kova.entity.Request;
import by.intexsoft.kova.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequestRepository extends JpaRepository<Request, Integer> {

    /**
     * Finding all {@link Request}s by {@link User}id.
     *
     * @param user_id - user id for searching.
     * @return List of {@link Request}.
     */
    List<Request> findAllByUserId(int user_id);

    /**
     * Finding {@link Request} by Book_User.
     *
     * @param user current.
     * @return List of Requests.
     */
    List<Request> findByBook_User(User user);
}
