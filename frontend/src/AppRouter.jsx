// AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './userAuth/HomePage';
import LoginPage from './userAuth/LoginPage';
import RegisterPage from './userAuth/RegisterPage';
import VerifyPage from './userAuth/VerifyPage';
import Dashboard from './userAuth/Dashboard'; // Import Dashboard component
import PrivateRouter from './userAuth/PrivateRouter'; // Import PrivateRouter component using default import

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-user" element={<VerifyPage />} />
        <Route element={<PrivateRouter />}> {/* Protect routes inside PrivateRouter */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
