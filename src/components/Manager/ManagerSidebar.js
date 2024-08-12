import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FeedbackIcon from '@mui/icons-material/Feedback';
import GroupIcon from '@mui/icons-material/Group';
import MenuIcon from '@mui/icons-material/Menu';
import TaskIcon from '@mui/icons-material/Task'; // Import TaskIcon
import logo from '../../assets/Indus.png';
import '../../styles/Manager/ManagerSidebar.css';

const ManagerSidebar = () => {
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const drawerWidth = open ? 240 : 60;

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            transition: 'width 0.3s',
            backgroundColor: '#ffffff', // White background
            color: '#000000', // Black text color
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px',
            cursor: 'pointer',
            justifyContent: open ? 'space-between' : 'center',
          }}
          onClick={toggleSidebar}
        >
          <IconButton>
            <MenuIcon sx={{ color: '#000000' }} /> {/* Black icon color */}
          </IconButton>
        </Box>
        {open && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
            <img src={logo} alt="Indus Logo" className="circular-logo" />
          </Box>
        )}
        <Divider sx={{ borderColor: '#000000' }} /> {/* Black divider color */}
        <List>
          <ListItem button component={NavLink} to="/Manager/dashboard">
            <ListItemIcon><HomeIcon sx={{ color: '#000000' }} /></ListItemIcon>
            {open && <ListItemText primary="Dashboard" />}
          </ListItem>
          <ListItem button component={NavLink} to="/Manager/leave-approval">
            <ListItemIcon><AssignmentIcon sx={{ color: '#000000' }} /></ListItemIcon>
            {open && <ListItemText primary="Leave Approval" />}
          </ListItem>
          <ListItem button component={NavLink} to="/Manager/leave-application">
            <ListItemIcon><EventNoteIcon sx={{ color: '#000000' }} /></ListItemIcon>
            {open && <ListItemText primary="Leave Request" />}
          </ListItem>
          <ListItem button component={NavLink} to="/Manager/team-list">
            <ListItemIcon><GroupIcon sx={{ color: '#000000' }} /></ListItemIcon>
            {open && <ListItemText primary="Team List" />}
          </ListItem>
          <ListItem button component={NavLink} to="/Manager/feedback">
            <ListItemIcon><FeedbackIcon sx={{ color: '#000000' }} /></ListItemIcon>
            {open && <ListItemText primary="Feedback" />}
          </ListItem>
          <ListItem button component={NavLink} to="/Manager/set-tasks">
            <ListItemIcon><TaskIcon sx={{ color: '#000000' }} /></ListItemIcon>
            {open && <ListItemText primary="Set Tasks" />}
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Main content will go here */}
      </Box>
    </Box>
  );
};

export default ManagerSidebar;