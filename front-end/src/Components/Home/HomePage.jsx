import { useEffect, useState } from "react";
import "./home.css";
import { deleteUser, getAllUsers } from './../../redux/apiRequest';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import { loginSuccess } from "../../redux/authSlice";
import { createAxios } from './../../createInstance';
const HomePage = () => {
  //DUMMY DATA
  const user = useSelector((state) => state.auth.login?.currentUser)
  const userList = useSelector((state) => state.user.users?.allUsers)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const msg = useSelector((state) => state.user?.msg)

  let axiosJWT = createAxios(user, dispatch, loginSuccess)
  const handleDelete = (id) => {
    deleteUser(user?.accessToken, id, dispatch, axiosJWT)
  }
  //CHECK BEFORE CALL API

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
    if (user?.accessToken) {
      console.log(user.accessToken)
      getAllUsers(user?.accessToken, dispatch, axiosJWT)
    }

  }, []);
  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">
        {`Your role:${user?.admin ? 'Admin' : 'User'}`}
      </div>
      <div className="home-userlist">
        {userList && userList.users.map((user) => {
          return (
            <div key={user.username} className="user-container">
              <div className="home-user">{user.username}</div>
              <div className="delete-user" onClick={() => handleDelete(user._id)}> Delete </div>
            </div>
          );
        })}
      </div>
      {msg}
    </main>
  );
};

export default HomePage;
