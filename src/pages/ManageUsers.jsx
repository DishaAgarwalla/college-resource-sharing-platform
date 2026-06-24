import { useEffect, useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import "./ManageUsers.css";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    API.get("/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const makeAdmin = (id) => {
    API.put(`/users/make-admin/${id}`)
      .then(() => {
        alert("✅ User Promoted To Admin");
        fetchUsers();
      })
      .catch((err) => console.log(err));
  };

  const deleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      API.delete(`/users/${id}`)
        .then(() => {
          alert("🗑️ User Deleted");
          fetchUsers();
        })
        .catch((err) => console.log(err));
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="page-wrapper">
          <div className="container">
            <div className="loading-spinner">Loading users...</div>
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
              <span className="icon">👥</span>
              <h1>Manage Users</h1>
            </div>
            <p className="page-subtitle">Manage user roles and permissions</p>
          </div>

          {users.length === 0 ? (
            <div className="empty-state">
              <div className="icon">📭</div>
              <h3>No Users Found</h3>
            </div>
          ) : (
            <div className="manage-users-grid">
              {users.map((user) => (
                <div key={user.id} className="user-card">
                  <div className="user-header">
                    <span className="user-name">{user.name}</span>
                    <span className={`badge badge-${user.role === "ADMIN" ? "success" : "info"}`}>
                      {user.role || "User"}
                    </span>
                  </div>

                  <div className="user-details">
                    <span className="user-detail-item">
                      <span className="meta-icon">📧</span> {user.email}
                    </span>
                    <span className="user-detail-item">
                      <span className="meta-icon">🏛️</span> {user.department || "Not specified"}
                    </span>
                  </div>

                  <div className="user-actions">
                    {user.role !== "ADMIN" && (
                      <button className="btn btn-success btn-sm" onClick={() => makeAdmin(user.id)}>
                        ⭐ Make Admin
                      </button>
                    )}
                    <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user.id)}>
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

export default ManageUsers;