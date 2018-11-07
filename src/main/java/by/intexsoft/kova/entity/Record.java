package by.intexsoft.kova.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;

/**
 * Record is intermediate table. Have 3 fields:
 * id - № transaction,
 * details - details of the transaction,
 * book_id - book's id from books,
 * user_id - user's id who took this book
 */
@Entity
@Table(name = "holder")
public class Record extends AbstractPersistable<Integer> {

    /**
     * Some details of transaction;
     */
    @Column(name = "details")
    public String details;

    /**
     * This book given away;
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="book_id")
    public Book book;

    /**
     * Current owner of book;
     */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="user_take_id")
    public User user;

}
