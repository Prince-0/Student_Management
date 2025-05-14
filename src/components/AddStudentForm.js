import React, { useState } from 'react';
import axios from 'axios';

function AddStudentForm({ setStudents }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  if (!name || !email || !course) return alert("All fields are required");

  try {
    const response = await axios.post('/students', { name, email, course });
    setStudents((prev) => [...prev, response.data]);
    setName('');
    setEmail('');
    setCourse('');
  } catch (error) {
    console.error("Error adding student:", error);
    alert("Failed to add student.");
  }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="text" placeholder="Course" value={course} onChange={e => setCourse(e.target.value)} required />
      <button type="submit">Add Student</button>
    </form>
  );
}

export default AddStudentForm;
