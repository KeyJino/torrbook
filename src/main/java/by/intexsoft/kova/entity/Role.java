package by.intexsoft.kova.entity;

import org.springframework.data.jpa.domain.AbstractPersistable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Roles table have roles for application.
 * Have 3 fields:
 * id - № transaction,
 * title - role's name,
 * power - privilege level. User - 0, Moderator - 1, Admin - 2.
 */
@Entity
@Table(name = "roles")
public class Role extends AbstractPersistable<Integer> {

    /**
     * Title of role users.
     */
    @Column(name = "title")
    public String title;

    /**
     * Some counter which shows their might.
     */
    @Column(name = "power")
    public String power;

}
