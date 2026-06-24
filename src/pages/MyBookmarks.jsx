import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/Toast";
import { SkeletonCard } from "../components/Skeleton";
import { downloadFile, getLocalDownloadCount } from "../utils/helpers";
import "./Bookmarks.css";

function MyBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    API.get(`/bookmarks/user/${userId}`)
      .then((res) => {
        const bookmarksWithLocalCounts = res.data.map(bookmark => ({
          ...bookmark,
          resource: {
            ...bookmark.resource,
            localDownloadCount: getLocalDownloadCount(bookmark.resource?.id)
          }
        }));
        setBookmarks(bookmarksWithLocalCounts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        showToast("Failed to load bookmarks", "error");
        setLoading(false);
      });
  }, [showToast]);

  const downloadResource = async (resource) => {
    if (!resource) {
      showToast("❌ Resource not found", "error");
      return;
    }
    
    setDownloadingId(resource.id);
    try {
      const fileUrl = resource.fileUrl;
      const filename = `${resource.title}.${fileUrl.split('.').pop() || 'pdf'}`;
      await downloadFile(fileUrl, filename);
      showToast("⬇️ Download started!", "success");
    } catch (error) {
      console.error('Download error:', error);
      showToast("❌ Download failed. Please try again.", "error");
    } finally {
      setDownloadingId(null);
    }
  };

  const getDisplayDownloadCount = (resource) => {
    return resource?.localDownloadCount || resource?.downloadCount || 0;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page-wrapper">
          <div className="container">
            <div className="page-header">
              <div className="page-title">
                <span className="icon">🔖</span>
                <h1>My Bookmarks</h1>
              </div>
              <p className="page-subtitle">Resources you've saved for later</p>
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
      <div className="page-wrapper">
        <div className="container">
          <div className="page-header">
            <div className="page-title">
              <span className="icon">🔖</span>
              <h1>My Bookmarks</h1>
            </div>
            <p className="page-subtitle">Resources you've saved for later</p>
          </div>

          {bookmarks.length === 0 ? (
            <div className="empty-state">
              <div className="icon">📭</div>
              <h3>No Bookmarks</h3>
              <p>Start saving resources by clicking the bookmark button</p>
              <a href="/resources" className="btn btn-primary" style={{ marginTop: "1rem" }}>
                Browse Resources
              </a>
            </div>
          ) : (
            <div className="bookmarks-grid">
              {bookmarks.map((bookmark) => {
                const resource = bookmark.resource;
                return (
                  <div key={bookmark.id} className="bookmark-card">
                    <div className="bookmark-content">
                      <h3 className="bookmark-title">{resource?.title || "Untitled"}</h3>
                      <div className="bookmark-meta">
                        <span className="meta-item">
                          <span className="meta-icon">📂</span> {resource?.subject || "No subject"}
                        </span>
                        <span className="meta-item">
                          <span className="meta-icon">⬇️</span> {getDisplayDownloadCount(resource)} downloads
                        </span>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => downloadResource(resource)}
                      disabled={downloadingId === resource?.id}
                    >
                      {downloadingId === resource?.id ? '⏳ Downloading...' : '⬇️ Download'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyBookmarks;