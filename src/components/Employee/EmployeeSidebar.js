import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import FeedbackIcon from '@mui/icons-material/Feedback';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import LogoImg from '../../assets/Indus.png'; 
import '../../styles/Employee/EmployeeSidebar.css';

const Sidebar = () => {
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
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', padding: '16px', cursor: 'pointer', justifyContent: open ? 'space-between' : 'center' }} onClick={toggleSidebar}>
          <IconButton>
            <MenuIcon />
          </IconButton>
        </Box>
        {open && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
            <img src={LogoImg} alt="Indus Logo" className="circular-logo" />
          </Box>
        )}
        <Divider />
        <List>
          <ListItem button component={NavLink} to="/Employee/dashboard">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            {open && <ListItemText primary="Dashboard" />}
          </ListItem>
          <ListItem button component={NavLink} to="/Employee/tasks">
            <ListItemIcon><AssignmentIcon /></ListItemIcon>
            {open && <ListItemText primary="Deadlines" />}
          </ListItem>
          <ListItem button component={NavLink} to="/Employee/apply-leave">
            <ListItemIcon><EventNoteIcon /></ListItemIcon>
            {open && <ListItemText primary="Leave Application" />}
          </ListItem>
          <ListItem button component={NavLink} to="/Employee/feedback">
            <ListItemIcon><FeedbackIcon /></ListItemIcon>
            {open && <ListItemText primary="Feedback" />}
          </ListItem>
          <ListItem button component={NavLink} to="/Employee/profile">
            <ListItemIcon><PersonIcon /></ListItemIcon>
            {open && <ListItemText primary="Edit Personal Details" />}
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Main content will go here */}
      </Box>
    </Box>
  );
};

export default Sidebar;
