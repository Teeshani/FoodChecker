import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminHome.css";
import { Link } from 'react-router-dom';

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", userType: "User" });
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/auth/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchUsers(); // Load users on component mount
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    // Ensure required fields are sent
    const userData = {
      ...newUser,
      password: "default123", // Set a default password
    };

    try {
      await axios.post("http://localhost:8080/auth/users", userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json", // Ensure JSON format
        },
      });
      fetchUsers(); // Refresh user list
      setNewUser({ name: "", email: "", userType: "User" }); // Reset form
    } catch (error) {
      console.error("Error adding user:", error.response?.data || error);
    }
  };

  // Edit user
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/auth/users/${editingUser._id}`,
        editingUser,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/auth/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel - User Management</h2>

      {/* Add User Form */}
      <form onSubmit={editingUser ? handleUpdateUser : handleAddUser} className="user-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={editingUser ? editingUser.name : newUser.name}
          onChange={(e) =>
            editingUser
              ? setEditingUser({ ...editingUser, name: e.target.value })
              : handleChange(e)
          }
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={editingUser ? editingUser.email : newUser.email}
          onChange={(e) =>
            editingUser
              ? setEditingUser({ ...editingUser, email: e.target.value })
              : handleChange(e)
          }
          required
        />
        <select
          name="userType"
          value={editingUser ? editingUser.userType : newUser.userType}
          onChange={(e) =>
            editingUser
              ? setEditingUser({ ...editingUser, userType: e.target.value })
              : handleChange(e)
          }
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
        <button type="submit">{editingUser ? "Update User" : "Add User"}</button>
      </form>

      {/* User List Table */}
      <table className="user-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>
                <td>
                  <button onClick={() => setEditingUser(user)}>Edit</button>
                  <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Link to Feedback Management Page */}
      <div>
        <Link to="/feedbackManagement">
          <button>Manage Feedbacks</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;
