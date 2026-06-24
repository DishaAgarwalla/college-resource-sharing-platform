import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");

  // Check if already logged in - redirect to dashboard
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Minimum 6 characters";
    }

    if (!formData.department) {
      newErrors.department = "Department is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
    setRegisterError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setRegisterError("");
    
    try {
      const response = await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        department: formData.department,
      });

      console.log("Registration response:", response.data);

      const data = response.data;
      
      if (data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("role", data.user.role || "USER");
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else if (data.id) {
        localStorage.setItem("token", "dummy-token");
        localStorage.setItem("userId", data.id);
        localStorage.setItem("role", data.role || "USER");
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/dashboard");
      } else {
        // If registration successful but no token, redirect to login
        navigate("/login?registered=true");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setRegisterError(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      {/* Top Header */}
      <div className="register-header">
        <Link to="/" className="header-logo">
          <span>📘</span>
          <span>ResourceHub</span>
        </Link>
        <div className="header-actions">
          <span>Already a member?</span>
          <Link to="/login" className="signin-btn">Sign In</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="register-main">
        <div className="register-content">
          {/* Left Side - Illustration */}
          <div className="register-illustration">
            <div className="illustration-box">
              <div className="illustration-content">
                <div className="illustration-icon">🚀</div>
                <h2>Join the Community</h2>
                <p>Connect with learners and educators from around the world</p>
                
                <div className="illustration-features">
                  <div className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>Share your knowledge</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>Discover new resources</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>Rate & review content</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-check">✓</span>
                    <span>Community support</span>
                  </div>
                </div>

                <div className="illustration-testimonial">
                  <div className="testimonial-avatars">
                    <div className="testimonial-avatar-placeholder">👩‍🎓</div>
                    <div className="testimonial-avatar-placeholder">👨‍🎓</div>
                    <div className="testimonial-avatar-placeholder">👩‍🏫</div>
                    <span className="testimonial-count">+10K</span>
                  </div>
                  <p>"Best platform for sharing educational resources!"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="register-form-wrapper">
            <div className="form-card">
              <div className="form-card-header">
                <h1>Create Account</h1>
                <p>Start your learning journey today</p>
              </div>

              {/* Error Message */}
              {registerError && (
                <div className="error-message-box">
                  ❌ {registerError}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="register-form">
                <div className="form-field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "error" : ""}
                  />
                  {errors.name && <span className="error-msg">{errors.name}</span>}
                </div>

                <div className="form-field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && <span className="error-msg">{errors.email}</span>}
                </div>

                <div className="form-field">
                  <label>Password</label>
                  <div className="password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create a password (min 6 characters)"
                      value={formData.password}
                      onChange={handleChange}
                      className={errors.password ? "error" : ""}
                    />
                    <button
                      type="button"
                      className="toggle-visibility"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.password && <span className="error-msg">{errors.password}</span>}
                </div>

                <div className="form-field">
                  <label>Department</label>
                  <input
                    type="text"
                    name="department"
                    placeholder="e.g., Computer Science"
                    value={formData.department}
                    onChange={handleChange}
                    className={errors.department ? "error" : ""}
                  />
                  {errors.department && <span className="error-msg">{errors.department}</span>}
                </div>

                <button type="submit" className="submit-button" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="loader"></span>
                      Creating Account...
                    </>
                  ) : (
                    "Create Account →"
                  )}
                </button>
              </form>

              <p className="form-footer">
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;