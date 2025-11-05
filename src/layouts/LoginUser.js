import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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
  const {isAuthenticated} = useSelector((state) => state.auth);

   if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

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
            user: loggedUser.user          
          })
        );
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
      <div
        className="button loginButton"
        onClick={handleLogin}
      >
        Login
      </div>
      <Link className="forgetPwd" to="/forgot-password">
      <p>Forgot your password?</p>
      </Link>
      <Link to="/register">
        <div className="button-2 registerButton">
          Register
        </div>
      </Link>
    </div>
  );
}
