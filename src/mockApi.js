// src/api.js
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Set up mock adapter to simulate an API
const instance = axios.create();

const mock = new MockAdapter(axios, { delayResponse: 1000 });

// Sample student data
let students = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', course: 'Math' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', course: 'Science' },
  { id: 3, name: 'Charlie Lee', email: 'charlie@example.com', course: 'social science' },
];

// Mock GET request to fetch students
mock.onGet('/students').reply(200, students);

// Mock POST request to add a new student
mock.onPost('/students').reply(config => {
  const newStudent = JSON.parse(config.data);
  newStudent.id = students.length + 1;
  students.push(newStudent);
  return [201, newStudent];
});

// Ensure you're exporting the axios instance with mock configuration
export default axios;
