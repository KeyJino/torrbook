package by.intexsoft.kova.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;


/**
 * This is entity for book table. Have a 5 fields:
 * id (we use AbstractPersistable) - ID of book,
 * title - book's name
 * author - book's author,
 * description - short description to book, now - 230 character,
 * user_id - user's id who owns this book.
 */
@Entity
@Table(name = "book")
public class Book extends AbstractPersistable<Integer> {

    /**
     * Book's name;
     */
    @Column(name = "title")
    public String title;

    /**
     * Book's author;
     */
    @Column(name = "author")
    public String author;

    /**
     * Book's description;
     */
    @Column(name = "description")
    public String description;

    /**
     * Owner of book;
     */
    @ManyToOne
    @JoinColumn(name = "user_id")
    public User user;

    /**
     * State of book(2):
     * true - is vacant and maybe taking;
     * false - busy, on hand.
     */
    @Column(name = "state")
    public boolean state;

    /**
     * Request's state:
     * true - have requests;
     * false - hasn't requests.
     */
    @Column(name = "request")
    public boolean request;

    /**
     * Url to current book's image.
     */
    @ManyToOne
    @JoinColumn(name = "image_id")
    public Image image;

}
