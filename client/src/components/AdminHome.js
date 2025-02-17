import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./AdminHome.css";  
import Navbar from './Navbar';
import Footer from "./Footer";

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch Users
  useEffect(() => {
    axios.get('/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch(() => {
        setError('Failed to fetch users');
      });
  }, []);

  // Search Function
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm) ||
    user.email.toLowerCase().includes(searchTerm) ||
    user._id.toLowerCase().includes(searchTerm)
  );

  // Edit User
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleUpdateUser = () => {
    axios.put(`/users/${selectedUser._id}`, selectedUser)
      .then(() => {
        setUsers(users.map(user => user._id === selectedUser._id ? selectedUser : user));
        setShowEditModal(false);
      })
      .catch(() => {
        setError('Failed to update user');
      });
  };

  const handleInputChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  // Delete User
  const handleDeleteUser = (userId) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  const confirmDeleteUser = () => {
    axios.delete(`/users/${userToDelete}`)
      .then(() => {
        setUsers(prevUsers => prevUsers.filter(user => user._id !== userToDelete));
        setShowDeleteModal(false);
      })
      .catch(() => {
        setError('Failed to delete user');
      });
  };

  const cancelDeleteUser = () => {
    setShowDeleteModal(false);
  };

  // Navigate to Add User Page
  const handleAddUser = () => {
    navigate('/add-user');
  };

  return (
    <>
      <Navbar />

      <div className="header-container">
        <div className="search-container-one">
          <input
            type="text"
            className="form-control search-input"
            placeholder="Search Users..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className='button-container'>
          <button className="btn-gold-add" onClick={handleAddUser}>
            Add User
          </button>
        </div>
      </div>

      <div className='user-table-container'>
        <div className="gallery-content">
          <table className="custom-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>User Type</th>
                <th>Profile Picture</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.userType}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/images/${user.profilePicture}`}
                      alt="Profile"
                      className="profile-pic-user"
                    />
                  </td>
                  <td>
                    {user.userType !== 'Customer' && (
                      <>
                        <button className="btn-confirm" onClick={() => handleEditUser(user)}>
                          Edit
                        </button>
                        <button className="btn-deny" onClick={() => handleDeleteUser(user._id)}>
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="modal-backdrop-blur">
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit User</h5>
                  <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}>
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <label>Name:</label>
                  <input type="text" name="name" value={selectedUser.name} onChange={handleInputChange} className="form-control" />

                  <label>Email:</label>
                  <input type="email" name="email" value={selectedUser.email} onChange={handleInputChange} className="form-control" />

                  <label>Phone Number:</label>
                  <input type="text" name="phoneNumber" value={selectedUser.phoneNumber} onChange={handleInputChange} className="form-control" />

                  <label>User Type:</label>
                  <select name="userType" value={selectedUser.userType} onChange={handleInputChange} className="form-control">
                    <option value="Admin">Admin</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Customer">Customer</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                  <button className="btn btn-success" onClick={handleUpdateUser}>Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-backdrop-blur">
          <div className="modal show" style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Deletion</h5>
                  <button type="button" className="btn-close" onClick={cancelDeleteUser}>
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this user? This action cannot be undone.</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={cancelDeleteUser}>Cancel</button>
                  <button className="btn btn-danger" onClick={confirmDeleteUser}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default AdminHome;



