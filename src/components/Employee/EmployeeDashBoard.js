import React, { useState } from 'react';
import { Box, Typography, Grid, Paper, Card, CardContent, TextField, Button, Alert } from '@mui/material';
import Sidebar from './EmployeeSidebar';
import '../../styles/Employee/Employee.css';

const EmployeeDashboard = () => {
    // Retrieve user data from local storage
    const storedUser = JSON.parse(localStorage.getItem('user')) || {};

    const employee = {
        name: storedUser.name, // Fetch name from storedUser or provide a fallback
        role: storedUser.role,
    };

    // Form state and handlers
    const [formData, setFormData] = useState({
        feedback: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [showForm, setShowForm] = useState(false);

    const validateForm = () => {
        let formErrors = {};
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
            setFormData({ feedback: '' });
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
                    {/* Welcome Container */}
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ padding: 3 }}>
                            <Typography variant="h4" align="center" gutterBottom>
                                Employee Dashboard
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>
                                    Welcome, {storedUser.name}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Role: {storedUser.role}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Motivation Container */}
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ padding: 3 }}>
                            <Typography variant="h5" gutterBottom>
                                Stay Motivated!
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                Remember, your efforts contribute to the success of the team and the company. Keep up the great work, and always strive for excellence. Your hard work is noticed and appreciated!
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Leave Information Container */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ padding: 3 }}>
                            <Typography variant="h5" gutterBottom>
                                Applying for Leave
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                If you need to take some time off, please submit a leave request through the HR portal or contact your manager directly. Make sure to provide a valid reason and plan your leave in advance to ensure a smooth workflow.
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* Feedback Information Container */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ padding: 3 }}>
                            <Typography variant="h5" gutterBottom>
                                Send Us Your Feedback
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                We value your feedback! If you have suggestions or comments about the workplace, your role, or any other aspect, please share them with us. Your input helps us improve and create a better work environment.
                            </Typography>
                            
                        </Paper>
                    </Grid>

                    {/* Feedback Form */}
                   
                </Grid>
            </Box>
        </Box>
    );
};

export default EmployeeDashboard;
