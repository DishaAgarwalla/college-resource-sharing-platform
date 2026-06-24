import "./Features.css";

const Features = () => {
  const features = [
    {
      icon: "📚",
      title: "Resource Sharing",
      description: "Upload and share educational resources with the community. Share your knowledge and help others learn.",
      color: "#3b82f6"
    },
    {
      icon: "🔖",
      title: "Bookmark System",
      description: "Save your favorite resources for later. Never lose track of important study materials.",
      color: "#8b5cf6"
    },
    {
      icon: "⭐",
      title: "Rating & Reviews",
      description: "Rate resources and help others find the best content. Community-driven quality control.",
      color: "#f59e0b"
    },
    {
      icon: "📊",
      title: "Download Analytics",
      description: "Track downloads and popularity of your resources. See how your content helps others.",
      color: "#10b981"
    },
    {
      icon: "👥",
      title: "Community",
      description: "Connect with students and educators. Build your network and collaborate on projects.",
      color: "#ec4899"
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Access the platform from any device. Desktop, tablet, or mobile - it works everywhere.",
      color: "#06b6d4"
    }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <div className="section-header">
          <h2>Why Choose ResourceHub?</h2>
          <p>Everything you need to share and discover educational content</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon" style={{ background: `${feature.color}15` }}>
                <span style={{ color: feature.color }}>{feature.icon}</span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;