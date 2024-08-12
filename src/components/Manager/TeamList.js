import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent, Button, TextField, Alert
} from '@mui/material';
import Sidebar from '../Manager/ManagerSidebar';
import axios from 'axios';
import './../../styles/Manager/TeamList.css';

const TeamList = () => {
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
  });
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [error, setError] = useState('');
  const managerId = 1; // Replace with actual manager ID (e.g., from context or props)

  useEffect(() => {
    axios.get(`http://localhost:8080/user/byManager/${managerId}`)
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  }, [managerId]);

  const handleEditClick = (employee) => {
    setIsEditing(employee.id);
    setEditFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      role: employee.role,
    });
  };

  const handleSave = () => {
    if (!editFormData.name || !editFormData.email || !editFormData.phone || !editFormData.role) {
      setError('All fields are required');
      return;
    }
    const updatedEmployees = employees.map(employee =>
      employee.id === isEditing ? { ...employee, ...editFormData } : employee
    );
    setEmployees(updatedEmployees);
    setIsEditing(null);
    setFeedbackMessage('Employee details updated successfully!');
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleCancel = () => {
    setIsEditing(null);
    setError('');
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/user/delete/${id}`)
      .then(response => {
        const updatedEmployees = employees.filter(employee => employee.id !== id);
        setEmployees(updatedEmployees);
        setFeedbackMessage('Employee deleted successfully!');
        setError('');
      })
      .catch(error => {
        console.error('Error deleting employee:', error);
      });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" align="center" gutterBottom color="black">
            Team List
          </Typography>
        </Paper>
        
        {feedbackMessage && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {feedbackMessage}
          </Alert>
        )}
        
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3} sx={{ mt: 3 }}>
          {employees.map(employee => (
            <Grid item xs={12} md={6} key={employee.id}>
              <Card elevation={3} sx={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                <CardContent>
                  {isEditing === employee.id ? (
                    <>
                      <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={editFormData.name}
                        onChange={handleChange}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={editFormData.email}
                        onChange={handleChange}
                        margin="normal"
                        type="email"
                      />
                      <TextField
                        fullWidth
                        label="Phone"
                        name="phone"
                        value={editFormData.phone}
                        onChange={handleChange}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Role"
                        name="role"
                        value={editFormData.role}
                        onChange={handleChange}
                        margin="normal"
                      />
                      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={handleSave}
                        >
                          Save
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Typography variant="h6" color="black">
                        {employee.name}
                      </Typography>
                      <Typography variant="body2" color="black">
                        <strong>Email:</strong> {employee.email}
                      </Typography>
                      <Typography variant="body2" color="black">
                        <strong>Phone:</strong> {employee.phone}
                      </Typography>
                      <Typography variant="body2" color="black">
                        <strong>Role:</strong> {employee.role}
                      </Typography>
                      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEditClick(employee)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(employee.id)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default TeamList;
