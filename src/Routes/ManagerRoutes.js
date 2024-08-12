import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ManagerDashboard from '../components/Manager/ManagerDashboard';
import TeamList from '../components/Manager/TeamList';
import Feedback from '../components/Manager/Feedback';
import LeaveApplication from '../components/Manager/LeaveApplication';
import LeaveApproval from '../components/Manager/LeaveApproval';
import ManagerSidebar from '../components/Manager/ManagerSidebar';
import SetTasks from '../components/Manager/SetTasks';

const ManagerRoutes = () => (
  <div>
    <ManagerSidebar />
    <Routes>
      <Route path="dashboard" element={<ManagerDashboard />} />
      <Route path="feedback" element={<Feedback />} />
      <Route path="leave-application" element={<LeaveApplication />} />
      <Route path="leave-approval" element={<LeaveApproval />} />
      <Route path="team-list" element={<TeamList />} />
      <Route path="set-tasks" element={<SetTasks />} /> {/* Add this route */}
      <Route path="*" element={<Navigate to="dashboard" />} />
    </Routes>
  </div>
);

export default ManagerRoutes;