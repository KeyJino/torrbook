package by.intexsoft.kova.service;

import by.intexsoft.kova.entity.Role;

public interface IRoleService {

    /**
     * Finding roles by Id.
     *
     * @param id current Id for Roles.
     * @return {@link Role}.
     */
    Role findById(int id);

}
