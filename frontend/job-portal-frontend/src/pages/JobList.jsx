import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Retrieve role from localStorage and convert to lowercase for consistency.
  const role = localStorage.getItem('role')
    ? localStorage.getItem('role').toLowerCase()
    : '';

  useEffect(() => {
    let isMounted = true; // Prevents state updates on unmounted component
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
      return;
    }
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:9373/jobs', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Assuming your backend returns an object like: { message: "...", jobs: [ ... ] }
        if (isMounted) {
          setJobs(response.data.jobs);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchJobs();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="jobs-container">
      <h2>Available Jobs</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <p>Loading jobs...</p>
      ) : filteredJobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        filteredJobs.map((job) => (
          <div key={job._id} className="job-card">
            <h3>{job.title}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            
            {role === 'seeker' && (
              <button onClick={() => navigate(`/apply-job/${job._id}`)}>
                Apply
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default JobList;
