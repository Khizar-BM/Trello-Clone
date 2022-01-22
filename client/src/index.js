import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthStore from "./contexts/authStore";
import AlertStore from "./contexts/alertStore";

ReactDOM.render(
    <React.StrictMode>
        <AlertStore>
            <AuthStore>
                <App/>
            </AuthStore>
        </AlertStore>
    </React.StrictMode>,
    document.getElementById('root')
);
