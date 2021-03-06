import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthStore from "./contexts/authStore";

ReactDOM.render(
    <React.StrictMode>
        <AuthStore>
            <App/>
        </AuthStore>
    </React.StrictMode>,
    document.getElementById('root')
);
