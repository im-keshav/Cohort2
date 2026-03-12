import React from "react";
import "../style/form.scss";
import { Link } from "react-router";
import { useState } from "react";
import { register } from "../services/auth.api";

function Resigter() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);


async function handleformSubmit(e){
    e.preventDefault()

    try {
      const response = await register(username, email, password)
      console.log(response)
    } catch (err) {
      console.error(err)
    }

}

 

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        <form action="" onSubmit={(e)=>{handleformSubmit(e)}}>
          <input
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="Enter username"
          />
          <input
            onInput={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            name="email"
            placeholder="Enter email"
          />
          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            placeholder="Enter password"
          />

          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account?{" "}
          <Link className="toggleAuthform" to="/login">
            Login
          </Link>{" "}
        </p>
      </div>
    </main>
  );
}

export default Resigter;
