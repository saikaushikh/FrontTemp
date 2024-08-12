import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Grid, Button, Alert, Snackbar } from '@mui/material';
import Sidebar from '../HR/HRSidebar';
import axios from 'axios';
import '../../styles/HR/HRFeedback.css';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/fb/get-all');
        setFeedbacks(response.data);
      } catch (error) {
        console.error('Failed to fetch feedbacks', error);
      }
    };

    fetchFeedbacks();
  }, []);

  const deleteFeedback = async (id) => {
    try {
      await axios.delete('http://localhost:8080/fb/delete', {
        params: { feedbackId: id }
      });
      setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
      setAlertMessage('Feedback deleted successfully');
      setAlertSeverity('success');
    } catch (error) {
      console.error('Failed to delete feedback', error);
      setAlertMessage('Failed to delete feedback');
      setAlertSeverity('error');
    }
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" align="center" color="black">
            Employee Feedback
          </Typography>
        </Box>
        {feedbacks.length === 0 ? (
          <Typography variant="body1" align="center" color="textSecondary">
            No feedback available
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {feedbacks.map(feedback => (
              <Grid item xs={12} sm={6} md={4} key={feedback.id}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Typography variant="h6" color="black">
                    {feedback.fromName}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }} color="black">
                    {feedback.message}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => deleteFeedback(feedback.id)}
                  >
                    Mark as read
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert
            onClose={handleCloseAlert}
            severity={alertSeverity}
            sx={{ width: '100%' }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default Feedback;