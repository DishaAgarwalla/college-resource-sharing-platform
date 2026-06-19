package com.college.resource.controller;

import com.college.resource.dto.LoginRequest;
import com.college.resource.dto.LoginResponse;
import com.college.resource.entity.User;
import com.college.resource.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return service.getAllUsers();
    }

    @PostMapping
    public User addUser(@RequestBody User user) {
        return service.save(user);
    }

    @PostMapping("/login")
    public Object login(@RequestBody LoginRequest request) {

        User user = service.login(
                request.getEmail(),
                request.getPassword()
        );

        if (user == null) {
            return "Invalid Email or Password";
        }

        LoginResponse.UserData userData =
                new LoginResponse.UserData(
                        user.getId(),
                        user.getName(),
                        user.getEmail()
                );

        return new LoginResponse(
                "Login Successful",
                userData
        );
    }
    @PutMapping("/make-admin/{id}")
    public User makeAdmin(
            @PathVariable Long id) {

        return service.makeAdmin(id);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(
            @PathVariable Long id) {

        User user =
                service.getUserById(id);

        if (user == null) {

            return "User Not Found";
        }

        service.deleteUser(id);

        return "User Deleted Successfully";
    }
}