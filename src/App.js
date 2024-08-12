import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import HRRoutes from './Routes/HRRoutes';
import EmployeeRoutes from './Routes/EmployeeRoutes';
import ManagerRoutes from './Routes/ManagerRoutes';
import { UserContext } from './components/UserContext/UserContext';

function App() {
  const { user } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      {user && user.role === 'HR' && <Route path="/hr/*" element={<HRRoutes />} />}
      {user && user.role === 'Employee' && <Route path="/employee/*" element={<EmployeeRoutes />} />}
      {user && user.role === 'Manager' && <Route path="/manager/*" element={<ManagerRoutes />} />}
      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  );
}

export default App;
