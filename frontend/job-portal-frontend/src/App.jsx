import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import JobList from './pages/JobList';
import ApplyJob from './pages/ApplyJob';
import Applications from './pages/Applications';
import PostJob from './pages/PostJob';
import MyJobs from './pages/MyJobs';
import Navbar from './components/Navbar';
import './App.css';
import EmployerApplications from './pages/EmployerApplications';


function App() {
  return (
    
    <>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<JobList />} />
          <Route path="/apply-job/:jobId" element={<ApplyJob />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/my-jobs" element={<MyJobs />} />
          <Route path="/employer-applications" element={<EmployerApplications />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
