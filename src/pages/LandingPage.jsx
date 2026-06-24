import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const features = [
    {
      icon: "🎓",
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with real-world experience"
    },
    {
      icon: "📱",
      title: "Interactive Learning",
      description: "Engage with dynamic content and hands-on projects"
    },
    {
      icon: "🌐",
      title: "Global Community",
      description: "Connect with learners and mentors from around the world"
    },
    {
      icon: "📊",
      title: "Track Progress",
      description: "Monitor your learning journey with detailed analytics"
    }
  ];

  const stats = [
    { value: "50K+", label: "Active Students" },
    { value: "200+", label: "Expert Instructors" },
    { value: "1,000+", label: "Courses Available" },
    { value: "4.9", label: "Average Rating" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      content: "This platform transformed my career. The courses are practical and engaging.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "Data Scientist",
      content: "Best learning platform I've ever used. The community support is incredible.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Product Manager",
      content: "The interactive approach makes learning enjoyable and effective.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$0",
      period: "/month",
      description: "Perfect for getting started",
      features: [
        "Access to 50+ free courses",
        "Basic progress tracking",
        "Community forum access",
        "Mobile app access"
      ],
      buttonText: "Get Started Free",
      buttonVariant: "btn-outline",
      popular: false
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      description: "Best for serious learners",
      features: [
        "Access to 500+ premium courses",
        "Advanced progress analytics",
        "1-on-1 mentor sessions",
        "Downloadable resources",
        "Priority support",
        "Certificate of completion"
      ],
      buttonText: "Start Pro Trial",
      buttonVariant: "btn-primary",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For teams and organizations",
      features: [
        "Unlimited course access",
        "Team management dashboard",
        "Custom learning paths",
        "API integration",
        "Dedicated account manager",
        "24/7 premium support",
        "Custom reporting"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "btn-outline",
      popular: false
    }
  ];

  // Smooth scroll function
  const handleScroll = (e, sectionId) => {
    e.preventDefault();
    const section = document.querySelector(sectionId);
    if (section) {
      const navbarHeight = 72;
      const sectionTop = section.offsetTop - navbarHeight;
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
  };

  // Handle Get Started button click
  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="brand-icon">📘</span>
            <span className="brand-text">Resource<span>Hub</span></span>
          </div>
          
          <div className="nav-links">
            <a href="#" onClick={(e) => handleScroll(e, '#features')}>Features</a>
            <a href="#" onClick={(e) => handleScroll(e, '#courses')}>Courses</a>
            <a href="#" onClick={(e) => handleScroll(e, '#about')}>About</a>
            <a href="#" onClick={(e) => handleScroll(e, '#pricing')}>Pricing</a>
          </div>

          <div className="nav-actions">
            {isLoggedIn ? (
              <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost">Log In</Link>
                <Link to="/register" className="btn btn-primary">Get Started</Link>
              </>
            )}
          </div>

          <button className="mobile-menu-btn" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              🚀 Join 50,000+ learners today
            </div>
            <h1 className="hero-title">
              Learn, Grow & <br />
              <span className="gradient-text">Achieve More</span>
            </h1>
            <p className="hero-description">
              Discover a world-class learning experience with expert-led courses, 
              interactive content, and a supportive community dedicated to your success.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-large" onClick={handleGetStarted}>
                {isLoggedIn ? 'Go to Dashboard' : 'Start Learning Free'}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
            <div className="hero-trust">
              <div className="trust-avatars">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&crop=face" alt="User" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" alt="User" />
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face" alt="User" />
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="User" />
                <div className="trust-count">+5K</div>
              </div>
              <div className="trust-text">
                <div className="stars">★★★★★</div>
                <span>4.9/5 from 2,000+ reviews</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-illustration">
              <div className="floating-card card-1">
                <span className="card-icon">📚</span>
                <div>
                  <h4>10+ Courses</h4>
                  <p>New this week</p>
                </div>
              </div>
              <div className="floating-card card-2">
                <span className="card-icon">⭐</span>
                <div>
                  <h4>4.9 Rating</h4>
                  <p>From 2k reviews</p>
                </div>
              </div>
              <div className="floating-card card-3">
                <span className="card-icon">👨‍🏫</span>
                <div>
                  <h4>Expert Led</h4>
                  <p>Industry pros</p>
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=500&fit=crop&crop=center"
                alt="Learning illustration"
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="courses-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Courses</span>
            <h2 className="section-title">Explore Our <span className="gradient-text">Course Library</span></h2>
            <p className="section-description">
              Choose from hundreds of courses across multiple disciplines. Learn at your own pace.
            </p>
          </div>
          <div className="courses-grid">
            <div className="course-card">
              <div className="course-icon">💻</div>
              <h3>Web Development</h3>
              <p>Full-stack development with modern frameworks</p>
              <span className="course-badge">Popular</span>
            </div>
            <div className="course-card">
              <div className="course-icon">🤖</div>
              <h3>AI & Machine Learning</h3>
              <p>Build intelligent systems with cutting-edge AI</p>
              <span className="course-badge">Trending</span>
            </div>
            <div className="course-card">
              <div className="course-icon">📊</div>
              <h3>Data Science</h3>
              <p>Analyze data and derive meaningful insights</p>
              <span className="course-badge">New</span>
            </div>
            <div className="course-card">
              <div className="course-icon">🔐</div>
              <h3>Cybersecurity</h3>
              <p>Protect systems and secure digital assets</p>
            </div>
            <div className="course-card">
              <div className="course-icon">🎨</div>
              <h3>UI/UX Design</h3>
              <p>Create beautiful and intuitive user experiences</p>
            </div>
            <div className="course-card">
              <div className="course-icon">☁️</div>
              <h3>Cloud Computing</h3>
              <p>Master cloud infrastructure and deployment</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <span className="section-tag">About Us</span>
              <h2 className="section-title">Empowering Learners <span className="gradient-text">Worldwide</span></h2>
              <p className="about-description">
                ResourceHub is dedicated to making quality education accessible to everyone. 
                We believe in the power of knowledge and the importance of continuous learning.
              </p>
              <div className="about-features">
                <div className="about-feature">
                  <span>🎯</span>
                  <div>
                    <h4>Our Mission</h4>
                    <p>To democratize education and make learning accessible to all</p>
                  </div>
                </div>
                <div className="about-feature">
                  <span>💡</span>
                  <div>
                    <h4>Our Vision</h4>
                    <p>Create a global community of lifelong learners and educators</p>
                  </div>
                </div>
                <div className="about-feature">
                  <span>🤝</span>
                  <div>
                    <h4>Our Values</h4>
                    <p>Quality, Accessibility, Community, and Innovation</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&h=400&fit=crop"
                alt="About us"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Features</span>
            <h2 className="section-title">Everything You Need to <span className="gradient-text">Succeed</span></h2>
            <p className="section-description">
              Our platform provides all the tools and resources you need to achieve your learning goals.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">{feature.icon}</span>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Pricing</span>
            <h2 className="section-title">Choose Your <span className="gradient-text">Learning Path</span></h2>
            <p className="section-description">
              Select the perfect plan that fits your learning needs and budget.
            </p>
          </div>

          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && (
                  <div className="popular-badge">Most Popular</div>
                )}
                <div className="pricing-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>
                  <div className="plan-price">
                    <span className="price">{plan.price}</span>
                    <span className="period">{plan.period}</span>
                  </div>
                </div>
                <ul className="plan-features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  to={plan.name === "Enterprise" ? "/contact" : (isLoggedIn ? "/dashboard" : "/register")} 
                  className={`btn ${plan.buttonVariant} btn-large pricing-btn`}
                >
                  {isLoggedIn ? "Go to Dashboard" : plan.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Testimonials</span>
            <h2 className="section-title">What Our <span className="gradient-text">Students Say</span></h2>
            <p className="section-description">
              Hear from real learners who have transformed their careers through our platform.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-content">"{testimonial.content}"</p>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} className="author-image" />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">
              Ready to Start Your <br />
              <span className="gradient-text">Learning Journey?</span>
            </h2>
            <p className="cta-description">
              Join thousands of students and start learning today. No credit card required.
            </p>
            <div className="cta-actions">
              <button className="btn btn-primary btn-large" onClick={handleGetStarted}>
                {isLoggedIn ? 'Go to Dashboard' : 'Get Started Free'}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;