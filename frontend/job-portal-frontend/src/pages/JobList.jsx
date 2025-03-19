
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function JobList() {
  const [jobs, setJobs] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(1); 
  const navigate = useNavigate();

  const role = localStorage.getItem("role")
    ? localStorage.getItem("role").toLowerCase()
    : "";

  
  useEffect(() => {
    let isMounted = true; 
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://job-portal-ur5i.onrender.com/jobs?search=${searchTerm}&page=${page}&limit=5`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (isMounted) {
          setJobs(response.data.jobs);
          setTotalPages(Math.ceil(response.data.totalCount / 5)); // Calculate total pages
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchJobs();

    return () => {
      isMounted = false;
    };
  }, [searchTerm, page, navigate]); 

  return (
    <div className="jobs-container">
      <h2>Available Jobs</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search jobs by title, company, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} className="job-card">
            <h3>{job.title}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary}</p>

            {role === "seeker" && (
              <button onClick={() => navigate(`/apply-job/${job._id}`)}>
                Apply
              </button>
            )}
          </div>
        ))
      )}

      
      <div className="pagination-controls">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span> Page {page} of {totalPages} </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default JobList;
