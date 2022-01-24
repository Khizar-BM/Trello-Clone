import React, {useContext} from 'react';
import AlertMUI from '@material-ui/lab/Alert';
import {AuthContext} from "../../contexts/authStore";

const Alert = () => {
    const {alerts} = useContext(AuthContext)
    return (
        (alerts.length ? alerts.map((alert) => (
            <AlertMUI severity={alert.alertType} key={alert.id}>
                {alert.msg}
            </AlertMUI>
        )) : "")
    );
};

export default Alert;
