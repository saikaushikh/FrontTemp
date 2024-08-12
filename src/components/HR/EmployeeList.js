import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Grid, Card, CardContent, Button,
  TextField, Alert, Radio, RadioGroup, FormControlLabel, FormControl
} from '@mui/material';
import Sidebar from '../HR/HRSidebar';
import axios from 'axios';
import './../../styles/HR/Employee.css';

const EmployeeManagerList = () => {
  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    username: '',
    password: '',
  });
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState('employee');

  useEffect(() => {
    fetchData();
  }, [selectedOption]);

  const fetchData = () => {
    const url = selectedOption === 'employee'
      ? 'http://localhost:8080/user/all'
      : 'http://localhost:8080/manager/all';

    axios.get(url)
      .then(response => {
        if (selectedOption === 'employee') {
          setEmployees(response.data);
        } else {
          setManagers(response.data);
        }
      })
      .catch(err => {
        console.error('Failed to fetch data:', err);
        setError('Failed to fetch data');
      });
  };

  const handleDelete = async (id) => {
    try {
      const url = selectedOption === 'employee'
        ? `http://localhost:8080/user/delete/${id}`
        : `http://localhost:8080/manager/delete/${id}`;

      await axios.delete(url);

      if (selectedOption === 'employee') {
        setEmployees(employees.filter(employee => employee.id !== id));
      } else {
        setManagers(managers.filter(manager => manager.id !== id));
      }

      setFeedbackMessage(`${selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)} deleted successfully!`);
      setError('');
    } catch (err) {
      console.error('Error deleting:', err);
      setError(`Failed to delete ${selectedOption}. ${err.message}`);
    }
  };

  const handleEdit = (id) => {
    const item = selectedOption === 'employee'
      ? employees.find(emp => emp.id === id)
      : managers.find(mgr => mgr.id === id);
    
    setIsEditing(id);
    setEditFormData({
      name: item.name,
      email: item.email,
      phone: item.phone,
      role: item.role,
      username: item.username,
      password: item.password
    });
  };

  const handleSave = () => {
    if (!editFormData.name || !editFormData.email || !editFormData.phone || !editFormData.role || !editFormData.username || !editFormData.password) {
      setError('All fields are required');
      return;
    }

    const url = selectedOption === 'employee'
      ? `http://localhost:8080/user/edit/${isEditing}`
      : `http://localhost:8080/manager/edit/${isEditing}`;

    const data = {
      name: editFormData.name,
      email: editFormData.email,
      phone: editFormData.phone,
      role: editFormData.role,
      username: editFormData.username,
      password: editFormData.password
    };

    axios.put(url, data)
      .then(() => {
        const updatedList = selectedOption === 'employee'
          ? employees.map(employee => employee.id === isEditing ? { ...employee, ...editFormData } : employee)
          : managers.map(manager => manager.id === isEditing ? { ...manager, ...editFormData } : manager);

        if (selectedOption === 'employee') {
          setEmployees(updatedList);
        } else {
          setManagers(updatedList);
        }

        setIsEditing(null);
        setFeedbackMessage(`${selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)} details updated successfully!`);
        setError('');
      })
      .catch((err) => {
        console.error('Error updating:', err);
        setError(`Failed to update ${selectedOption}. ${err.message}`);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleCancel = () => {
    setIsEditing(null);
    setError('');
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setFeedbackMessage('');
    setError('');
  };

  const displayList = selectedOption === 'employee' ? employees : managers;

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" align="center" gutterBottom color="black">
            {selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)} List
          </Typography>
        </Paper>

        <FormControl component="fieldset" sx={{ mt: 2 }}>
          <RadioGroup
            row
            aria-label="employee-manager"
            name="employee-manager"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <FormControlLabel value="employee" control={<Radio />} label="Employee" />
            <FormControlLabel value="manager" control={<Radio />} label="Manager" />
          </RadioGroup>
        </FormControl>

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

        <Box sx={{ maxHeight: '400px', overflow: 'auto', mt: 3 }}>
          <Grid container spacing={3}>
            {displayList.map(item => (
              <Grid item xs={12} md={6} key={item.id}>
                <Card elevation={3} sx={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                  <CardContent>
                    {isEditing === item.id ? (
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
                        <TextField
                          fullWidth
                          label="Username"
                          name="username"
                          value={editFormData.username}
                          onChange={handleChange}
                          margin="normal"
                        />
                        <TextField
                          fullWidth
                          label="Password"
                          name="password"
                          value={editFormData.password}
                          onChange={handleChange}
                          margin="normal"
                          type="password"
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
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="black">
                          <strong>Email:</strong> {item.email}
                        </Typography>
                        <Typography variant="body2" color="black">
                          <strong>Phone:</strong> {item.phone}
                        </Typography>
                        <Typography variant="body2" color="black">
                          <strong>Role:</strong> {item.role}
                        </Typography>
                        <Typography variant="body2" color="black">
                          <strong>Username:</strong> {item.username}
                        </Typography>
                        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEdit(item.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(item.id)}
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
    </Box>
  );
};

export default EmployeeManagerList;
