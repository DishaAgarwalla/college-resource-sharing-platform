package com.college.resource.controller;
 
import com.college.resource.dto.LoginRequest;
import com.college.resource.dto.LoginResponse;
import com.college.resource.dto.RegisterRequest; 
import com.college.resource.entity.User;
import com.college.resource.security.JwtUtil;
import com.college.resource.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(
            UserService userService,
            JwtUtil jwtUtil) {

        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public String register(
            @RequestBody RegisterRequest request) {

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setDepartment(request.getDepartment());

        // Default Role
        user.setRole("USER");

        User saved = userService.registerUser(user);

        if (saved == null) {
            return "Email Already Exists";
        }

        return "User Registered Successfully";
    }

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request) {

        User user =
                userService.login(
                        request.getEmail(),
                        request.getPassword());

        if (user == null) {
            return new LoginResponse(
                    "Invalid Credentials",
                    null);
        }

        String token =
                jwtUtil.generateToken(
                        user.getEmail());

        LoginResponse.UserData userData =
                new LoginResponse.UserData(
                        user.getId(),
                        user.getName(),
                        user.getEmail());

        return new LoginResponse(
                token,
                userData);
    }
}
