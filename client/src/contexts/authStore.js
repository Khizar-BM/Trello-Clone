import React, {createContext, useContext, useReducer} from 'react';
import reducer, {initialState} from "../reducers/auth";
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import {
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED
} from "../actions/types";
import {AlertContext} from "./alertStore";

export const AuthContext = createContext({})

const AuthStore = (props) => {
    const [auth, dispatch] = useReducer(reducer, initialState);
    const {setAlert} = useContext(AlertContext)

    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get('/api/auth');

            dispatch({
                type: USER_LOADED,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
            });
        }
    };

    const register = async ({name, email, password}) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = JSON.stringify({name, email, password});


        try {
            const res = await axios.post('/api/users', body, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });

            await loadUser();
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => setAlert(error.msg, 'error'));
            }

            dispatch({
                type: REGISTER_FAIL,
            });
        }
    };

    const login = async ( email, password) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = JSON.stringify({email, password});

        try {
            const res = await axios.post('/api/auth', body, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });

            await loadUser();
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => setAlert(error.msg, 'error'));
            }

            dispatch({
                type: LOGIN_FAIL,
            });
        }
    };

    const logout =  async () => {
        dispatch({ type: LOGOUT });
    };

    return (<AuthContext.Provider value={{auth, loadUser, register, login, logout}}>
        {props.children}
    </AuthContext.Provider>)

}

export default AuthStore;