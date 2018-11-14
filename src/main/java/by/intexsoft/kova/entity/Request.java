package by.intexsoft.kova.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;

/**
 * Request table for {@link Book}.
 * User want to take book and he doing {@link Request}.
 */
@Entity
@Table(name = "request")
public class Request extends AbstractPersistable<Integer> {

    /**
     * State of request(2):
     * 1) true - MODER approve this request and user get book.
     * 2) false - on pending to approve or removing.
     */
    @Column(name = "state")
    public Boolean state;

    /**
     * This field contains {@link User} who take {@link Book}.
     */
    @ManyToOne
    @JoinColumn(name = "user_take_id")
    public User user;

    /**
     * {@link Book} which will be given to user.
     */
    @ManyToOne
    @JoinColumn(name = "book_id")
    public Book book;

}
