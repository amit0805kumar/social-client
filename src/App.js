import { useState, useEffect } from "react";
import Home from "./pages/Home";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Loader from "./components/Loader";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginStart, loginFailure,loginSuccess} from "./store/authSlice";
import { Fragment } from "react";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.auth.loading);
   const [authChecked, setAuthChecked] = useState(false);
 

  useEffect(() => {
    if(!user || !token) {
      dispatch(loginStart());
      const fetchedUser = JSON.parse(localStorage.getItem("user"));
      const fetchedToken = localStorage.getItem("token");
      if (fetchedUser && fetchedToken) {
        dispatch(loginSuccess({ user: fetchedUser, token: fetchedToken }));
      } else {
        dispatch(loginFailure("User not found or token missing"));
      }
      setAuthChecked(true);}
  }, []);

  if (!authChecked) return <Loader visible={true} />;


  return (
    <Fragment>
      <Loader visible={loading} />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute  Component={Home} />
            }
          />
          <Route exact path="/profile/:_id" element={<Profile />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
