import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate hook

const VerifyPage = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate(); // Use the useNavigate hook

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    const verifyUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/verify-user?token=${token}`);
        setMessage(response.data.message);
        // If verification is successful, navigate to the dashboard
        navigate('/dashboard');
      } catch (error) {
        console.error(error);
        setMessage('Verification failed.');
      }
    };

    verifyUser();
  }, [location.search, navigate]); // Include navigate in the dependencies array

  return (
    <div>
      <h1>Verify Account</h1>
      <p>{message}</p>
    </div>
  );
};

export default VerifyPage;
