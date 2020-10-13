import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Login from './LoginPage';
import Main from './MainComponent';
import { connect } from 'react-redux';
import { loginUser } from '../Redux/ActionCreators';

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
const mapDispatchToProps = (dispatch) => ({
  loginUser: (creds) => dispatch(loginUser(creds)),
});

class Home extends Component {
  componentDidMount() {}

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
            component={() => <Login loginUser={this.props.loginUser} />}
          />
          <PrivateRoute exact path="/" component={() => <Main />} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
