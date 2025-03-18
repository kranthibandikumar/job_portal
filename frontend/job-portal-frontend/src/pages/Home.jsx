import { Link } from 'react-router-dom';

function Home() {
  const isLoggedIn = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  return (
    <div className="home-container">
      <h1>Welcome to Job Portal</h1>
      <p>Find your dream job or hire the perfect candidate</p>
      
      {!isLoggedIn ? (
        <div className="auth-buttons">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn">Register</Link>
        </div>
      ) : (
        <div className="action-buttons">
          <Link to="/jobs" className="btn">Browse Jobs</Link>
          {role === 'employer' ? (
            <Link to="/post-job" className="btn">Post a Job</Link>
          ) : (
            <Link to="/applications" className="btn">View My Applications</Link>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
