# College Resource Sharing Platform  

A full-stack web application that enables students and faculty to upload, share, manage, and access academic resources efficiently within a college environment.

---

## Features

### Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Role-Based Access Control (User/Admin)
* Protected Routes
* Logout Functionality

### User Features

* Upload Study Resources
* Download Resources
* Search Resources
* Filter Resources by Subject
* Sort Resources by Downloads and Ratings
* Bookmark Resources
* Rate Resources (1–5 Stars)
* View Personal Uploads
* Edit Uploaded Resources
* Delete Uploaded Resources
* User Dashboard
* User Profile

### Admin Features

* Admin Dashboard
* Approve Uploaded Resources
* Reject Uploaded Resources
* Manage Users
* Delete Users

### Analytics

* Top Downloaded Resources
* Top Rated Resources
* Download Count Tracking
* Average Rating Calculation

---

## Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* CSS

### Backend

* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate

### Database

* PostgreSQL

### Tools

* Postman
* Git & GitHub
* IntelliJ IDEA / STS
* VS Code

---

## Project Structure

### Frontend

```bash
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── api/
│   ├── utils/
│   └── App.jsx
│
├── package.json
└── vite.config.js
```

### Backend

```bash
backend/
│
├── controller/
├── service/
├── repository/
├── entity/
├── dto/
├── security/
└── ResourceSharingApplication.java
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/DishaAgarwalla/college-resource-sharing-platform.git
```

---

## Backend Setup

1. Open backend project in STS/IntelliJ.
2. Configure PostgreSQL database in:

```properties
application.properties
```

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/resource_db
spring.datasource.username=postgres
spring.datasource.password=your_password
```

3. Run the Spring Boot application.

Backend runs on:

```bash
http://localhost:8080
```

---

## Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## Author

**Disha Agarwalla**

GitHub: https://github.com/DishaAgarwalla

---

## License

This project is developed for educational purposes.
