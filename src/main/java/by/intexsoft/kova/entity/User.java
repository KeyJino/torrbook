package by.intexsoft.kova.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;

/**
 * User entity
 */
@Entity
@Table(name = "users")
public class User extends AbstractPersistable<Integer> {
    /**
     * Contains user name
     */
    @Column(name = "username")
    public String username;

    /**
     * Contains user password
     */
    @Column(name = "password")
    public String password;

    /**
     * User description
     */
    @Column(name = "about")
    public String about;

    /**
     * How many give {@link Book}'s.
     * Need for counting user's rating.
     */
    @Column(name = "book_given")
    public int bookGiven;

    /**
     * How many take {@link Book}'s.
     * Need for counting user's rating.
     */
    @Column(name = "book_taken")
    public int bookTaken;

    /**
     * User role in application.
     */
    @ManyToOne
    @JoinColumn(name = "role_id")
    public Role role;

    /**
     * User will be banned by ADMIN;
     */
    @Column(name = "status")
    public boolean status;
}