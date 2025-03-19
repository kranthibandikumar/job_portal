import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      alert('Please login to view your applications.');
      navigate('/login');
      return;
    }

    let isMounted = true;

    const fetchApplications = async () => {
      try {
        const response = await axios.get('https://job-portal-ur5i.onrender.com/applications/seeker-applications', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (isMounted) {
          setApplications(response.data.applications);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching applications:', error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchApplications();

    return () => {
      isMounted = false;
    };
  }, [token, navigate]);

  return (
    <div className="applications-container">
      <h2>My Applications</h2>
      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p>You have not applied to any jobs yet.</p>
      ) : (
        applications.map((app) => (
          <div key={app._id} className="job-card">
            <h3>{app.job.title}</h3>
            <p><strong>Company:</strong> {app.job.company}</p>
            <p><strong>Status:</strong> {app.status}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Applications;
