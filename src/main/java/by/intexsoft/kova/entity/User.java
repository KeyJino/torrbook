package by.intexsoft.kova.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;

/**
 * User entity
 */
@Entity
public class User extends AbstractPersistable<Integer> {

    /**
     * Contains user name
     */
    @Column
    public String username;

    /**
     * Contains user password
     */
    @Column
    public String password;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="role_id")
    public Role role;
}