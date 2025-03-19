// EmployerApplications.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

function EmployerApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEmployerApplications = async () => {
      try {
        const response = await axios.get(
          'https://job-portal-ur5i.onrender.com/applications/employer-applications',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setApplications(response.data.applications); 
        setLoading(false);
      } catch (error) {
        console.error(
          'Error fetching employer applications:',
          error.response?.data || error.message
        );
        setLoading(false);
      }
    };

    fetchEmployerApplications();
  }, [token]);

  
  const handleChange = (appId, newStatus) => {
    setApplications((prev) =>
      prev.map((app) =>
        app._id === appId ? { ...app, newStatus } : app
      )
    );
  };

  const handleStatusUpdate = async (appId, currentStatus) => {
    try {
      await axios.put(
        `https://job-portal-ur5i.onrender.com/applications/${appId}/status`,
        { status: currentStatus }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setApplications((prev) =>
        prev.map((app) =>
          app._id === appId
            ? { ...app, status: currentStatus }
            : app
        )
      );
      alert('Status updated successfully!');
    } catch (error) {
      console.error(
        'Error updating application status:',
        error.response?.data || error.message
      );
      alert('Failed to update status.');
    }
  };

  if (loading) return <p>Loading applications...</p>;

  if (applications.length === 0) {
    return (
      <div className="applications-container">
        <h2>Applications for My Posted Jobs</h2>
        <p>No applications found for your jobs.</p>
      </div>
    );
  }

  return (
    <div className="applications-container">
      <h2>Applications for My Posted Jobs</h2>
      {applications.map((app) => {
        
        const effectiveStatus = app.newStatus || app.status;

        return (
          <div key={app._id} className="job-card">
            <h3>{app.job.title}</h3>
            <p><strong>Company:</strong> {app.job.company}</p>
            <p><strong>Applicant Name:</strong> {app.applicantId?.name}</p>
            <p><strong>Applicant Email:</strong> {app.applicantId?.email}</p>
            <p><strong>Current Status:</strong> {app.status}</p>

            
            <select
              value={effectiveStatus}
              onChange={(e) => handleChange(app._id, e.target.value)}
            >
              <option value="pending">pending</option>
              <option value="shortlisted">shortlisted</option>
              <option value="rejected">rejected</option>
            </select>

            
            <button
              className="small-button"
              onClick={() => handleStatusUpdate(app._id, effectiveStatus)}
            >
              Update
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default EmployerApplications;
