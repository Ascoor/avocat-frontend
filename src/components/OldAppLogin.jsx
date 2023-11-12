// OldAppLogin.js

import React, { useState } from 'react';

const OldAppLogin = () => {
  const [accountName, setAccountName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Implement your login logic here
    // You can make an API request to your old cloud-based app for authentication
    // Handle success or error accordingly
  };

  return (
    <div>
      <h2>Login to Old Cloud-Based App</h2>
      <input
        type="text"
        placeholder="Account Name"
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default OldAppLogin;
