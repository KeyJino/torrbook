package by.intexsoft.kova.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;


/**
 * Image Entity to {@link Book}.
 * Have two field:
 * id - unique identity.
 * url - local seat.
 */
@Entity
@Table(name = "image")
public class Image extends AbstractPersistable<Integer> {

    /**
     * Local url when image located.
     */
    @Column(name = "url")
    public String url;

}
