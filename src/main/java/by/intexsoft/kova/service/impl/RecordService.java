package by.intexsoft.kova.service.impl;

import by.intexsoft.kova.entity.Book;
import by.intexsoft.kova.entity.Record;
import by.intexsoft.kova.entity.User;
import by.intexsoft.kova.repository.RecordRepository;
import by.intexsoft.kova.service.IRecordService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * This class store records about deals between users with their books.
 */
@Service
public class RecordService implements IRecordService {

    private final
    RecordRepository recordRepository;

    public RecordService(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    /**
     * Finding {@link Record} in repository by ID.
     * @param id - {@link Record}'s ID.
     * @return {@link Record}.
     */
    @Override
    public Record findById(int id) {
        return recordRepository.findById(id).get();
    }

    /**
     * Finding all {@link Record}s from {@link RecordRepository}.
     * @return List of all {@link Record}.
     */
    @Override
    public List<Record> findAll() {
        return recordRepository.findAll();
    }

    /**
     * Search all {@link Record} in {@link RecordRepository} there is specified userId.
     * @param userId - specified attribute for searching {@link Record}.
     * @return all {@link Record} with {@link User}Id.
     */
    @Override
    public Record findRecordByUserId(int userId) {
        Record record = new Record();
        for (Record item : recordRepository.findAll()) {
            record = item.user.getId().equals(userId) ? item : null;
        }
        return record;
    }

    /**
     * Search all {@link Record} in {@link RecordRepository} there is specified userId.
     * @param bookId - specified attribute for searching {@link Record}.
     * @return all {@link Record} with {@link Book}Id.
     */
    @Override
    public Record findRecordByBookId(int bookId) {
        Record record = new Record();
        for (Record item : recordRepository.findAll()) {
            record = item.book.getId().equals(bookId) ? item : null;
        }
        return record;
    }

    /**
     * Creating new {@link Record} without description.
     * @param book - {@link Book} which will be given away.
     * @param newOwnerUser - new temporary owner {@link User}.
     * @return new {@link Record}.
     */
    @Override
    public Record create(Book book, User newOwnerUser) {
        Record record = new Record();
        record.book = book;
        record.user = newOwnerUser;
        recordRepository.save(record);
        return record;
    }

    /**
     * Creating new {@link Record} with description.
     * @param book - {@link Book} which will be given away.
     * @param newOwnerUser - new temporary owner {@link User}.
     * @param description - some details about current deal.
     * @return new {@link Record}.
     */
    @Override
    public Record create(Book book, User newOwnerUser, String description) {
        Record record = new Record();
        record.book = book;
        record.user = newOwnerUser;
        record.details = description;
        recordRepository.save(record);
        return record;
    }

    /**
     * Removing selected {@link Record} from {@link RecordRepository}
     * @param record - selected {@link Record}.
     * @return deleting {@link Record}.
     */
    @Override
    public Record remove(Record record) {
        recordRepository.delete(record);
        return record;
    }

    /**
     * Removing selected {@link Record} from {@link RecordRepository}, but using {@link Record}'s ID.
     * @param recordId - selected {@link Record}'s ID.
     * @return deleting {@link Record}.
     */
    @Override
    public Record removeById(int recordId) {
        Record record = findById(recordId);
        recordRepository.deleteById(recordId);
        return record;
    }

    /**
     * Method is updating {@link Record}'s description.
     * @param recordId - selected {@link Record}
     * @param description of {@link Record}
     * @return {@link Record} with new description.
     */
    @Override
    public Record updateRecordDescriptionById(int recordId, String description) {
        Record record = findById(recordId);
        record.details = description;
        recordRepository.save(record);
        return record;
    }
}
