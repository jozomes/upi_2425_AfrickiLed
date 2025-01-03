import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Make a request to the backend when the component mounts
    fetch('http://localhost:3000/api/hello')
      .then((response) => response.json())  // Parse JSON response
      .then((data) => setMessage(data.message))  // Set the response message
      .catch((error) => console.error('Error:', error));  // Handle any errors
  }, []);  // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <h1>Server Response:</h1>
      <p>{message}</p>
    </div>
  );
};

export default MyComponent;
