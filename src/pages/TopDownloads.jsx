import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import { getAllDownloadCounts } from "../utils/helpers";
import "./TopResources.css";

function TopDownloads() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/resources/top-downloads")
      .then((res) => {
        const localCounts = getAllDownloadCounts();
        const resourcesWithLocalCounts = res.data.map(resource => ({
          ...resource,
          totalDownloads: (resource.downloadCount || 0) + (localCounts[resource.id] || 0)
        }));
        resourcesWithLocalCounts.sort((a, b) => b.totalDownloads - a.totalDownloads);
        setResources(resourcesWithLocalCounts);
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
              <span className="icon">🔥</span>
              <h1>Top Downloaded Resources</h1>
            </div>
            <p className="page-subtitle">Most popular resources in the community</p>
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
                      <span className="meta-item">⬇️ {resource.totalDownloads} downloads</span>
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

export default TopDownloads;