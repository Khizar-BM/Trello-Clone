import React, {useContext, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Landing from './components/pages/Landing';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import Board from './components/pages/Board';
import Alert from './components/other/Alert';

// Redux
import setAuthToken from './utils/setAuthToken';

import './App.css';
import {AuthContext} from "./contexts/authStore";
import BoardStore from "./contexts/boardStore";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}
const App = () => {
    const {loadUser} = useContext(AuthContext)
    useEffect(() => {
        loadUser();
    }, []);

    return (
            <Router>
                <>
                    <Alert/>
                    <Routes>
                        <Route path='/' element={<Landing/>}/>
                        <Route path='/register' element={<Register/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/dashboard' element={<BoardStore><Dashboard/></BoardStore>}/>
                        <Route path='/board/:id' element={<BoardStore><Board/></BoardStore>}/>
                    </Routes>
                </>
            </Router>
    );
};

export default App;
