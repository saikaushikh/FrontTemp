import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, TextField, Button, MenuItem, Select, FormControl, InputLabel, Grid, Alert } from '@mui/material';
import Sidebar from './ManagerSidebar'; // Assuming you have a Sidebar component for the Manager
import axios from 'axios'; // Importing axios for making HTTP requests
import '../../styles/Manager/SetTasks.css'; // Custom styles

const SetTasks = () => {
  const [taskName, setTaskName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [employees, setEmployees] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [managerId, setManagerId] = useState(1); // Replace with actual logic to get the managerId

  useEffect(() => {
    // Fetch employees by manager ID
    axios.get(`/user/byManager/${managerId}`)
      .then(response => {
        console.log('Fetched employees:', response.data); // Debugging
        setEmployees(response.data);
      })
      .catch(error => console.error('Error fetching employees:', error));
  }, [managerId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to add the task
      const response = await axios.post(`/tasks/add`, {
        taskname: taskName,
        deadline: deadline,
      }, {
        params: {
          user: selectedEmployee // Pass the selected employee ID as a query parameter
        }
      });

      if (response.status === 201) { // Check for the correct response status
        setSuccessMessage('Task assigned successfully!');
        setTaskName('');
        setDeadline('');
        setSelectedEmployee('');
      } else {
        throw new Error('Failed to assign task');
      }
    } catch (error) {
      console.error('Error:', error);
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
                Assign Tasks to Employees
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <form onSubmit={handleFormSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Task Name"
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Deadline"
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel>Select Employee</InputLabel>
                      <Select
                        value={selectedEmployee}
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                        displayEmpty
                      >
                        <MenuItem value="" disabled>Select an employee</MenuItem>
                        {employees.map((employee) => (
                          <MenuItem key={employee.id} value={employee.id}>
                            {employee.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  {successMessage && (
                    <Grid item xs={12}>
                      <Alert severity="success">{successMessage}</Alert>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" type="submit">
                      Assign Task
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SetTasks;
