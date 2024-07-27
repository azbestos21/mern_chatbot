import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../userAuth/PageStyles.css'; // Correct import for common page styles
import axios from 'axios';

const ServicesPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHospitals = async () => {
      const lat = '12.9823023'; // Example latitude
      const lng = '77.4756759'; // Example longitude

      try {
        const response = await axios.get('http://localhost:5000/api/hospitals', {
          params: { lat, lng },
        });
        const allHospitals = response.data.results || [];
        setHospitals(allHospitals.slice(0, 6)); // Limit to first 6 hospitals
      } catch (error) {
        console.error('Error fetching hospitals:', error);
        setError('An error occurred while fetching hospitals.');
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        <h1 className="main-heading">Nearby Hospitals</h1>
        {loading && <p>Loading hospitals...</p>}
        {error && <p className="error-message">{error}</p>}
        {hospitals.length > 0 ? (
          <ul className="hospital-list">
            {hospitals.map(hospital => (
              <li key={hospital.place_id} className="hospital-item">
                <h2 className="hospital-name">{hospital.name}</h2>
                <p className="hospital-address">{hospital.vicinity}</p>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No hospitals found in your area.</p>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
