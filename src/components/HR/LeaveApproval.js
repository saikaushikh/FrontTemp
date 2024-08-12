import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Button, Alert } from '@mui/material';
import Sidebar from '../HR/HRSidebar';
import axios from 'axios';

const LeaveApproval = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [error, setError] = useState('');

    const fetchLeaveRequests = async () => {
        try {
            const response = await axios.get('http://localhost:8080/leave/apply/hr/getAll');
            setLeaveRequests(response.data);
        } catch (err) {
            setError('Failed to fetch leave requests.');
        }
    };

    const handleAcceptLeave = async (id) => {
        try {
            await axios.patch(`http://localhost:8080/leave/hr/approve/${id}`);
            setLeaveRequests(leaveRequests.filter(request => request.id !== id));
            setFeedbackMessage('Leave request accepted successfully!');
            setError('');
        } catch (err) {
            setError('Failed to accept leave request.');
        }
    };

    const handleDenyLeave = async (id) => {
        try {
            await axios.patch(`http://localhost:8080/leave/hr/deny/${id}`);
            setLeaveRequests(leaveRequests.filter(request => request.id !== id));
            setFeedbackMessage('Leave request denied!');
            setError('');
        } catch (err) {
            setError('Failed to deny leave request.');
        }
    };

    useEffect(() => {
        fetchLeaveRequests();
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Paper elevation={3} sx={{ padding: 3, marginBottom: 2 }}>
                    <Typography variant="h4" align="center" gutterBottom color="black">
                        Leave Approval
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

                <Box sx={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '16px' }}>
                    <Grid container spacing={3}>
                        {leaveRequests.map(request => (
                            <Grid item xs={12} md={6} key={request.id}>
                                <Card elevation={3} sx={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                                    <CardContent>
                                        <Typography variant="h6" color="black">
                                            Manager Name: {request.user.name}
                                        </Typography>
                                        <Typography variant="body2" color="black">
                                            Reason: {request.reason}
                                        </Typography>
                                        <Typography variant="body2" color="black">
                                            Start Date: {new Date(request.startDate).toLocaleDateString()}
                                        </Typography>
                                        <Typography variant="body2" color="black">
                                            End Date: {new Date(request.endDate).toLocaleDateString()}
                                        </Typography>
                                        <Box sx={{ mt: 2 }}>
                                            <Button
                                                variant="contained"
                                                color="success"
                                                sx={{ mr: 1 }}
                                                onClick={() => handleAcceptLeave(request.id)}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => handleDenyLeave(request.id)}
                                            >
                                                Deny
                                            </Button>
                                        </Box>
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

export default LeaveApproval;
