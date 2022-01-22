import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/pages/Landing';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import Board from './components/pages/Board';
import Alert from './components/other/Alert';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Alert />
          <Routes>
            <Route  path='/' element={<Landing/>} />
            <Route  path='/register' element={<Register/>} />
            <Route  path='/login' element={<Login/>} />
            <Route  path='/dashboard' element={<Dashboard/>} />
            <Route  path='/board/:id' element={<Board/>} />
          </Routes>
        </>
      </Router>
    </Provider>
  );
};

export default App;
