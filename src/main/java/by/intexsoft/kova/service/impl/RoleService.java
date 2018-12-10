package by.intexsoft.kova.service.impl;

import by.intexsoft.kova.entity.Role;
import by.intexsoft.kova.repository.RoleRepository;
import by.intexsoft.kova.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService implements IRoleService {

    @Autowired
    RoleRepository roleRepository;

    @Override
    public Role findById(int id) {
        return roleRepository.findById(id).get();
    }
}
