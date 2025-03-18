import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, role, setRole } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole('');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">Job Portal</Link>
      </div>
      <div className="nav-links">
        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/jobs">Browse Jobs</Link>
            {role.toLowerCase() === 'employer' ? (
              <>
                <Link to="/post-job">Post Job</Link>
                <Link to="/my-jobs">My Jobs</Link>
                <Link to="/employer-applications">View Applications</Link>
              </>
            ) : (
              <Link to="/applications">My Applications</Link>
            )}
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
