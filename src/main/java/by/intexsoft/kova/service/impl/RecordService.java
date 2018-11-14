package by.intexsoft.kova.service.impl;

import by.intexsoft.kova.controller.RequestController;
import by.intexsoft.kova.entity.Book;
import by.intexsoft.kova.entity.Record;
import by.intexsoft.kova.entity.Request;
import by.intexsoft.kova.entity.User;
import by.intexsoft.kova.repository.RecordRepository;
import by.intexsoft.kova.service.IRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * This class store {@link Record}s about deals between users with their books.
 *
 * @see RecordService
 */
@Service
public class RecordService implements IRecordService {

    @Autowired
    RecordRepository recordRepository;

    /**
     * Finding {@link Record} in repository by ID.
     *
     * @param id - {@link Record}'s ID.
     * @return {@link Record}.
     */
    @Override
    public Record findById(int id) {
        return recordRepository.findById(id).get();
    }

    /**
     * Finding all {@link Record}s from {@link RecordRepository}.
     *
     * @return List of all {@link Record}.
     */
    @Override
    public List<Record> findAll() {
        return recordRepository.findAll();
    }

    /**
     * Removing selected {@link Record} from {@link RecordRepository}.
     *
     * @param record - selected {@link Record}.
     * @return deleting {@link Record}.
     */
    @Override
    public Record remove(Record record) {
        recordRepository.delete(record);
        return record;
    }

    /**
     * Saving selected {@link Record} to {@link RecordRepository}.
     *
     * @param record to saving.
     * @return saving recorder.
     */
    @Override
    public Record save(Record record) {
        recordRepository.save(record);
        return record;
    }

    /**
     * Building {@link Record}'s object before saving .
     *
     * @param book which {@link User} taking.
     * @param user who take {@link Book}.
     * @return built {@link Record}.
     * @see IRecordService#save(Record)
     * @see RequestController#approve(Request, int)
     */
    @Override
    public Record build(Book book, User user) {
        Record record = new Record();
        record.user = user;
        record.book = book;
        return record;
    }

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
    @Override
    public Record build(Book book, User user, String description) {
        Record record = new Record();
        record.user = user;
        record.book = book;
        record.description = description;
        return record;
    }

    /**
     * Finding all {@link Record}s by ID.
     *
     * @param recordId id for searching in {@link RecordRepository}.
     * @return List {@link Record}s for current {@link Record}Id.
     */
    @Override
    public List<Record> findAllById(int recordId) {
        return recordRepository.findAllById(recordId);
    }

    /**
     * Removing selected {@link Record} from {@link RecordRepository}, but using {@link Record}'s ID.
     *
     * @param recordId - selected {@link Record}'s ID.
     * @return deleting {@link Record}.
     */
    @Override
    public Record removeById(int recordId) {
        Record record = findById(recordId);
        recordRepository.deleteById(recordId);
        return record;
    }
}
