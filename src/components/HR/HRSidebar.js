import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FeedbackIcon from '@mui/icons-material/Feedback';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import LogoImg from '../../assets/Indus.png';
import '../../styles/HR/HRSidebar.css';

const HRSidebar = () => {
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
          <ListItem button component={NavLink} to="/hr/dashboard">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            {open && <ListItemText primary="Dashboard" />}
          </ListItem>
          <ListItem button component={NavLink} to="/hr/leave-approval">
            <ListItemIcon><AssignmentIcon /></ListItemIcon>
            {open && <ListItemText primary="Leave Approval" />}
          </ListItem>
          <ListItem button component={NavLink} to="/hr/employee-list">
            <ListItemIcon><ListIcon /></ListItemIcon>
            {open && <ListItemText primary="Users List" />}
          </ListItem>
          <ListItem button component={NavLink} to="/hr/create-user">
            <ListItemIcon><AddIcon /></ListItemIcon>
            {open && <ListItemText primary="Create Employee" />}
          </ListItem>
          <ListItem button component={NavLink} to="/hr/feedback">
            <ListItemIcon><FeedbackIcon /></ListItemIcon>
            {open && <ListItemText primary="Feedback" />}
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Main content will go here */}
      </Box>
    </Box>
  );
};

export default HRSidebar;
