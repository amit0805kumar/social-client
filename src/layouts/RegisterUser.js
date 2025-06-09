import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { callApi } from "../helpers/Helpers";
import { useNavigate } from 'react-router-dom';

export default function RegisterUser() {
  const navigate = useNavigate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rePassword, setRePassword] = useState("");

  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "rePassword":
        setRePassword(e.target.value);
        break;
    }
  };
  useEffect(() => {
    // Reset fields on component mount
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setRePassword("");
  }, []);

  const handleRegister = async () => {
    if (
      email !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      rePassword !== ""
    ) {
      if (password === rePassword) {
        try {
          // Call API to register user
          const response = await callApi("POST", "users", null, {
            email: email,
            password:password,
            firstName: firstName,
            LastName: lastName,
          });
    
          if (response.user) {
           navigate("/login");
          } else {
            alert("Registration failed!");
          }
        } catch (error) {
          console.error("Error during registration:", error);
          alert("An error occurred during registration.");
        }
      } else {
        alert("Passwords do not match!");
      }
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <div className="formWrapper">
      <input placeholder="First Name" name="firstName" value={firstName} onChange={handleChange}/>
      <input placeholder="Last Name" name="lastName" value={lastName}  onChange={handleChange} />
      <input placeholder="Email" name="email" value={email} onChange={handleChange} />
      <input placeholder="Password" type="password" name="password"  value={password} onChange={handleChange} />
      <input
        placeholder="Re-enter Password"
        type="password"
        name="rePassword"
        value={rePassword}
         onChange={handleChange}
      />
      <Button onClick={handleRegister} variant="contained" size="large">
        Register
      </Button>
      <Link to="/login">
        <Button variant="contained" size="large" color="success">
          Login
        </Button>
      </Link>
    </div>
  );
}
