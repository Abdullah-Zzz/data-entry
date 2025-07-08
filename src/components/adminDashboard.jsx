// src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './adminDashboard.css';

const AdminDashboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchEntries = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await axios.get(`${BACKEND_URL}/api/admin/data`, {
        withCredentials: true
      });
      
      setEntries(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch entries');
      if (err.response?.status === 401) {
        navigate('/admin');
      }
    } finally {
      setLoading(false);
    }
  };
  const logout  = async ()=>{
    try{
      const res = await axios.get(`${BACKEND_URL}/api/admin/logout`,{
        withCredentials:true,
        validateStatus : (status)=> status < 500 
      })
      if(res.status == 200){
        navigate('/admin');
      }
    }
    catch(err){
      setError("logout failed")
    }
  }

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await axios.delete(`${BACKEND_URL}/api/admin/delete/${id}`, {
          withCredentials: true
        });
        fetchEntries();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete entry');
      }
    }
  };

  const handleEdit = (entry) => {
    setEditingId(entry._id);
    setEditForm(entry);
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BACKEND_URL}/api/admin/edit/${editingId}`, editForm, {
        withCredentials: true
      });
      setEditingId(null);
      fetchEntries();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update entry');
    }
  };

 

  const displayFields = [
    'applicationNo',
    'applicationType',
    'Name',
    'passportNo',
    'TRidentityNumber',
    'MothersName',
    'fathersName',
    'documentValidityStartDate',
    'documentValidityEndDate',
    'approvalStatus',
    'approvalDate'
  ];

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="dashboard-logout-button"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div className="table-responsive-container">
            <div className="table-wrapper">
              <table className="entries-table">
                <thead>
                  <tr>
                    <th className="image-column">Image</th>
                    {displayFields.map((field) => (
                      <th key={field} className="data-column">
                        {field}
                      </th>
                    ))}
                    <th className="actions-column">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry._id}>
                      {editingId === entry._id ? (
                        // Edit mode row
                        <>
                          <td className="image-cell">
                            {entry.image && (
                              <img 
                                src={entry.image} 
                                alt="Applicant" 
                                className="profile-image"
                              />
                            )}
                          </td>
                          {displayFields.map((field) => (
                            <td key={field} className="edit-cell">
                              {field === 'approvalStatus' ? (
                                <label className="checkbox-container">
                                  <input
                                    type="checkbox"
                                    name={field}
                                    checked={editForm[field] || false}
                                    onChange={handleEditChange}
                                    className="edit-checkbox"
                                  />
                                  <span className="checkmark"></span>
                                </label>
                              ) : (
                                <input
                                  type={field.includes('Date') ? 'date' : 'text'}
                                  name={field}
                                  value={editForm[field] || ''}
                                  onChange={handleEditChange}
                                  className="edit-input"
                                />
                              )}
                            </td>
                          ))}
                          <td className="action-buttons-cell">
                            <div className="action-buttons">
                              <button
                                onClick={handleEditSubmit}
                                className="save-button"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="cancel-button"
                              >
                                Cancel
                              </button>
                            </div>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="image-cell">
                            {entry.image && (
                              <img 
                                src={entry.image} 
                                alt="Applicant" 
                                className="profile-image"
                              />
                            )}
                          </td>
                          {displayFields.map((field) => (
                            <td key={field} className="data-cell">
                              <div className={`cell-content ${field.includes('Date') ? 'date-field' : ''}`}>
                                {typeof entry[field] === 'boolean' ? (
                                  <span className={entry[field] ? 'status-approved' : 'status-pending'}>
                                    {entry[field] ? 'Approved' : 'Pending'}
                                  </span>
                                ) : (
                                  entry[field]
                                )}
                              </div>
                            </td>
                          ))}
                          <td className="action-buttons-cell">
                            <div className="action-buttons">
                              <button
                                onClick={() => handleEdit(entry)}
                                className="edit-button"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(entry._id)}
                                className="delete-button"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;