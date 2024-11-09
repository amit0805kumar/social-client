import React from "react";
import { Navigate } from "react-router-dom";
export default function PrivateRoute(props) {
  const { Component, setLoading, ...rest } = props;
  let data = localStorage.getItem("user");
  if (data) {
    data = JSON.parse(data);
    return <Component {...rest} />;
  }else{
    return <Navigate to="/login" />
  }
}
