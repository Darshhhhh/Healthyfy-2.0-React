import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const GuardedRoute = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    var IsValidUser = sessionStorage.getItem("token");
    if (
      IsValidUser === null ||
      IsValidUser === undefined ||
      IsValidUser === ""
    ) {
      navigate("/");
    }
  });
  return (
    <div>
      <Component />
    </div>
  );
};

export default GuardedRoute;
