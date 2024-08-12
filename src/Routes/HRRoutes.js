import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HRDashboard from '../components/HR/Dashboard';
import CreateUser from '../components/HR/CreateUser';
import EmployeeList from '../components/HR/EmployeeList';
import Feedback from '../components/HR/Feedback';
import LeaveApproval from '../components/HR/LeaveApproval';
import HRSidebar from '../components/HR/HRSidebar'; // Ensure this file exists

const HRRoutes = () => (
  <div>
    <HRSidebar />
    <Routes>
      <Route path="dashboard" element={<HRDashboard />} />
      <Route path="create-user" element={<CreateUser />} />
      <Route path="employee-list" element={<EmployeeList />} />
      <Route path="feedback" element={<Feedback />} />
      <Route path="leave-approval" element={<LeaveApproval />} />
      <Route path="*" element={<Navigate to="dashboard" />} />
    </Routes>
  </div>
);

export default HRRoutes;
