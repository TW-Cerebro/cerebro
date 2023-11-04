import React from "react";
import { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function authenticateUser() {
    fetch('/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      })
    });
  }

  return (
    <div className="mainLoginPage">
      <img src="./logo.png" />
      <form>
        <input 
          className="formInput"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Username"></input>
        <input 
          className="formInput"
          name="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          cols="300"></input>
        <div>
          <button className="orangeBtn" onClick={authenticateUser}>Login</button>
          <button className="orangeBtn">Sign Up</button>
        </div>
        <p>Forgot your password?</p>
      </form>
    </div>
  )
}

export default LoginPage;