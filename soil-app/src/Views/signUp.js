import React, { useState } from "react";
import { object, string } from "yup";
import { addItem } from "../Utils/storageHelper";

let userSchema = object().shape({
  password: string()
    .required()
    .test(
      "len",
      "Password must be at least 8 characters",
      (val) => val.length >= 8
    )
    .test(
      "special",
      "Password must contain at least one special character",
      (val) => /[!@#$%^&*(),.?":{}|<>]/.test(val)
    )
    .test(
      "upper",
      "Password must contain at least one uppercase letter",
      (val) => /[A-Z]/.test(val)
    ),
  email: string().email().required(),
  name: string().required(),
});
const SignUp = ({ setView, notify, logIn }) => {
  const [user, setUser] = useState({
    name: "",
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
    userSchema
      .validate(user)
      .then(() => {
        // Add added date to the user in user readable format
        user.created = new Date().toLocaleDateString();

        // Notify the user of successful sign up
        notify("Sign up Successful!");
        notify("You have now been logged in");

        // Add the user to the local storage
        addItem("users", user);

        // Log the user in and redirect to the profile page
        logIn(user);
      })
      .catch((err) => {
        const errorToTitleCase =
          err.errors[0].charAt(0).toUpperCase() + err.errors[0].slice(1);
        notify(errorToTitleCase ?? "unkown error", "error");
      });
  };

  return (
    <div className="signup-view">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleChange}
        />
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
