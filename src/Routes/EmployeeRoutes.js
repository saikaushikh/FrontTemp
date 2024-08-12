import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import EmployeeDashboard from '../components/Employee/EmployeeDashBoard';
import EmployeeProfile from '../components/Employee/EditPersonalDetails';
import EmployeeTasks from '../components/Employee/DeadlinesPage';
import EmployeeFeedback from '../components/Employee/Feedback';
import EmployeeSidebar from '../components/Employee/EmployeeSidebar';
import ApplyLeave from '../components/Employee/ApplyLeave';

const EmployeeRoutes = () => (
  <div>
    <EmployeeSidebar />
    <Routes>
      <Route path="dashboard" element={<EmployeeDashboard />} />
      <Route path="profile" element={<EmployeeProfile />} />
      <Route path="tasks" element={<EmployeeTasks />} />
      <Route path="feedback" element={<EmployeeFeedback />} />
      <Route path="apply-leave" element={<ApplyLeave />} />
      <Route path="*" element={<Navigate to="dashboard" />} />
    </Routes>
  </div>
);

export default EmployeeRoutes;
