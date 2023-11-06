import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ username, usernameChangeHandler}) {
  const navigate = useNavigate();

  // const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function authenticateUser(e) {
    e.preventDefault();

    fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(res => res.json())
    .then(data => {
      console.log(data);
      if (data) {
        navigate('/mainmenu');
      } else {
        setPassword('');
      }
    });
  }

  return (
    <div className="mainLoginPage">
      <img src="./logo.png" />
      <form onSubmit={authenticateUser}>
        <input 
          className="formInput"
          name="username"
          type="text"
          value={username}
          onChange={usernameChangeHandler}
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
          <button className="orangeBtn" type='submit'>Login</button>
          <button className="orangeBtn"onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
        <p>Forgot your password?</p>
      </form>
    </div>
  )
}

export default LoginPage;