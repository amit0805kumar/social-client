import { useState, useEffect } from "react";
import Home from "./pages/Home";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { MyContext } from "./MyContext";
import axios from "axios";
import { Navigate } from 'react-router-dom';
function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const fetchUser = async () => {
    const user = await axios.get(`users?userId=6727307303885087f887157e`);
    if (user.status) {
      setUser(user.data.user);
    }
  };
  useEffect(() => {
    if(!user){
      fetchUser();
    }
  }, []);
  return (
    <MyContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
