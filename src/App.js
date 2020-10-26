import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Route } from 'react-router';
import Login from './Components/LoginPage';
import Signup from './Components/SignupPage';
import Home from './Components/Home';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';

const App = () => {
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated } = auth;
  return (
    <Router>
      {isAuthenticated ? (
        <Route path="/" component={Home} />
      ) : (
        <Redirect to="/login" />
      )}
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
    </Router>
  );
};

export default App;
