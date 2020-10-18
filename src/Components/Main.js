import React, { Component, createContext } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Login from './LoginPage';
import Signup from './SignupPage';
import NewsFeed from './NewsFeed';
import { connect } from 'react-redux';
import { loginUser, logoutUser, signupUser } from '../Redux/ActionCreators';
export const UserContext = createContext(null);

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    signup: state.signup,
  };
};
const mapDispatchToProps = (dispatch) => ({
  loginUser: (creds, cb) => {
    dispatch(loginUser(creds));
    setTimeout(() => cb(), 0);
  },
  logoutUser: () => dispatch(logoutUser()),
  signupUser: (values) => dispatch(signupUser(values)),
});

class Main extends Component {
  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={(props) =>
          this.props.auth.isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );

    return (
      <div>
        <Switch>
          <Route
            exact
            path="/login"
            component={() => (
              <UserContext.Provider value={this.props.auth}>
                <Login
                  errMess={this.props.auth.errMessage}
                  loginUser={this.props.loginUser}
                  isLoading={this.props.auth.isLoading}
                />
              </UserContext.Provider>
            )}
          />
          <PrivateRoute
            exact
            path="/home"
            component={() => (
              <UserContext.Provider value={this.props.auth}>
                <NewsFeed logoutUser={this.props.logoutUser} />
              </UserContext.Provider>
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
        </Switch>
        {this.props.auth.isAuthenticated ? (
          <UserContext.Provider value={this.props.auth}>
            <NewsFeed logoutUser={this.props.logoutUser} />
          </UserContext.Provider>
        ) : (
          <Redirect to="/login" />
        )}
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
