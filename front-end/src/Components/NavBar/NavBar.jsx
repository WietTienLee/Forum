import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { logOut } from './../../redux/apiRequest';
import { createAxios } from './../../createInstance';
import { logoutSuccess } from "../../redux/authSlice";
const NavBar = () => {
  const user = useSelector((state) => state.auth.login.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const axiosJWT = createAxios(user, dispatch, logoutSuccess)
  const handleLougOut = () => {
    logOut(user.id, dispatch, navigate, user.accessToken, axiosJWT)
  }

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home"> Home </Link>
      {user ? (
        <>
          <p className="navbar-user">Hi, <span> {user.username}  </span> </p>
          <Link to="/logout" className="navbar-logout"
            onClick={() => handleLougOut()}
          > Log out</Link>
        </>
      ) : (
        <>
          <Link to="/login" className="navbar-login"> Login </Link>
          <Link to="/register" className="navbar-register"> Register</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
