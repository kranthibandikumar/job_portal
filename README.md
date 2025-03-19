# [Job Portal](https://job-harbor.vercel.app/)

The Job Portal is a full-stack web application designed to streamline the job search and hiring process. It allows job seekers to find and apply for jobs, while employers can post job listings and manage applications. The platform ensures a smooth and efficient hiring experience with authentication, filtering, and status updates.
## Key Features

#### For Job Seekers:
- Browse & Search Jobs – Find jobs based on title, company, and location.
- Apply for Jobs – Submit applications directly from the portal.
- Track Application Status – See whether an application is pending, shortlisted, or rejected.

#### For Employers: 
- Post New Jobs – Create job listings with details like salary, location, and company name.
- Manage Applications – View and update application statuses.


#### Authentication & Authorization:
- JWT-based Authentication – Secure login system for job seekers and employers.
- Role-Based Access – Only employers can post jobs and update application statuses.

#### Advanced Features:
- Pagination & Filtering – Easily navigate through job listings.
- Real-time Status Updates – Employers can shortlist or reject candidates, and seekers can track progress.

## Problems it solves

#### Hassle-Free Job Search

- Users can search and filter job listings efficiently.

#### Simplifies Recruitment

- Employers can post jobs and manage applications in one place.

#### Secure & Role-Based Access

- Only authorized users can apply, post, or update job statuses. 
## Project Type
 - Full Stack (MERN Stack)
## Deployed App

- Frontend : https://job-harbor.vercel.app/
- Backend :  https://job-portal-ur5i.onrender.com
## Directory Structure

job_portal
├── backend
│   ├── config
│   │   └── db.js
│   ├── middleware
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   ├── models
│   │   ├── application.model.js
│   │   ├── job.model.js
│   │   ├── user.model.js
│   ├── node_modules
│   ├── routes
│   │   ├── application.route.js
│   │   ├── job.route.js
│   │   ├── user.route.js
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│
├── frontend/job-portal-frontend
│   ├── node_modules
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │   ├── Navbar.jsx
│   │   ├── context
│   │   ├── pages
│   │   │   ├── Applications.jsx
│   │   │   ├── ApplyJob.jsx
│   │   │   ├── EmployerApplications.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── JobList.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MyJobs.jsx
│   │   │   ├── PostJob.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Register.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── vite.config.js
│
├── .gitignore
├── README.md
## Design Decisions

#### Frontend and Backend:

- Frontend: React.js for a dynamic UI.

- Backend: Node.js + Express.js for handling requests.

#### Database Choice:

- MongoDB (NoSQL) for scalable data storage.

#### Modular Design:

- Separation of Concerns – Jobs, Applications, and Users are managed separately.

#### APIs for Communication:

- RESTful API with JWT authentication for security.

#### Security Features

- Hashed passwords for user data security.
- JWT-based authentication for secure login.

## Installation & Getting Started
 
#### Clone the Repository

- git clone <repository-url>
- cd job-portal

#### Install Dependencies
- npm install

####  Start the Backend Server
- cd backend
- npm start

#### Start the Frontend Server
- cd frontend
- npm start


#### Open in Browser
- http://localhost:3000 (Frontend)
- http://localhost:9373 (Backend)
## Usage

- Sign Up / Login as a Job Seeker or Employer.
- Job Seekers: Browse, search, and apply for jobs.
- Employers: Post jobs and manage applications.
- Track Application Status in the dashboard.

## Technology Stack

#### Frontend
- React.js – UI Development
- CSS – Styling
- React Router – Navigation

#### Backend
- Node.js + Express.js – Server & API
- MongoDB + Mongoose – Database


## Other libraries/Modules
- Axios – API Calls
- JWT – Authentication
- Bcrypt.js – Password Hashing
- CORS – Secure API Access
- Dotenv – Environment Variables
