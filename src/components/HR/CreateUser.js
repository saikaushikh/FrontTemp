import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Grid, TextField, Button, Alert, MenuItem, Select } from '@mui/material';
import Sidebar from '../HR/HRSidebar';

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  username: '',
  password: '',
  role: '',
  hr_id: '',
  manager_id: ''
};

const CreateUser = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.role) newErrors.role = 'Role is required';

    if (formData.role === 'Manager' && !formData.hr_id) newErrors.hr_id = 'HR ID is required';
    if (formData.role === 'Employee') {
      if (!formData.hr_id) newErrors.hr_id = 'HR ID is required';
      if (!formData.manager_id) newErrors.manager_id = 'Manager ID is required';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const url = formData.role === 'Manager'
        ? 'http://localhost:8080/manager/add'
        : 'http://localhost:8080/user/add';

      // Payload for POST request
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        username: formData.username,
        password: formData.password,
        role: formData.role
      };

      // Axios POST request with parameters for HR ID and Manager ID
      await axios.post(url, payload, {
        params: {
          hr_id: formData.hr_id || null, // Send null if not provided
          manager_id: formData.role === 'Employee' ? formData.manager_id || null : null // Send manager_id only for employees
        },
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const successMessage = formData.role === 'Manager' ? 'A new Manager is created' : 'A new Employee is added';
      setAlertMessage(successMessage);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);

      // Reset form
      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      console.error('Error creating user:', error);
      setAlertMessage('Error creating user: ' + (error.response ? error.response.data.message : error.message));
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  // Render the component
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3, overflowY: 'auto' }}>
        <Paper elevation={3} sx={{ padding: 3, maxWidth: 600, margin: '0 auto' }}>
          <Typography variant="h4" align="center" gutterBottom color="black">
            Create User
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  error={Boolean(errors.username)}
                  helperText={errors.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  error={Boolean(errors.role)}
                >
                  <MenuItem value="">Select Role</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                  <MenuItem value="Employee">Employee</MenuItem>
                </Select>
                {errors.role && <Typography color="error">{errors.role}</Typography>}
              </Grid>
              {formData.role === 'Manager' && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="HR ID"
                    name="hr_id"
                    value={formData.hr_id}
                    onChange={handleChange}
                    error={Boolean(errors.hr_id)}
                    helperText={errors.hr_id}
                  />
                </Grid>
              )}
              {formData.role === 'Employee' && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="HR ID"
                      name="hr_id"
                      value={formData.hr_id}
                      onChange={handleChange}
                      error={Boolean(errors.hr_id)}
                      helperText={errors.hr_id}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Manager ID"
                      name="manager_id"
                      value={formData.manager_id}
                      onChange={handleChange}
                      error={Boolean(errors.manager_id)}
                      helperText={errors.manager_id}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Create User
                </Button>
              </Grid>
            </Grid>
          </form>
          {showAlert && (
            <Alert severity={alertMessage.startsWith('Error') ? 'error' : 'success'} sx={{ mt: 2 }}>
              {alertMessage}
            </Alert>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default CreateUser;
