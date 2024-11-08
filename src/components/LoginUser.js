import React, { useState, useContext } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import { MyContext } from "../MyContext";
import { useNavigate } from 'react-router-dom';

export default function LoginUser() {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {loggedIn,setUser,setLoggedIn} = useContext(MyContext);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  };

  const handleLogin = async () => {
   try {
    if (email != "" && password != "") {
        const loggedUser = await axios.post("auth/login", {
          email: email,
          password: password,
        });
        setLoggedIn(true);
        setUser(loggedUser.data);
        navigate("/");
      } else {
        alert("Invalid fields");
      }
   } catch (error) {
    alert("Incorrect login credentials!");
   }
  };

  return (
    <div className="formWrapper">
      <input
        name="email"
        required
        placeholder="Email"
        type="email"
        onChange={(e) => handleChange(e)}
        value={email}
      />
      <input
        name="password"
        required
        placeholder="Password"
        type="password"
        onChange={(e) => handleChange(e)}
        value={password}
      />
      <Button
        variant="contained"
        size="large"
        color="success"
        onClick={handleLogin}
      >
        Login
      </Button>
      <Button variant="contained" size="large">
        Register
      </Button>
    </div>
  );
}
