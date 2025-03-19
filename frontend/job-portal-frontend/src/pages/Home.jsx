import { Link } from 'react-router-dom';

function Home() {
  const isLoggedIn = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome to Job Portal</h1>
        <p>Find your dream job or hire the perfect candidate</p>
        
        <div className="home-links">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="home-link">Login</Link>
              <Link to="/register" className="home-link">Register</Link>
            </>
          ) : (
            <>
              <Link to="/jobs" className="home-link">Browse Jobs</Link>
              {role === 'employer' ? (
                <Link to="/post-job" className="home-link">Post a Job</Link>
              ) : (
                <Link to="/applications" className="home-link">View My Applications</Link>
              )}
            </>
          )}
        </div>
      </div>

      <div className="card">
        <h2>Why Choose Our Job Portal?</h2>
        <p>Our platform connects talented professionals with leading companies across the globe. Whether you're looking for your next career move or searching for the perfect candidate, we've got you covered.</p>
      </div>

      <div className="card">
        <h2>For Job Seekers</h2>
        <p>Access thousands of opportunities from top employers. Create your profile, upload your resume, and start applying to positions that match your skills and experience.</p>
        {isLoggedIn && role === 'jobseeker' && (
          <Link to="/jobs" className="home-link" style={{ marginTop: '15px', display: 'inline-block' }}>Browse Available Jobs</Link>
        )}
      </div>

      <div className="card">
        <h2>For Employers</h2>
        <p>Reach thousands of qualified candidates. Post job openings, review applications, and connect with potential employees who have the skills your company needs.</p>
        {isLoggedIn && role === 'employer' && (
          <Link to="/post-job" className="home-link" style={{ marginTop: '15px', display: 'inline-block' }}>Post a New Job</Link>
        )}
      </div>
    </div>
  );
}

export default Home;