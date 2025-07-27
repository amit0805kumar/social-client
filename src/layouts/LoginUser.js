import * as React from "react";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginFailure, loginSuccess } from "../store/authSlice";
import { loginUser } from "../services/authService";

export default function LoginUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  };


  const handleLogin = async () => {
    try {
      if (username != "" && password != "") {
        dispatch(loginStart());
        const loggedUser = await loginUser(username, password);
        dispatch(
          loginSuccess({
            user: loggedUser.user,
            token: loggedUser.token,
          })
        );
        localStorage.setItem("user", JSON.stringify(loggedUser.user));
        localStorage.setItem("token", JSON.stringify(loggedUser.token));
        navigate("/");
      } else {
        alert("Invalid fields");
      }
    } catch (error) {
      dispatch(
        loginFailure({
          error: "Login failed",
        })
      );
      console.error("Login failed:", error);
    }
  };


  return (
    <div className="formWrapper">
      <input
        name="username"
        required
        placeholder="Username"
        onChange={(e) => handleChange(e)}
        value={username}
      />
      <input
        name="password"
        required
        placeholder="Password"
        type="password"
        onChange={(e) => handleChange(e)}
        value={password}
      />
      {error && <p className="errorMessage">*{error}</p>}
      <Button
        variant="contained"
        size="large"
        color="success"
        onClick={handleLogin}
      >
        Login
      </Button>
      <Link to="/register">
        <Button variant="contained" size="large">
          Register
        </Button>
      </Link>
    </div>
  );
}
