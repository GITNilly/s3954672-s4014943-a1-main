import React, { useState } from "react";
import { getItem } from "../Utils/storageHelper";

const SignIn = ({ logIn, setView, notify }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let users = getItem("users") ?? [];
    let userIndex = users.findIndex(
      (u) => u.email === user.email && u.password === user.password
    );
    userIndex === -1
      ? notify("Invalid credentials", "error")
      : logIn(users[userIndex]);
  };

  return (
    <div className="signin-view">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
