import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import "./TopResources.css";

function TopRatedResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/resources/top-rated")
      .then((res) => {
        setResources(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page-wrapper">
          <div className="container">
            <div className="loading-spinner">Loading...</div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <div className="container">
          <div className="page-header">
            <div className="page-title">
              <span className="icon">⭐</span>
              <h1>Top Rated Resources</h1>
            </div>
            <p className="page-subtitle">Highest quality resources as rated by the community</p>
          </div>

          {resources.length === 0 ? (
            <div className="empty-state">
              <div className="icon">📭</div>
              <h3>No Resources Found</h3>
            </div>
          ) : (
            <div className="top-resources-grid">
              {resources.map((resource, index) => (
                <div key={resource.id} className="top-resource-card">
                  <div className="rank-badge">#{index + 1}</div>
                  <div className="top-resource-content">
                    <h3 className="resource-title">{resource.title}</h3>
                    <div className="resource-meta">
                      <span className="meta-item">📂 {resource.subject}</span>
                      <span className="meta-item">⭐ {resource.averageRating?.toFixed(1) || 0}</span>
                      <span className="meta-item">🗳️ {resource.totalRatings || 0} ratings</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TopRatedResources;