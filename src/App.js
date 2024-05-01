import React, { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    // Fetch students when component mounts
    fetchStudents();
  }, []);

  useEffect(() => {
    // Filter students whenever the search term changes
    const filtered = students.filter(student =>
      student.student_id.toString().includes(searchTerm) ||
      student.name.toLowerCase().includes(searchTerm) ||
      student.major.toLowerCase().includes(searchTerm)
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/students'); // Adjust the URL as needed
      setStudents(response.data);
      setFilteredStudents(response.data); // Initialize with all students
    } catch (error) {
      console.error('Error fetching students:', error);
      // Handle error appropriately
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  return (
    <div className="App">
      <header className="App-header">
        <SearchBox onSearchChange={handleSearchChange} value={searchTerm} />

        <img src={logo} className="App-logo" alt="logo" />
        
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Major</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.student_id}>
                <td>{student.student_id}</td>
                <td>{student.name}</td>
                <td>{student.major}</td>
                <td>{student.year}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {students.length === 0 && <p>No students found.</p>}
      </header>
    </div>
  );
}

export default App;
