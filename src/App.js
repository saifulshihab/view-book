import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import Login from './Components/LoginPage';
import Signup from './Components/SignupPage';
import NewsFeed from './Components/Home';
import { Redirect } from 'react-router-dom';
import { loginUser, logoutUser, signupUser } from './Redux/ActionCreators';

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    signup: state.signup,
  };
};
const mapDispatchToProps = (dispatch) => ({
  loginUser: (creds) => dispatch(loginUser(creds)),

  logoutUser: () => dispatch(logoutUser()),
  signupUser: (values) => dispatch(signupUser(values)),
});

class App extends Component {
  render() {
    return (
      <div>
        {this.props.auth.isAuthenticated ? (
          <Route
            path="/"
            component={() => (
              <NewsFeed
                auth={this.props.auth}
                logoutUser={this.props.logoutUser}
              />
            )}
          />
        ) : (
          <Redirect to="/login" />
        )}
        <Route
          exact
          path="/login"
          component={() => (
            <Login
              errMess={this.props.auth.errMessage}
              loginUser={this.props.loginUser}
              isLoading={this.props.auth.isLoading}
            />
          )}
        />

        <Route
          exact
          path="/signup"
          component={() => (
            <Signup
              signupUser={this.props.signupUser}
              signupError={this.props.signup.errMessage}
              signupSuccess={this.props.signup.successMessage}
            />
          )}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
