
import { loginFailed, loginGGFailed, loginGGStart, loginGGSuccess, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice";
import axios from "axios"
import { deleteUserFailed, deleteUserStart, deleteUserSuccess, getUserFailed, getUserStart, getUserSuccess } from "./userSlice";
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const res = await axios.post('/v1/auth/login', user, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        dispatch(loginSuccess(res.data))
        navigate("/")

    } catch (error) {
        console.log(error.message)
        dispatch(loginFailed())
    }
}
export const loginGoogleUser = async (user, dispatch, navigate) => {
    dispatch(loginGGStart())
    try {
        const res = await axios.get('/v1/auth/google', user, { crossdomain: true })
        console.log(res.data)
        dispatch(loginGGSuccess(res.data))
        navigate('/')
    } catch (error) {
        dispatch(loginGGFailed())
    }
}
export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart())
    try {
        const res = await axios.post('/v1/auth/register', user)
        dispatch(registerSuccess(res.data))
        console.log(res.data)
        navigate("/login")

    } catch (error) {
        console.log(error.message)
        dispatch(registerFailed())
    }
}
export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUserStart())
    try {
        const res = await axiosJWT.get('/v1/user', {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        console.log('OK')
        console.log(res.data)
        dispatch(getUserSuccess(res.data))


    } catch (error) {
        dispatch(getUserFailed())

    }
}
export const deleteUser = async (accessToken, id, dispatch, axiosJWT) => {
    dispatch(deleteUserStart())
    try {
        const res = await axiosJWT.delete(`/v1/user/${id}`, {
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(deleteUserSuccess(res.data))

    } catch (error) {
        dispatch(deleteUserFailed(error.response.data))
    }
}
export const logOut = async (id, dispatch, navigate, accessToken, axiosJWT) => {
    dispatch(logoutStart())
    try {
        await axiosJWT.post('/v1/auth/logout', id, {
            headers: { token: `Bearer ${accessToken}` }
        });
        dispatch(logoutSuccess())
        navigate("/login")
    } catch (error) {
        dispatch(logoutFailed)
    }
}