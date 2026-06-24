import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = () => {
    setLoading(true);
    API.get("/resources")
      .then((res) => {
        const pending = res.data.filter((r) => r.status === "PENDING");
        setResources(pending);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const approveResource = (id) => {
    API.put(`/resources/approve/${id}`)
      .then(() => {
        alert("✅ Resource Approved");
        loadResources();
      })
      .catch((err) => console.log(err));
  };

  const rejectResource = (id) => {
    API.put(`/resources/reject/${id}`)
      .then(() => {
        alert("❌ Resource Rejected");
        loadResources();
      })
      .catch((err) => console.log(err));
  };

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
              <span className="icon">⚙️</span>
              <h1>Admin Dashboard</h1>
            </div>
            <p className="page-subtitle">Review and manage pending resources</p>
          </div>

          {resources.length === 0 ? (
            <div className="empty-state">
              <div className="icon">✅</div>
              <h3>All Clear!</h3>
              <p>No pending resources to review</p>
            </div>
          ) : (
            <div className="admin-resources-grid">
              {resources.map((resource) => (
                <div key={resource.id} className="admin-resource-card">
                  <div className="admin-resource-header">
                    <h3 className="resource-title">{resource.title}</h3>
                    <span className="badge badge-pending">Pending</span>
                  </div>

                  <div className="resource-meta">
                    <span className="meta-item">
                      <span className="meta-icon">📂</span> {resource.subject}
                    </span>
                    <span className="meta-item">
                      <span className="meta-icon">👤</span> {resource.user?.name || "Unknown"}
                    </span>
                    <span className="meta-item">
                      <span className="meta-icon">📧</span> {resource.user?.email || "No email"}
                    </span>
                  </div>

                  <div className="admin-actions">
                    <button className="btn btn-success" onClick={() => approveResource(resource.id)}>
                      ✅ Approve
                    </button>
                    <button className="btn btn-danger" onClick={() => rejectResource(resource.id)}>
                      ❌ Reject
                    </button>
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

export default AdminDashboard;