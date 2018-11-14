package by.intexsoft.kova.service;

import by.intexsoft.kova.controller.RequestController;
import by.intexsoft.kova.entity.Book;
import by.intexsoft.kova.entity.Record;
import by.intexsoft.kova.entity.Request;
import by.intexsoft.kova.entity.User;
import by.intexsoft.kova.repository.RecordRepository;
import by.intexsoft.kova.service.impl.RecordService;

import java.util.List;

/**
 * Interface using for manage {@link RecordService}.
 * Contains methods for working with {@link RecordRepository}.
 */
public interface IRecordService {

    /**
     * Finding method. Get {@link Record} from {@link RecordRepository}.
     *
     * @param id of {@link Record}.
     * @return {@link Record}.
     */
    Record findById(int id);

    /**
     * Get whole {@link RecordRepository}.
     *
     * @return List {@link Record}.
     */
    List<Record> findAll();

    /**
     * Removing {@link Record} by ID.
     *
     * @param id of {@link Record}.
     * @return removing {@link Record}.
     */
    Record removeById(int id);

    /**
     * Remove by entity {@link Record}.
     *
     * @param record - current {@link Record}.
     * @return removing {@link Record}.
     */
    Record remove(Record record);

    /**
     * Create current {@link} in {@link RecordRepository}.
     *
     * @param record said {@link Record}.
     * @return saving {@link Record}.
     */
    Record save(Record record);

    /**
     * Building {@link Record}'s object before saving .
     *
     * @param book which {@link User} taking.
     * @param user who take {@link Book}.
     * @return built {@link Record}.
     * @see IRecordService#save(Record)
     * @see RequestController#approve(Request, int)
     */
    Record build(Book book, User user);

    /**
     * Building {@link Record}'s object before saving .
     *
     * @param book        which {@link User} taking.
     * @param user        who take {@link Book}.
     * @param description about this {@link Record}. Optional.
     * @return built {@link Record}.
     * @see IRecordService#save(Record)
     * @see RequestController#approve(Request, int)
     */
    Record build(Book book, User user, String description);

    /**
     * Finding all {@link Record}s by ID.
     *
     * @param recordId id for searching in {@link RecordRepository}.
     * @return List {@link Record}s for current {@link Record}Id.
     */
    List<Record> findAllById(int recordId);
}
