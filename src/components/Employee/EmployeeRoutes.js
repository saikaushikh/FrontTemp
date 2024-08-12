import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeeDashboard from '../components/Employee/EmployeeDashboard';
import DeadlinesPage from '../components/Employee/DeadlinesPage';
import EditPersonalDetails from '../components/Employee/EditPersonalDetails';
import ApplyLeave from '../components/Employee/ApplyLeave';
import Feedback from '../components/Employee/Feedback';

const EmployeeRoutes = () => (
  <Routes>
    <Route path="dashboard" element={<EmployeeDashboard />} />
    <Route path="deadlines" element={<DeadlinesPage />} />
    <Route path="editPersonalDetails" element={<EditPersonalDetails />} />
    <Route path="feedback" element={<Feedback />} />
    <Route path="applyLeave" element={<ApplyLeave />} />
    
  </Routes>
);

export default EmployeeRoutes;
