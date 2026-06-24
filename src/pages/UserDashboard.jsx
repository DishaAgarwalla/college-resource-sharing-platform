import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import API from "../api/api";
import Navbar from "../components/Navbar";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/Toast";
import { getAllDownloadCounts } from "../utils/helpers";
import "./Dashboard.css";

function UserDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState([]);
  const [activities, setActivities] = useState([]);
  const { toasts, showToast, removeToast } = useToast();

  const fetchDashboard = () => {
    const userId = localStorage.getItem("userId");
    
    Promise.all([
      API.get(`/dashboard/user/${userId}`).catch(() => ({ data: { myUploads: 0, myBookmarks: 0, myRatings: 0, myDownloads: 0 } })),
      API.get("/resources").catch(() => ({ data: [] })),
      API.get(`/resources/user/${userId}`).catch(() => ({ data: [] })),
      API.get(`/bookmarks/user/${userId}`).catch(() => ({ data: [] }))
    ])
      .then(([dashboardRes, resourcesRes, uploadsRes, bookmarksRes]) => {
        const localCounts = getAllDownloadCounts();
        let totalLocalDownloads = 0;
        Object.values(localCounts).forEach(count => totalLocalDownloads += count);
        
        // Filter out avatar resources from dashboard stats
        const filteredResources = (resourcesRes.data || []).filter(r => 
          r.subject?.toLowerCase() !== 'profile' && 
          r.subject?.toLowerCase() !== 'avatar' &&
          !r.title?.toLowerCase().includes('avatar')
        );
        
        setDashboard({
          myUploads: (uploadsRes.data || []).filter(r => 
            r.subject?.toLowerCase() !== 'profile' && 
            r.subject?.toLowerCase() !== 'avatar' &&
            !r.title?.toLowerCase().includes('avatar')
          ).length || 0,
          myBookmarks: dashboardRes.data?.myBookmarks || bookmarksRes.data?.length || 0,
          myRatings: dashboardRes.data?.myRatings || 0,
          myDownloads: (dashboardRes.data?.myDownloads || 0) + totalLocalDownloads
        });
        setResources(filteredResources);

        const activities = [];
        (uploadsRes.data || []).forEach(upload => {
          if (upload.subject?.toLowerCase() !== 'profile' && 
              upload.subject?.toLowerCase() !== 'avatar' &&
              !upload.title?.toLowerCase().includes('avatar')) {
            activities.push({ 
              type: 'upload', 
              title: upload.title, 
              timestamp: upload.createdAt || new Date(), 
              link: '/my-uploads' 
            });
          }
        });
        (bookmarksRes.data || []).forEach(bookmark => {
          activities.push({ 
            type: 'bookmark', 
            title: bookmark.resource?.title, 
            timestamp: bookmark.createdAt || new Date(), 
            link: '/bookmarks' 
          });
        });
        Object.keys(localCounts).forEach(id => {
          const resource = (resourcesRes.data || []).find(r => r.id === parseInt(id));
          if (resource && 
              resource.subject?.toLowerCase() !== 'profile' && 
              resource.subject?.toLowerCase() !== 'avatar' &&
              !resource.title?.toLowerCase().includes('avatar')) {
            activities.push({ 
              type: 'download', 
              title: resource.title, 
              timestamp: new Date(), 
              link: '/resources' 
            });
          }
        });
        activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setActivities(activities.slice(0, 8));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard error:", err);
        showToast("Failed to load dashboard", "error");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDashboard();
  }, [showToast]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </>
    );
  }

  const subjectData = resources.reduce((acc, r) => {
    if (r.status === 'APPROVED') {
      acc[r.subject] = (acc[r.subject] || 0) + 1;
    }
    return acc;
  }, {});

  const pieData = Object.entries(subjectData).map(([name, value]) => ({ name, value }));
  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#06b6d4', '#ef4444'];

  const stats = [
    { label: "Uploads", value: dashboard?.myUploads || 0, icon: "📤", color: "#6366f1" },
    { label: "Bookmarks", value: dashboard?.myBookmarks || 0, icon: "🔖", color: "#8b5cf6" },
    { label: "Ratings", value: dashboard?.myRatings || 0, icon: "⭐", color: "#f59e0b" },
    { label: "Downloads", value: dashboard?.myDownloads || 0, icon: "⬇️", color: "#10b981" },
  ];

  const getTimeAgo = (timestamp) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return `${Math.floor(minutes / 1440)}d ago`;
  };

  return (
    <>
      <Navbar />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      <div className="dashboard-wrapper">
        <div className="dashboard-container">
          {/* Header */}
          <div className="dashboard-header">
            <div>
              <h1>Dashboard</h1>
              <p>Welcome back! Here's your activity overview</p>
            </div>
            <div className="dashboard-date">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>

          {/* Stats */}
          <div className="dashboard-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-box">
                <div className="stat-box-icon" style={{ background: `${stat.color}15` }}>
                  {stat.icon}
                </div>
                <div className="stat-box-info">
                  <span className="stat-box-value">{stat.value}</span>
                  <span className="stat-box-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts & Activity */}
          <div className="dashboard-main-grid">
            {/* Charts Section */}
            <div className="charts-section">
              {pieData.length > 0 ? (
                <>
                  <div className="chart-box">
                    <h3>Resource Distribution</h3>
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="chart-box">
                    <h3>Category Popularity</h3>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={pieData} layout="vertical" margin={{ left: 20 }}>
                        <XAxis type="number" tick={{ fontSize: 12 }} />
                        <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#6366f1" radius={[0, 6, 6, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </>
              ) : (
                <div className="empty-charts">
                  <span>📊</span>
                  <p>No resources yet</p>
                  <span>Upload your first resource to see analytics</span>
                </div>
              )}
            </div>

            {/* Activity Section */}
            <div className="activity-section">
              <div className="activity-box">
                <div className="activity-box-header">
                  <h3>Recent Activity</h3>
                  {activities.length > 0 && <span className="activity-badge">{activities.length}</span>}
                </div>
                {activities.length === 0 ? (
                  <div className="empty-activity">
                    <span>📭</span>
                    <p>No recent activity</p>
                  </div>
                ) : (
                  <div className="activity-list">
                    {activities.map((item, index) => (
                      <div key={index} className="activity-row">
                        <span className={`activity-dot ${item.type}`}></span>
                        <div className="activity-row-content">
                          <p className="activity-row-title">{item.title || 'Untitled'}</p>
                          <span className="activity-row-time">{getTimeAgo(item.timestamp)}</span>
                        </div>
                        {item.link && (
                          <a href={item.link} className="activity-row-link">→</a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="quick-actions">
                <a href="/upload" className="quick-action">
                  <span>📤</span>
                  Upload
                </a>
                <a href="/resources" className="quick-action">
                  <span>📚</span>
                  Browse
                </a>
                <a href="/bookmarks" className="quick-action">
                  <span>🔖</span>
                  Bookmarks
                </a>
                <a href="/profile" className="quick-action">
                  <span>👤</span>
                  Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;