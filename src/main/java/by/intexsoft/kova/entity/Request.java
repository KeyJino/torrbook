package by.intexsoft.kova.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.*;

@Entity
@Table(name = "request")
public class Request extends AbstractPersistable<Integer> {

    @Column(name = "state")
    public Boolean state;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_take_id")
    public User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "book_id")
    public Book book;

}
