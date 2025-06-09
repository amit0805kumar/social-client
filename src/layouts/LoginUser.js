import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { callApi } from "../helpers/Helpers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginStart, loginFailure, loginSuccess } from "../store/authSlice";
export default function LoginUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        //movw this into service
        const loggedUser = await callApi("POST", "auth/login", null, {
          username: username,
          password: password,
        });
        dispatch(loginStart());
        dispatch(
          loginSuccess({
            user: loggedUser.data.user,
            token: loggedUser.data.token,
          })
        );
        localStorage.setItem("user", JSON.stringify(loggedUser.data.user));
        localStorage.setItem("token", JSON.stringify(loggedUser.data.token));
        navigate("/");
      } else {
        alert("Invalid fields");
      }
    } catch (error) {
      dispatch(loginFailure());
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
