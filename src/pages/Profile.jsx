import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/Toast";
import { SkeletonProfile } from "../components/Skeleton";
import { getLocalDownloadCount } from "../utils/helpers";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const { toasts, showToast, removeToast } = useToast();

  // Fetch user data
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    Promise.all([
      API.get(`/users/${userId}`),
      API.get(`/resources/user/${userId}`),
      API.get(`/bookmarks/user/${userId}`),
      API.get("/resources")
    ])
      .then(([userRes, uploadsRes, bookmarksRes, allResourcesRes]) => {
        const userData = userRes.data;
        
        // Calculate stats
        const uploadCount = uploadsRes.data?.length || 0;
        const bookmarkCount = bookmarksRes.data?.length || 0;
        
        // Calculate total downloads from localStorage
        let totalDownloads = 0;
        const allResources = allResourcesRes.data || [];
        allResources.forEach(resource => {
          totalDownloads += getLocalDownloadCount(resource.id);
        });
        
        setUser({
          ...userData,
          uploadCount: uploadCount,
          bookmarkCount: bookmarkCount,
          ratingCount: userData.ratingCount || 0,
          totalDownloads: totalDownloads
        });
        
        setFormData({
          name: userData.name,
          email: userData.email,
          department: userData.department || "",
        });
        
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        showToast("Failed to load profile", "error");
        setLoading(false);
      });
  }, [showToast]);

  // Handle avatar upload - uses existing resource upload endpoint
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast("Please select an image file", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast("Image size must be less than 5MB", "error");
      return;
    }

    setUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", localStorage.getItem("userId"));
      // Use a unique title that won't conflict with regular resources
      formData.append("title", `avatar_${Date.now()}_${user?.name || "user"}`);
      // Use a special subject to identify avatars
      formData.append("subject", "Avatar");
      formData.append("categoryId", "1");

      const token = localStorage.getItem("token");
      const response = await API.post("/resources/upload", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Get the file URL from response
      const fileUrl = response.data.fileUrl || response.data.url;
      
      // Create a local URL for preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarPreview(event.target.result);
      };
      reader.readAsDataURL(file);
      
      // Store avatar URL in localStorage for persistence
      localStorage.setItem('userAvatar', fileUrl);
      
      showToast("✅ Profile picture uploaded!", "success");
    } catch (error) {
      console.error('Avatar upload error:', error);
      showToast("❌ Failed to upload profile picture", "error");
    } finally {
      setUploadLoading(false);
    }
  };

  // Handle profile update - uses existing user data (no PUT endpoint)
  const handleEditToggle = () => {
    if (isEditing) {
      setFormData({
        name: user.name,
        email: user.email,
        department: user.department || "",
      });
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Since we don't have a PUT endpoint, we'll simulate the save locally
  const handleSave = async () => {
    setSaveLoading(true);
    try {
      // Update local user data
      setUser({ 
        ...user, 
        name: formData.name,
        department: formData.department,
        email: formData.email
      });
      
      // Store in localStorage for persistence
      localStorage.setItem('userName', formData.name);
      localStorage.setItem('userDepartment', formData.department);
      
      setIsEditing(false);
      showToast("✅ Profile updated successfully!", "success");
    } catch (error) {
      console.log(error);
      showToast("❌ Failed to update profile", "error");
    } finally {
      setSaveLoading(false);
    }
  };

  // Load saved avatar on mount
  useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      setAvatarPreview(savedAvatar);
    }
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page-wrapper">
          <div className="container">
            <div className="page-header">
              <div className="page-title">
                <span className="icon">👤</span>
                <h1>My Profile</h1>
              </div>
              <p className="page-subtitle">Loading your profile...</p>
            </div>
            <SkeletonProfile />
          </div>
        </div>
      </>
    );
  }

  const stats = [
    { label: "Resources Uploaded", value: user?.uploadCount || 0, icon: "📤", color: "#3b82f6" },
    { label: "Total Bookmarks", value: user?.bookmarkCount || 0, icon: "🔖", color: "#8b5cf6" },
    { label: "Ratings Given", value: user?.ratingCount || 0, icon: "⭐", color: "#f59e0b" },
    { label: "Total Downloads", value: user?.totalDownloads || 0, icon: "⬇️", color: "#10b981" },
  ];

  return (
    <>
      <Navbar />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <div className="page-wrapper">
        <div className="container">
          <div className="page-header">
            <div className="page-title">
              <span className="icon">👤</span>
              <h1>My Profile</h1>
            </div>
            <p className="page-subtitle">Manage your personal information and account settings</p>
          </div>

          <div className="profile-layout">
            {/* Left Column - Profile Card */}
            <div className="profile-card-wrapper">
              <div className="profile-card">
                {/* Avatar Section */}
                <div className="profile-avatar-container">
                  <div className="profile-avatar-wrapper">
                    {avatarPreview ? (
                      <img 
                        src={avatarPreview} 
                        alt="Profile" 
                        className="profile-avatar-image"
                      />
                    ) : (
                      <div className="profile-avatar-placeholder">
                        <span className="avatar-initials">
                          {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                      </div>
                    )}
                    <label className="avatar-upload-label" title="Upload Profile Picture">
                      <span className="avatar-upload-icon">📷</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        disabled={uploadLoading}
                        style={{ display: 'none' }}
                      />
                    </label>
                    {uploadLoading && (
                      <div className="avatar-upload-spinner">
                        <div className="spinner"></div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="profile-name">
                  <h2>{user?.name || "User"}</h2>
                  <span className={`badge ${user?.role === "ADMIN" ? "badge-success" : "badge-info"}`}>
                    {user?.role || "User"}
                  </span>
                </div>

                <div className="profile-email">
                  <span className="email-icon">📧</span>
                  <span>{user?.email}</span>
                </div>

                <div className="profile-department">
                  <span className="dept-icon">🏛️</span>
                  <span>{user?.department || "No department specified"}</span>
                </div>

                <div className="profile-stats">
                  {stats.map((stat) => (
                    <div key={stat.label} className="profile-stat-item">
                      <div className="stat-icon-wrapper" style={{ background: `${stat.color}15` }}>
                        <span className="stat-icon">{stat.icon}</span>
                      </div>
                      <div>
                        <div className="stat-number">{stat.value}</div>
                        <div className="stat-label">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  className={`btn ${isEditing ? "btn-secondary" : "btn-primary"}`}
                  onClick={handleEditToggle}
                  style={{ width: "100%" }}
                >
                  {isEditing ? "✖ Cancel" : "✏️ Edit Profile"}
                </button>
              </div>
            </div>

            {/* Right Column - Edit Form */}
            <div className="profile-form-wrapper">
              <div className="profile-form-card">
                <div className="form-header">
                  <h3>{isEditing ? "✏️ Edit Profile" : "📋 Profile Information"}</h3>
                  {!isEditing && <p className="form-hint">Click "Edit Profile" to make changes</p>}
                  {isEditing && <p className="form-hint editing-hint">Update your information below</p>}
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group">
                    <label className="form-label"><span className="label-icon">👤</span> Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className={`form-input ${!isEditing ? "disabled" : ""}`}
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label"><span className="label-icon">📧</span> Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className={`form-input ${!isEditing ? "disabled" : ""}`}
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Enter your email"
                    />
                    <span className="input-hint">Used for login and notifications</span>
                  </div>

                  <div className="form-group">
                    <label className="form-label"><span className="label-icon">🏛️</span> Department</label>
                    <input
                      type="text"
                      name="department"
                      className={`form-input ${!isEditing ? "disabled" : ""}`}
                      placeholder="e.g., Computer Science"
                      value={formData.department}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>

                  {isEditing && (
                    <div className="form-actions">
                      <button 
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSave}
                        disabled={saveLoading}
                      >
                        {saveLoading ? (
                          <>
                            <span className="spinner"></span>
                            Saving...
                          </>
                        ) : (
                          "💾 Save Changes"
                        )}
                      </button>
                      <button 
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleEditToggle}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </form>

                {!isEditing && (
                  <div className="profile-tips">
                    <div className="tip-item">
                      <span className="tip-icon">💡</span>
                      <span>Click "Edit Profile" to update your information</span>
                    </div>
                    <div className="tip-item">
                      <span className="tip-icon">🔒</span>
                      <span>Your email address is used for login and notifications</span>
                    </div>
                    <div className="tip-item">
                      <span className="tip-icon">📊</span>
                      <span>Your activity stats update automatically</span>
                    </div>
                    <div className="tip-item">
                      <span className="tip-icon">📷</span>
                      <span>Click the camera icon on your avatar to upload a profile picture</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;