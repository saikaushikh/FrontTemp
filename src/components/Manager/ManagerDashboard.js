import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, TextField, Button, Alert } from '@mui/material';
import Sidebar from '../Manager/ManagerSidebar'; // Assuming there's a Sidebar component for the manager
import '../../styles/Manager/ManagerDashboard.css';

const ManagerDashboard = () => {
    const [formData, setFormData] = useState({
        name: '',
        department: '',
        feedback: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [showForm, setShowForm] = useState(false);

    const validateForm = () => {
        let formErrors = {};
        if (!formData.name) formErrors.name = 'Name is required';
        if (!formData.department) formErrors.department = 'Department is required';
        if (!formData.feedback) formErrors.feedback = 'Feedback is required';
        return formErrors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            setSuccessMessage('Feedback submitted successfully!');
            setFormData({ name: '', department: '', feedback: '' });
            setErrors({});
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ padding: 3 }}>
                            <Typography variant="h4" align="center" gutterBottom color="black">
                                Manager Dashboard
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom color="black">
                                    Approve or Deny Leave Requests
                                </Typography>
                                <Typography variant="body1" color="black">
                                    Manage leave requests from your team. Approve or deny requests and ensure proper documentation of leaves.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom color="black">
                                    View Team Information
                                </Typography>
                                <Typography variant="body1" color="black">
                                    Access detailed information about your team members, including their roles, responsibilities, and performance metrics.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom color="black">
                                    Provide Feedback to Employees
                                </Typography>
                                <Typography variant="body1" color="black">
                                    Give constructive feedback to your team members. Help them grow by recognizing their strengths and identifying areas for improvement.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom color="black">
                                    Monitor Overall Team Performance
                                </Typography>
                                <Typography variant="body1" color="black">
                                    Track the performance of your team with detailed reports and analytics. Identify trends and make informed decisions to drive success.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        {showForm && (
                            <Box component="form" sx={{ mt: 3 }} onSubmit={handleFormSubmit}>
                                <Paper elevation={3} sx={{ padding: 3 }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Employee Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                error={Boolean(errors.name)}
                                                helperText={errors.name}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Department"
                                                name="department"
                                                value={formData.department}
                                                onChange={handleInputChange}
                                                error={Boolean(errors.department)}
                                                helperText={errors.department}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Feedback"
                                                name="feedback"
                                                value={formData.feedback}
                                                onChange={handleInputChange}
                                                error={Boolean(errors.feedback)}
                                                helperText={errors.feedback}
                                            />
                                        </Grid>
                                        {successMessage && (
                                            <Grid item xs={12}>
                                                <Alert severity="success">{successMessage}</Alert>
                                            </Grid>
                                        )}
                                        <Grid item xs={12}>
                                            <Button variant="contained" color="primary" type="submit">
                                                Submit Feedback
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default ManagerDashboard;
