package by.intexsoft.kova.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;

/**
 * Record is intermediate table. Have 3 fields:
 * id - № transaction,
 * description - description of the transaction,
 * book_id - book's id from books,
 * user_id - user's id who took this book
 */
@Entity
@Table(name = "holder")
public class Record extends AbstractPersistable<Integer> {

    /**
     * Some description of transaction;
     */
    @Column(name = "description")
    public String description;

    /**
     * This book given away;
     */
    @ManyToOne
    @JoinColumn(name = "book_id")
    public Book book;

    /**
     * Current owner of book;
     */
    @ManyToOne
    @JoinColumn(name = "user_take_id")
    public User user;

}
