import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/Toast";
import { SkeletonCard } from "../components/Skeleton";
import { downloadFile, incrementDownloadCount, getLocalDownloadCount } from "../utils/helpers";
import ShareButtons from "../components/ShareButtons";
import SearchAutocomplete from "../components/SearchAutocomplete";
import FileIcon from "../components/FileIcon";
import useSearchHistory from "../hooks/useSearchHistory";
import useDebounce from "../hooks/useDebounce";
import "./Resources.css";

function Resources() {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);
  const [showShare, setShowShare] = useState(null);
  const { toasts, showToast, removeToast } = useToast();
  const { history, addSearch } = useSearchHistory();
  const debouncedSearch = useDebounce(search, 300);

  const fetchResources = () => {
    setLoading(true);
    API.get("/resources")
      .then((res) => {
        // Filter out avatar/profile resources
        const filteredResources = res.data.filter(resource => {
          const isAvatar = 
            resource.subject?.toLowerCase() === 'profile' ||
            resource.subject?.toLowerCase() === 'avatar' ||
            resource.title?.toLowerCase().includes('avatar') ||
            resource.title?.toLowerCase().includes("'s avatar");
          return !isAvatar;
        });
        
        const resourcesWithLocalCounts = filteredResources.map(resource => ({
          ...resource,
          localDownloadCount: getLocalDownloadCount(resource.id)
        }));
        setResources(resourcesWithLocalCounts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        showToast("Failed to load resources", "error");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchResources();
  }, [showToast]);

  // Auto-save search to history
  useEffect(() => {
    if (debouncedSearch.length > 2) {
      addSearch(debouncedSearch);
    }
  }, [debouncedSearch, addSearch]);

  const bookmarkResource = async (resourceId) => {
    const userId = localStorage.getItem("userId");
    try {
      await API.post("/bookmarks", {
        user: { id: userId },
        resource: { id: resourceId },
      });
      showToast("📌 Bookmarked Successfully!", "success");
    } catch (err) {
      console.log(err);
      showToast("❌ Bookmark Failed", "error");
    }
  };

  const rateResource = async (resourceId, score) => {
    const userId = localStorage.getItem("userId");
    try {
      await API.post("/ratings", {
        ratingValue: score,
        user: { id: userId },
        resource: { id: resourceId },
      });
      showToast(`⭐ Rated ${score} Stars!`, "success");
    } catch (err) {
      console.log(err);
      showToast("❌ Rating Failed", "error");
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

  let filteredResources = resources.filter(
    (resource) =>
      (resource.title?.toLowerCase().includes(search.toLowerCase()) ||
        resource.subject?.toLowerCase().includes(search.toLowerCase())) &&
      (category === "ALL" || resource.subject === category)
  );

  if (sortBy === "downloads") {
    filteredResources.sort((a, b) => getDisplayDownloadCount(b) - getDisplayDownloadCount(a));
  }
  if (sortBy === "ratings") {
    filteredResources.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
  }

  const subjects = ["ALL", "DBMS", "OS", "CN", "JAVA", "DSA", "PYTHON", "WEB", "AI"];
  const suggestions = [...new Set(resources.map(r => r.subject))];

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page-wrapper">
          <div className="container">
            <div className="page-header">
              <div className="page-title">
                <span className="icon">📚</span>
                <h1>All Resources</h1>
              </div>
              <p className="page-subtitle">Discover and share educational resources</p>
            </div>
            <SkeletonCard count={6} />
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
              <span className="icon">📚</span>
              <h1>All Resources</h1>
            </div>
            <p className="page-subtitle">Discover and share educational resources</p>
          </div>

          <div className="filters-bar">
            <SearchAutocomplete
              items={suggestions}
              value={search}
              onChange={setSearch}
              placeholder="🔍 Search by title or subject..."
              loading={loading}
            />
            <select className="form-select filter-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              {subjects.map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
            <select className="form-select filter-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="">Sort By</option>
              <option value="downloads">🔥 Most Downloaded</option>
              <option value="ratings">⭐ Highest Rated</option>
            </select>
          </div>

          {filteredResources.length === 0 ? (
            <div className="empty-state">
              <div className="icon">📭</div>
              <h3>No Resources Found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="resources-grid">
              {filteredResources.map((resource) => (
                <div key={resource.id} className="resource-card">
                  <div className="resource-header">
                    <div className="resource-info">
                      <FileIcon filename={resource.fileUrl} size="medium" />
                      <div>
                        <h3 className="resource-title">{resource.title}</h3>
                        <div className="resource-meta">
                          <span className="meta-item">📂 {resource.subject}</span>
                          <span className="meta-item">👤 {resource.user?.name || "Unknown"}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`badge badge-${resource.status?.toLowerCase() || "pending"}`}>
                      {resource.status || "Pending"}
                    </span>
                  </div>

                  <div className="resource-stats">
                    <span className="stat-item">
                      <span className="stat-icon">⬇️</span> {getDisplayDownloadCount(resource)}
                    </span>
                    <span className="stat-item">
                      <span className="stat-icon">⭐</span> {resource.averageRating?.toFixed(1) || 0}
                    </span>
                    <span className="stat-item">
                      <span className="stat-icon">🗳️</span> {resource.totalRatings || 0} ratings
                    </span>
                  </div>

                  <div className="resource-actions">
                    <button 
                      className="btn btn-primary btn-sm" 
                      onClick={() => downloadResource(resource)}
                      disabled={downloadingId === resource.id}
                    >
                      {downloadingId === resource.id ? '⏳ Downloading...' : '⬇️ Download'}
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => bookmarkResource(resource.id)}>
                      🔖 Bookmark
                    </button>
                    <button 
                      className="btn btn-secondary btn-sm" 
                      onClick={() => setShowShare(showShare === resource.id ? null : resource.id)}
                    >
                      🔗 Share
                    </button>
                  </div>

                  {showShare === resource.id && (
                    <div className="resource-share">
                      <ShareButtons 
                        title={resource.title}
                        url={window.location.href}
                      />
                    </div>
                  )}

                  <div className="resource-rating">
                    <span className="rating-label">Rate this:</span>
                    {[1, 2, 3, 4, 5].map((score) => (
                      <button
                        key={score}
                        className="rating-star"
                        onClick={() => rateResource(resource.id, score)}
                      >
                        {score}⭐
                      </button>
                    ))}
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

export default Resources;