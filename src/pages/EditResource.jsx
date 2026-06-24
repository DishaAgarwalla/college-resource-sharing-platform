import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import Navbar from "../components/Navbar";
import "./EditResource.css";

function EditResource() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    API.get(`/resources/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setSubject(res.data.subject);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const oldResource = await API.get(`/resources/${id}`);
      await API.put(`/resources/${id}`, {
        ...oldResource.data,
        title,
        subject,
      });
      alert("✅ Resource Updated Successfully");
      navigate("/my-uploads");
    } catch (error) {
      console.log(error);
      alert("❌ Update Failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page-wrapper">
          <div className="container">
            <div className="loading-spinner">Loading resource...</div>
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
              <span className="icon">✏️</span>
              <h1>Edit Resource</h1>
            </div>
          </div>

          <div className="edit-container">
            <form onSubmit={handleUpdate} className="edit-form">
              <div className="form-group">
                <label className="form-label">Resource Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  className="form-input"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className="edit-actions">
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? "Saving..." : "💾 Save Changes"}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate("/my-uploads")}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditResource;