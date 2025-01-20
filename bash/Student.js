import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@mui/material';

export default function Student() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: '20px auto' };

  // State hooks for student data
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [students, setStudents] = useState([]);

  // Function to handle form submission
  const handleClick = (e) => {
    e.preventDefault();
    const student = { name, address };
    console.log(student);

    fetch('http://localhost:8080/student/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    }).then(() => {
      console.log('New Student added');
      // Refresh the student list after adding
      fetchStudents();
    });
  };

  // Function to fetch the student list
  const fetchStudents = () => {
    fetch('http://localhost:8080/student/getAll')
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  };

  // Fetch student data on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Container>
      {/* Form for adding a new student */}
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: 'blue', textAlign: 'center' }}>
          <u>Add Student</u>
        </h1>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center', // Align horizontally
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Student Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Student Address"
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button variant="contained" color="secondary" onClick={handleClick}>
            Submit
          </Button>
        </Box>
      </Paper>

      {/* Displaying the list of students */}
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ textAlign: 'center' }}>Students</h1>
        {students.map((student) => (
          <Paper
            elevation={6}
            style={{ margin: '10px', padding: '15px', textAlign: 'left' }}
            key={student.id}
          >
            Id: {student.id}
            <br />
            Name: {student.name}
            <br />
            Address: {student.address}
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
