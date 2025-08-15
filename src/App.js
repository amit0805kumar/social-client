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
import Media from "./pages/Media";
import { Multiple } from "./pages/Multiple";
import ChangePassword from "./pages/ChangePassword";
import { callApi } from "./helpers/Helpers";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
   const [authChecked, setAuthChecked] = useState(false);
 

useEffect(() => {
    const checkAuth = async () => {
      dispatch(loginStart());
      try {
        // ✅ Call backend to verify user from HttpOnly cookie
        const response = await callApi("GET", "/auth/authCheck");
        if (response && response.isAuthenticated) {
          dispatch(loginSuccess({ user: response.user })); // token no longer needed
        } else {
          dispatch(loginFailure("User not authenticated"));
          <Navigate to="/login" replace />;
        }
      } catch (error) {
        dispatch(loginFailure("Auth check failed"));
        <Navigate to="/login" replace />;
      } finally {
        setAuthChecked(true);
      }
    };

    if (!user) {
      checkAuth();
    } else {
      setAuthChecked(true);
    }
  }, [user, dispatch]);


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
          <Route
            path="/multiple"
            element={
              <PrivateRoute  Component={Multiple} />
            }
          />
          <Route
          path="/media"
          element={<PrivateRoute Component={Media} />}
          />
          <Route exact path="/profile/:_id" element={<Profile />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/forgot-password" element={<ChangePassword />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
