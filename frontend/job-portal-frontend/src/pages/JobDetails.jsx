import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9373/jobs/${id}`);
        setJob(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job details:', error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleApply = async () => {
    if (!token) {
      alert('Please login to apply.');
      navigate('/login');
      return;
    }

    try {
      await axios.post(`http://localhost:9373/applications/apply/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error applying for job:', error.response?.data || error.message);
    }
  };

  return (
    <div className="job-details-container">
      {loading ? (
        <p>Loading job details...</p>
      ) : job ? (
        <>
          <h2>{job.title}</h2>
          <p><strong>Company:</strong> {job.company}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Salary:</strong> {job.salary}</p>
          <p><strong>Description:</strong> {job.description}</p>
          <button onClick={handleApply}>Apply Now</button>
        </>
      ) : (
        <p>Job not found.</p>
      )}
    </div>
  );
}

export default JobDetails;
