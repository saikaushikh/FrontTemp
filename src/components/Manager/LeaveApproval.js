import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, Button, Alert } from '@mui/material';
import Sidebar from '../Manager/ManagerSidebar';
import '../../styles/Manager/LeaveApproval.css';
import axios from 'axios';

const LeaveApproval = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [list, setList] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [error, setError] = useState('');

    const handleAcceptLeave = async(id) => {
        console.log(id);
        const res=axios.patch(`http://localhost:8080/leave/manager/approve/${id}`)
        setLeaveRequests(leaveRequests.filter(request => request.id !== id));
        setFeedbackMessage('Leave request accepted successfully!');
        setError('');
    };

    const handleDenyLeave = (id) => {
        const res=axios.patch(`http://localhost:8080/leave/manager/deny/${id}`)
        setLeaveRequests(leaveRequests.filter(request => request.id !== id));
        setFeedbackMessage('Leave request denied!');
        setError('');
    };

    const handlingGet = async () => {
        setList([]);
        try {
            const res = await axios.get("http://localhost:8080/leave/apply/manager/getAll");
            setList(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        handlingGet();

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
                        {list.map(request => (
                            <Grid item xs={12} md={6} key={request.id}>
                                <Card elevation={3} sx={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                                    <CardContent>
                                        <Typography variant="h6" color="black">
                                            Employee Name: {request.user.name}
                                        </Typography>
                                        <Typography variant="body2" color="black">
                                            Position: {request.user.role}
                                        </Typography>
                                        <Typography variant="body2" color="black">
                                            Start Date: {request.startDate}
                                        </Typography>
                                        <Typography variant="body2" color="black">
                                            End Date: {request.endDate}
                                        </Typography>
                                        <Typography variant="body2" color="black">
                                            Reason: {request.reason}
                                        </Typography>
                                        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                                            <Button 
                                                variant="contained" 
                                                color="success" 
                                                onClick={() => handleAcceptLeave(request.id)}>
                                                Accept
                                            </Button>
                                            
                                            <Button 
                                                variant="contained" 
                                                color="error" 
                                                onClick={() => handleDenyLeave(request.id)}>
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
