import { useState, useEffect } from "react";
import Home from "./pages/Home";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { MyContext } from "./MyContext";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Loader from "./components/Loader";
import { Navigate } from "react-router-dom";
function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token,setToken] = useState(null);

  useEffect(() => {
    const fetchedUser = JSON.parse(localStorage.getItem("user"));
    if (fetchedUser) {
      setUser(fetchedUser);
      setLoggedIn(true);
    }
    setLoading(false)
  }, []);

  return (
    <MyContext.Provider value={{ user, setUser, loggedIn, setLoggedIn, setLoading,token,setToken }}>
      <Loader visible={loading} />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute setLoading={setLoading} Component={Home} />
            }
          />
          <Route exact path="/profile/:_id" element={<Profile />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
