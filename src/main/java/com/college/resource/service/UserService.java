package com.college.resource.service;

import com.college.resource.entity.User;
import com.college.resource.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public List<User> getAllUsers() {
        return repository.findAll();
    }

    public User save(User user) {
        return repository.save(user);
    }

    public User getUserByEmail(String email) {
        return repository.findByEmail(email);
    }

    public User registerUser(User user) {

        User existing =
                repository.findByEmail(user.getEmail());

        if (existing != null) {
            return null;
        }

        user.setRole("USER");

        return repository.save(user);
    }

    public User login(
            String email,
            String password) {

        User user =
                repository.findByEmail(email);

        if (user == null) {
            return null;
        }

        if (!user.getPassword().equals(password)) {
            return null;
        }

        return user;
    }
    public User getUserById(Long id) {

        return repository.findById(id)
                .orElse(null);
    }

    public User makeAdmin(Long id) {

        User user = getUserById(id);

        if (user == null) {
            return null;
        }

        user.setRole("ADMIN");

        return repository.save(user);
    }

    public void deleteUser(Long id) {

        repository.deleteById(id);
    }
}