import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


export default function PrivateRoute(props) {
  const { Component, ...rest } = props;

  function isTokenExpired(token) {
    if (!token) return true;
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decoded.exp < currentTime;
  }

  let user = localStorage.getItem("user");
  let token = localStorage.getItem("token");

  if (isTokenExpired(token) || !user) {
    return <Navigate to="/login" />;
  } else {
    return <Component {...rest} />;
  }
}
