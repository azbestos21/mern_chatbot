// src/pages/VerifyPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const VerifyPage = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    const verifyUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/verify-user?token=${token}`);
        setMessage(response.data.message);
      } catch (error) {
        console.error(error);
        setMessage('Verification failed.');
      }
    };

    verifyUser();
  }, [location.search]);

  return (
    <div>
      <h1>Verify Account</h1>
      <p>{message}</p>
    </div>
  );
};

export default VerifyPage;
