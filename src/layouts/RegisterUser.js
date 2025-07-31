import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { registerUser } from "../services/authService";

export default function RegisterUser() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
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
      case "email":
        setEmail(e.target.value);
        break;
      default:
        break;  
    }
  };
  useEffect(() => {
    // Reset fields on component mount
    setUsername("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setRePassword("");
    setEmail("");
  }, []);

  const handleRegister = async () => {
    if (
      username !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      rePassword !== "" &&
      email !== ""
    ) {
      if (password === rePassword) {
        try {
          // Call API to register user
          const response = await registerUser({
            username: username,
            password:password,
            firstName: firstName,
            LastName: lastName,
            email: email,
          })
          
          if (response.success) {
           navigate("/login");
          }else{
            alert("Registration failed: " + response.message);
          }
        } catch (error) {
          console.error("Error during registration:", error);
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
      <input placeholder="Username" name="username" value={username} onChange={handleChange} />
      <input placeholder="Email" type="email" name="email" value={email} onChange={handleChange} />
      <input placeholder="Password" type="password" name="password"  value={password} onChange={handleChange} />
      <input
        placeholder="Re-enter Password"
        type="password"
        name="rePassword"
        value={rePassword}
         onChange={handleChange}
      />
      <div onClick={handleRegister} className="button loginButton">
        Register
      </div>
      <Link to="/login">
        <div className="button-2 registerButton">
          Login
        </div>
      </Link>
    </div>
  );
}
