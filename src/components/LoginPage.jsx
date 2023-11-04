import React from "react";

function LoginPage() {
  return (
    <div className="mainLoginPage">
      <img src="./logo.png" />
      <form>
        <input type="text" required placeholder="Username"></input>
        <input type="text" required placeholder="Password" cols="300"></input>
        <div>
          <button>Login</button>
          <button>Sign Up</button>
        </div>
        <p>Forgot your password?</p>
      </form>
    </div>
  )
}

export default LoginPage;