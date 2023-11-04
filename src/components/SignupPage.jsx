import React from "react";
import { useState } from "react";

function SignupPage() {
  const [firstname, setFirstname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');

  function createUser() {
    
  }


  return (
    <div className="signupPage">
      <img src="./logo.png"/>
      <form> 
        <table>
          <tr>
            <td><label>Firstname</label></td>
            <td><input className="formInput" type="text" required placeholder="What's your name?"></input></td>
          </tr>
          <tr>
            <td><label>Username</label></td>
            <td><input className="formInput" type="text" required placeholder="What username would you like?"></input></td>
          </tr>
          <tr>
            <td><label>Username</label></td>
            <td><input className="formInput" type="text" required placeholder="What username would you like?"></input></td>
          </tr>
          <tr>
            <td><label>Email</label></td>
            <td><input className="formInput" type="text" required placeholder="What's your email?"></input></td>
          </tr>
          <tr>
            <td><label>Grade Level</label></td>
            <td><input className="formInput" type="text" required placeholder="What's your grade level?"></input></td>
          </tr>
        </table>
        <div>
          <button class="orangeBtn">Create Account</button>
        </div>
      </form>
    </div>
  )
}

export default SignupPage;