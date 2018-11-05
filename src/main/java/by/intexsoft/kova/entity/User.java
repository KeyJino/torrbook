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

    @Column(name = "about")
    public String about;

    @Column(name = "book_given")
    public int bookGiven;

    @Column(name = "book_taken")
    public int bookTaken;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="role_id")
    public Role role;
}