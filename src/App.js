import React, { useEffect, useState } from 'react';
import axios from './mockApi'; // Make sure you use the mocked axios
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

import StudentList from './components/StudentList';
import AddStudentForm from './components/AddStudentForm';
import LoginForm from './components/LoginForm';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false); // State to track login message visibility

  // Fetch students on mount
  useEffect(() => {
    axios.get('/students').then((res) => setStudents(res.data));
  }, []);

  // Track login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Filter logic
  const filteredStudents = students.filter((student) =>
    student.course.toLowerCase().includes(filter.toLowerCase())
  );

  // Handle Add Student button click
  const handleAddStudentClick = () => {
    if (user) {
      setShowAddForm(true); // Show form if user is logged in
      setShowLoginMessage(false); // Hide the login message if user is logged in
    } else {
      setShowAddForm(false); // Hide form if user is not logged in
      setShowLoginMessage(true); // Show login message if user is not logged in
    }
  };

  return (
   <div className="main-container">
     <h1 className="header">Student Management</h1>;
     <div className="app-container">
      <div className="left-side">
        

        {/* Filter input */}
        <input
          type="text"
          placeholder="Filter by course"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />

        {/* Always show student list */}
        <StudentList students={filteredStudents} />

        {/* Button to add student */}
        <button onClick={handleAddStudentClick} className="add-button">
          Add New Student
        </button>

        {/* Only show Add Student Form if the user is logged in */}
        {showAddForm && user && <AddStudentForm setStudents={setStudents} />}

        {/* Show login prompt message if the user is not logged in and they clicked Add New Student */}
        {showLoginMessage && !user && (
          <p>You must log in to add a new student.</p>
        )}
      </div>

      <div className="right-side">
        {/* Always show login/logout functionality */}
        {user ? (
          <div>
            <p>Welcome, {user.email}</p>
            <button onClick={() => auth.signOut()}>Logout</button>
          </div>
        ) : (
          <div>
            <p>Please log in to manage students.</p>
            <LoginForm />
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default App;
