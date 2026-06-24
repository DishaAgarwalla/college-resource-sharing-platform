package com.college.resource.dto;

public class LoginResponse {

    private String token;
    private UserData user;

    public LoginResponse() {
    }

    // Constructor for token only
    public LoginResponse(String token) {
        this.token = token;
    }

    // Constructor for token + user
    public LoginResponse(String token, UserData user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserData getUser() {
        return user;
    }

    public void setUser(UserData user) {
        this.user = user;
    }

    public static class UserData {

        private Long id;
        private String name;
        private String email;

        public UserData() {
        }

        public UserData(
                Long id,
                String name,
                String email) {

            this.id = id;
            this.name = name;
            this.email = email;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }
}