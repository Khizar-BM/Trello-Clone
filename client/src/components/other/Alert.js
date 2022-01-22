import React, {useContext} from 'react';
import AlertMUI from '@material-ui/lab/Alert';
import {AlertContext} from "../../contexts/alertStore";

const Alert = () => {
    const {alerts} = useContext(AlertContext)
    return (
        (alerts.length>0? alerts.map((alert) => (
            <AlertMUI severity={alert.alertType} key={alert.id}>
                {alert.msg}
            </AlertMUI>
        )): "")
    );
};

export default Alert;
