import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/Toast";
import "./Upload.css";

function UploadResource() {
  const navigate = useNavigate();
  const { toasts, showToast, removeToast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    categoryId: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      setFile(null);
      return;
    }
    setFile(selectedFile);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file");
      return;
    }

    setLoading(true);
    setError("");

    const uploadData = new FormData();
    uploadData.append("title", formData.title);
    uploadData.append("subject", formData.subject);
    uploadData.append("categoryId", formData.categoryId);
    uploadData.append("userId", localStorage.getItem("userId"));
    uploadData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const response = await API.post("/resources/upload", uploadData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Upload response:", response.data);
      
      showToast("✅ Resource Uploaded Successfully!", "success");
      
      // Reset form
      setFormData({ title: "", subject: "", categoryId: "" });
      setFile(null);
      document.getElementById("file-input").value = "";

      // Navigate to My Uploads page after a short delay
      setTimeout(() => {
        navigate("/my-uploads");
      }, 1500);

    } catch (error) {
      console.error("Upload error:", error);
      setError(error.response?.data?.message || "Upload failed. Please try again.");
      showToast("❌ Upload failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <div className="page-wrapper">
        <div className="container">
          <div className="page-header">
            <div className="page-title">
              <span className="icon">📤</span>
              <h1>Upload Resource</h1>
            </div>
            <p className="page-subtitle">Share your knowledge with the community</p>
          </div>

          <div className="upload-container">
            <form onSubmit={handleSubmit} className="upload-form">
              <div className="form-group">
                <label className="form-label">Resource Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-input"
                  placeholder="Enter a descriptive title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className="form-input"
                  placeholder="e.g., Computer Science, Mathematics"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category ID</label>
                <input
                  type="number"
                  name="categoryId"
                  className="form-input"
                  placeholder="Enter category ID"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">File</label>
                <div className="file-upload-area">
                  <input
                    id="file-input"
                    type="file"
                    className="file-input"
                    onChange={handleFileChange}
                    required
                  />
                  <label htmlFor="file-input" className="file-upload-label">
                    <span className="upload-icon">📄</span>
                    <span>{file ? file.name : "Click to select a file"}</span>
                    <span className="file-hint">Max size: 10MB</span>
                  </label>
                </div>
              </div>

              {error && <div className="form-error">{error}</div>}

              <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? "Uploading..." : "📤 Upload Resource"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadResource;