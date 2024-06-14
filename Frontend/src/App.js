// src/App.js
import React from 'react';
import GenerateAccessCodes from './GenerateAccessCodes';
import VerifyAccessCode from './VerifyAccessCode';

function App() {
  const userId = 'user123'; // Replace with actual user ID from authentication

  return (
    <div className="App">
      <h1>Home Security System</h1>
      <GenerateAccessCodes userId={userId} />
      <VerifyAccessCode userId={userId} />
    </div>
  );
}

export default App;
