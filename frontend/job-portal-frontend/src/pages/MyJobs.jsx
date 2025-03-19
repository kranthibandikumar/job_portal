import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      alert('Unauthorized! Please login.');
      navigate('/login');
      return;
    }

    const fetchMyJobs = async () => {
      try {
        const response = await axios.get('https://job-portal-ur5i.onrender.com/jobs/my-jobs', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setJobs(response.data.jobs);
      } catch (error) {
        console.error('Failed to fetch jobs', error.response?.data || error.message);
      }
    };

    fetchMyJobs();
  }, [token, navigate]);

  return (
    <div className="my-jobs-container">
      <h2>My Posted Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        <div className="jobs-list">
          {jobs.map((job) => (
            <div key={job._id} className="job-card">
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Applications:</strong> {job.applications?.length || 0}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyJobs;