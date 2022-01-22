import React, {createContext, useReducer} from 'react';
import reducer, {initialState} from "../reducers/alert";
import {v4 as uuidv4} from "uuid";
import {REMOVE_ALERT, SET_ALERT} from "../actions/types";

export const AlertContext = createContext({})

const AlertStore = (props) => {
    const [alerts, dispatch] = useReducer(reducer, initialState);

    const setAlert = (msg, alertType, timeout = 5000) => {
        const id = uuidv4();
        dispatch({
            type: SET_ALERT,
            payload: { msg, alertType, id },
        });
        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
    };

    return( <AlertContext.Provider value={{alerts, setAlert}}>
        {props.children}
    </AlertContext.Provider> )

}

export default AlertStore;