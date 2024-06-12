// src/GenerateAccessCodes.js
import React, { useState } from 'react';
import axios from 'axios';

function GenerateAccessCodes({ userId }) {
  const [members, setMembers] = useState(Array(7).fill(''));
  const [codes, setCodes] = useState([]);

  const handleChange = (index, value) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/generate-codes', { userId, members });
      setCodes(response.data);
    } catch (error) {
      console.error('Error generating codes:', error);
    }
  };

  return (
    <div>
      <h3>Generate Access Codes</h3>
      {members.map((member, index) => (
        <input
          key={index}
          type="text"
          value={member}
          onChange={(e) => handleChange(index, e.target.value)}
          placeholder={`Family Member ${index + 1}`}
        />
      ))}
      <button onClick={handleSubmit}>Generate Codes</button>
      <h4>Access Codes</h4>
      <ul>
        {codes.map((code, index) => (
          <li key={index}>{`Member: ${code.owner}, Code: ${code.code}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default GenerateAccessCodes;
