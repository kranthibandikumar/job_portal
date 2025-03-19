import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ApplyJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [resume, setResume] = useState(null);
  const [fileName, setFileName] = useState('No file chosen');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      alert('Please login to apply for a job.');
      navigate('/login');
      return;
    }

    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`https://job-portal-ur5i.onrender.com/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJob(response.data.job); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job details:', error.response?.data || error.message);
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId, token, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (file.type !== 'application/pdf' && 
          file.type !== 'application/msword' && 
          file.type !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        alert('Please upload a PDF or Word document');
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should not exceed 5MB');
        return;
      }
      
      setResume(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) {
      alert('Please upload your resume');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('resume', resume);
      
      const response = await axios.post(
        `https://job-portal-ur5i.onrender.com/applications/apply/${jobId}`,
        formData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        }
      );
      
      console.log('Application response:', response.data);
      setApplicationSubmitted(true);
      alert(response.data.message || 'Application submitted successfully!'); 
      navigate('/applications');
    } catch (error) {
      console.error('Error submitting application:', error.response?.data || error.message);
      alert('Failed to submit application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  if (loading) return <div className="container"><p>Loading job details...</p></div>;
  if (!job) return <div className="container"><p>Job not found.</p></div>;

  return (
    <div className="apply-job-container">
      <h2>{job.title}</h2>
      
      <div className="job-details">
        <p><strong>Company:</strong> {job.company}</p>
        <p><strong>Description:</strong> {job.description}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Salary:</strong> {job.salary}</p>
      </div>
      
      {applicationSubmitted ? (
        <div className="application-success">
          <p>You have successfully applied for this job.</p>
          <button onClick={() => navigate('/applications')}>View My Applications</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="application-form">
          <div className="form-group">
            <label htmlFor="resume">Resume (PDF or Word, Max 5MB)</label>
            <div className="file-input-container">
              <input 
                type="file" 
                id="resume" 
                ref={fileInputRef}
                onChange={handleFileChange} 
                accept=".pdf,.doc,.docx"
                style={{ display: 'none' }}
              />
              <div className="file-input-wrapper">
                <button 
                  type="button" 
                  onClick={triggerFileInput}
                  className="file-select-btn"
                >
                  Select File
                </button>
                <span className="file-name">{fileName}</span>
              </div>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting || !resume}
            className={isSubmitting ? 'submitting' : ''}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      )}
    </div>
  );
}

export default ApplyJob;