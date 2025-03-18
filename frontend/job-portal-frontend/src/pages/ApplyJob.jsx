import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ApplyJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      alert('Please login to apply for a job.');
      navigate('/login');
      return;
    }

    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9373/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJob(response.data.job); // job details are in response.data.job
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job details:', error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId, token, navigate]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:9373/applications/apply/${jobId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Application response:', response.data);
      setApplicationSubmitted(true);
      alert(response.data.message); 
      navigate('/applications')
    } catch (error) {
      console.error('Error submitting application:', error.response?.data || error.message);
      alert('Failed to submit application.');
    }
  };

  if (loading) return <p>Loading job details...</p>;
  if (!job) return <p>Job not found.</p>;

  return (
    <div className="apply-job-container">
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      
      {applicationSubmitted ? (
        <p>You have successfully applied for this job.</p>
      ) : (
        <button onClick={handleSubmit}>Submit Application</button>
      )}
    </div>
  );
}

export default ApplyJob;
