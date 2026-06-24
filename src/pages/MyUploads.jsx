import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/Toast";
import { SkeletonCard } from "../components/Skeleton";
import { downloadFile, incrementDownloadCount, getLocalDownloadCount } from "../utils/helpers";
import { ConfirmationModal } from "../components/ConfirmationModal";
import FileIcon from "../components/FileIcon";
import "./MyUploads.css";

function MyUploads() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, resourceId: null });
  const { toasts, showToast, removeToast } = useToast();

  const fetchMyUploads = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    API.get(`/resources/user/${userId}`)
      .then((res) => {
        const resourcesWithLocalCounts = res.data.map(resource => ({
          ...resource,
          localDownloadCount: getLocalDownloadCount(resource.id)
        }));
        setResources(resourcesWithLocalCounts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching uploads:", err);
        if (err.response && err.response.status === 500) {
          showToast("Server error. Please try again later.", "error");
        } else {
          showToast("Failed to load your uploads. Please try again.", "error");
        }
        setResources([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMyUploads();
  }, [showToast]);

  const deleteResource = async (id) => {
    try {
      await API.delete(`/resources/${id}`);
      setResources(resources.filter((r) => r.id !== id));
      showToast("🗑️ Resource Deleted Successfully", "success");
      setDeleteModal({ isOpen: false, resourceId: null });
    } catch (error) {
      console.error("Delete error:", error);
      showToast("❌ Delete Failed. Please try again.", "error");
    }
  };

  const downloadResource = async (resource) => {
    setDownloadingId(resource.id);
    try {
      const fileUrl = resource.fileUrl;
      const filename = `${resource.title}.${fileUrl.split('.').pop() || 'pdf'}`;
      
      await downloadFile(fileUrl, filename);
      
      const newCount = incrementDownloadCount(resource.id);
      
      setResources(prevResources => 
        prevResources.map(r => 
          r.id === resource.id 
            ? { ...r, localDownloadCount: newCount }
            : r
        )
      );
      
      showToast(`⬇️ Download started! (${newCount} downloads)`, "success");
    } catch (error) {
      console.error('Download error:', error);
      showToast("❌ Download failed. Please try again.", "error");
    } finally {
      setDownloadingId(null);
    }
  };

  const getDisplayDownloadCount = (resource) => {
    return resource.localDownloadCount || resource.downloadCount || 0;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page-wrapper">
          <div className="container">
            <div className="page-header">
              <div className="page-title">
                <span className="icon">📁</span>
                <h1>My Uploads</h1>
              </div>
              <p className="page-subtitle">Resources you've shared with the community</p>
            </div>
            <SkeletonCard count={4} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, resourceId: null })}
        onConfirm={() => deleteResource(deleteModal.resourceId)}
        title="Delete Resource"
        message="Are you sure you want to delete this resource? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />

      <div className="page-wrapper">
        <div className="container">
          <div className="page-header">
            <div className="page-title">
              <span className="icon">📁</span>
              <h1>My Uploads</h1>
            </div>
            <p className="page-subtitle">Resources you've shared with the community</p>
          </div>

          {resources.length === 0 ? (
            <div className="empty-state">
              <div className="icon">📤</div>
              <h3>No Uploads Yet</h3>
              <p>Share your first resource with the community</p>
              <a href="/upload" className="btn btn-primary" style={{ marginTop: "1rem" }}>
                Upload Resource
              </a>
            </div>
          ) : (
            <div className="my-uploads-grid">
              {resources.map((resource) => (
                <div key={resource.id} className="upload-card">
                  <div className="upload-header">
                    <div className="upload-info">
                      <FileIcon filename={resource.fileUrl} size="small" />
                      <div>
                        <h3 className="upload-title">{resource.title}</h3>
                        <div className="upload-subject">📂 {resource.subject}</div>
                      </div>
                    </div>
                    <span className={`badge badge-${resource.status?.toLowerCase() || "pending"}`}>
                      {resource.status || "Pending"}
                    </span>
                  </div>

                  <div className="upload-stats">
                    <span className="stat-item">
                      <span className="stat-icon">⬇️</span> {getDisplayDownloadCount(resource)} downloads
                    </span>
                    <span className="stat-item">
                      <span className="stat-icon">⭐</span> {resource.averageRating?.toFixed(1) || 0}
                    </span>
                    <span className="stat-item">
                      <span className="stat-icon">🗳️</span> {resource.totalRatings || 0} ratings
                    </span>
                  </div>

                  <div className="upload-actions">
                    <button 
                      className="btn-download" 
                      onClick={() => downloadResource(resource)}
                      disabled={downloadingId === resource.id}
                    >
                      {downloadingId === resource.id ? '⏳' : '⬇️'} 
                      {downloadingId === resource.id ? 'Downloading...' : 'Download'}
                    </button>
                    <Link to={`/edit-resource/${resource.id}`}>
                      <button className="btn-edit">✏️ Edit</button>
                    </Link>
                    <button 
                      className="btn-delete" 
                      onClick={() => setDeleteModal({ isOpen: true, resourceId: resource.id })}
                    >
                      🗑️ Delete
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

export default MyUploads;