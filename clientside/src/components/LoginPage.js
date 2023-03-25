import './LoginPage.css';
import React, { useState } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (response.status === 200) {
        //successful login
        window.location.href = '/';
      } else {
        // error message for wrong password
      }
    } catch (error) {
      // error message for some issue
    }
    
  };

  return (
    <div className="login-page">
      <h1>Welcome to Flux Marine</h1>
     
      <form onSubmit={handleSubmit}>
        <label><h2>Login</h2></label>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <div className="forgot-password">
        <a href="#">Forgot Password?</a>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoginPage;
