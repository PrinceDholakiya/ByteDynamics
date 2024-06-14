// src/VerifyAccessCode.js
import React, { useState } from 'react';
import axios from 'axios';

function VerifyAccessCode({ userId }) {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/verify-code', { userId, code });
      setMessage(response.data);
    } catch (error) {
      setMessage(error.response.data);
    }
  };

  return (
    <div>
      <h3>Verify Access Code</h3>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter Access Code"
      />
      <button onClick={handleSubmit}>Verify Code</button>
      <p>{message}</p>
    </div>
  );
}

export default VerifyAccessCode;
