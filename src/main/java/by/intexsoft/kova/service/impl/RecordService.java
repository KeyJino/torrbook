package by.intexsoft.kova.service.impl;

import by.intexsoft.kova.entity.Book;
import by.intexsoft.kova.entity.Record;
import by.intexsoft.kova.entity.User;
import by.intexsoft.kova.repository.RecordRepository;
import by.intexsoft.kova.service.IRecordService;
import by.intexsoft.kova.service.IService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecordService implements IRecordService, IService<Record> {

    private final
    RecordRepository recordRepository;

    public RecordService(RecordRepository recordRepository) {
        this.recordRepository = recordRepository;
    }

    @Override
    public Record findById(int id) {
        return recordRepository.findById(id).get();
    }

    @Override
    public List<Record> findAll() {
        return recordRepository.findAll();
    }

    @Override
    public Record findRecordByUserId(int userId) {
        Record record = new Record();
        for (Record item : recordRepository.findAll()) {
            record = item.user.getId().equals(userId) ? item : null;
        }
        return record;
    }

    @Override
    public Record findRecordByBookId(int bookId) {
        Record record = new Record();
        for (Record item : recordRepository.findAll()) {
            record = item.book.getId().equals(bookId) ? item : null;
        }
        return record;
    }

    @Override
    public Record create(Book book, User newOwnerUser) {
        Record record = new Record();
        record.book = book;
        record.user = newOwnerUser;
        recordRepository.save(record);
        return record;
    }

    @Override
    public Record create(Book book, User newOwnerUser, String description) {
        Record record = new Record();
        record.book = book;
        record.user = newOwnerUser;
        record.details = description;
        recordRepository.save(record);
        return record;
    }

    @Override
    public Record remove(Record record) {
        recordRepository.delete(record);
        return record;
    }

    @Override
    public Record removeById(int recordId) {
        Record record = findById(recordId);
        recordRepository.deleteById(recordId);
        return record;
    }

    @Override
    public Record updateRecordDescriptionById(int recordId, String description) {
        Record record = findById(recordId);
        record.details = description;
        recordRepository.save(record);
        return record;
    }
}
