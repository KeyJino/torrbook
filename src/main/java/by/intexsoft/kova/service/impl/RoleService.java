package by.intexsoft.kova.service.impl;

import by.intexsoft.kova.entity.Role;
import by.intexsoft.kova.repository.RoleRepository;
import by.intexsoft.kova.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Congaing method to manage {@link RoleRepository}.
 */
@Service
public class RoleService implements IRoleService {

    @Autowired
    RoleRepository roleRepository;

    /**
     * Finding roles by Id.
     *
     * @param id current Id for Roles.
     * @return {@link Role}.
     */
    @Override
    public Role findById(int id) {
        return roleRepository.findById(id).get();
    }
}
