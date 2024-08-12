import React, { useState, useEffect } from 'react';
import {
  Box, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper
} from '@mui/material';
import Sidebar from '../Employee/EmployeeSidebar';
import axios from 'axios';

const EditPersonalDetails = () => {
  const [profile, setProfile] = useState({
    id: '',
    fullName: '',
    emailAddress: '',
    userName: '',
    newPassword: '',
    contactNumber: '',
    hrId: '',
    userRole: '',
    managerId: ''
  });

  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
          setProfile({
            id: userData.id || '',
            fullName: userData.name || '',
            emailAddress: userData.email || '',
            userName: userData.username || '',
            newPassword: userData.password || '',
            contactNumber: userData.phone || '',
            hrId: userData.hr ? userData.hr.id : '',
            userRole: userData.role || '',
            managerId: userData.manager ? userData.manager.id : '',
          });
        } else {
          console.error('User data not found in local storage.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!profile.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
      isValid = false;
    }
    if (!profile.emailAddress.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      newErrors.emailAddress = 'Invalid email address';
      isValid = false;
    }
    if (!profile.userName.trim()) {
      newErrors.userName = 'Username is required';
      isValid = false;
    }
    if (profile.newPassword && profile.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters long';
      isValid = false;
    }
    if (!profile.contactNumber.match(/^\d{10}$/)) {
      newErrors.contactNumber = 'Phone number must be 10 digits long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const postProfileSettings = async (updatedProfile) => {
    try {
      const response = await axios.post('http://localhost:8080/userDetails/add', {
        name: updatedProfile.fullName,
        email: updatedProfile.emailAddress,
        phone: updatedProfile.contactNumber,
        username: updatedProfile.userName,
        password: updatedProfile.newPassword,
        role: updatedProfile.userRole,
        hr: { id: updatedProfile.hrId },
        manager: { id: updatedProfile.managerId }
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response from server:', response);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error posting profile:', error.response.data);
      } else {
        console.error('Error posting profile:', error.message);
      }
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);

      try {
        await postProfileSettings(profile);
        setIsError(false);
        setIsSubmitting(false);
        setIsModalOpen(true);
      } catch (error) {
        setIsError(true);
        setIsSubmitting(false);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (!isError) {
      console.log('Profile settings updated successfully.');
    } else {
      console.log('There was an error updating the profile settings.');
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3, bgcolor: '#e0e0e0', overflow: 'auto' }}>
        <Paper elevation={3} sx={{ padding: 3, bgcolor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Edit Profile Settings
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: '600px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="id"
                  label="ID"
                  variant="outlined"
                  value={profile.id}
                  InputProps={{ readOnly: true }}
                  sx={{ bgcolor: 'white' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="hrId"
                  label="HR ID"
                  variant="outlined"
                  value={profile.hrId}
                  InputProps={{ readOnly: true }}
                  sx={{ bgcolor: 'white' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="userRole"
                  label="Role"
                  variant="outlined"
                  value={profile.userRole}
                  InputProps={{ readOnly: true }}
                  sx={{ bgcolor: 'white' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="managerId"
                  label="Manager ID"
                  variant="outlined"
                  value={profile.managerId}
                  InputProps={{ readOnly: true }}
                  sx={{ bgcolor: 'white' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="fullName"
                  name="fullName"
                  label="Full Name"
                  variant="outlined"
                  value={profile.fullName}
                  onChange={handleChange}
                  error={Boolean(errors.fullName)}
                  helperText={errors.fullName}
                  sx={{ bgcolor: 'white' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="emailAddress"
                  name="emailAddress"
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  value={profile.emailAddress}
                  onChange={handleChange}
                  error={Boolean(errors.emailAddress)}
                  helperText={errors.emailAddress}
                  sx={{ bgcolor: 'white' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="userName"
                  name="userName"
                  label="Username"
                  variant="outlined"
                  value={profile.userName}
                  onChange={handleChange}
                  error={Boolean(errors.userName)}
                  helperText={errors.userName}
                  sx={{ bgcolor: 'white' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="newPassword"
                  name="newPassword"
                  label="New Password"
                  type="password"
                  variant="outlined"
                  value={profile.newPassword}
                  onChange={handleChange}
                  error={Boolean(errors.newPassword)}
                  helperText={errors.newPassword}
                  sx={{ bgcolor: 'white' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="contactNumber"
                  name="contactNumber"
                  label="Contact Number"
                  type="tel"
                  variant="outlined"
                  value={profile.contactNumber}
                  onChange={handleChange}
                  error={Boolean(errors.contactNumber)}
                  helperText={errors.contactNumber}
                  sx={{ bgcolor: 'white' }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Updating...' : 'Update'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        <Dialog open={isModalOpen} onClose={closeModal}>
          <DialogTitle>{isError ? 'Error' : 'Success'}</DialogTitle>
          <DialogContent>
            <Typography>
              {isError ? 'There was an error updating the profile settings.' : 'Profile settings updated successfully!'}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeModal} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default EditPersonalDetails;
