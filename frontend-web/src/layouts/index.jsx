import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, BrowserRouter, HashRouter, Switch, Redirect } from "react-router-dom";

import LoginGuard from "../components/guard";

import { actLoginUser, logout } from "../store/actions/user";
import setAuthToken from '../utils/setAuthToken';
import jwtDecode from 'jwt-decode'
const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

// Containers
const DefaultLayout = React.lazy(() => import('../containers/DefaultLayout'));

class Layout extends Component {

  render() {
    // console.log(localStorage.jwtToken)
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken)
      const decoded = jwtDecode(localStorage.jwtToken)
      // this.props.actLoginUser(decoded);
      const currentTime = new Date().getTime() / 1000
      // console.log(decoded)
      // console.log(decoded.iat + 3600, currentTime)
      // if(decoded.iat + 3600 < currentTime){
      //   this.props.onCheckToken()
      //   window.location.href = "/"
      // }
    }
    return (
      <HashRouter >
        <React.Suspense fallback={loading()}>
          <Switch>         
            {/* <Route
              exact
              path="/"
              name="Home Page"
              render={props => <DefaultLayout {...props} />}
            /> */}
            <LoginGuard path={"/"} component={DefaultLayout} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
  componentDidMount() {
    const user = localStorage.getItem("userLogin");
    if (user) {
      this.props.onLoadUserProfile(JSON.parse(user));
    }

    const intervalID = setInterval(() => {
      this.setState({
        intervalID,
        time: new Date(Date.now()).toLocaleTimeString(),
        date: new Date(Date.now()).toLocaleDateString(),
      }, () => { })
    }, 5000)

  }

  componentWillUnmount() {
    clearInterval(this.time, this.date);
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadUserProfile: user => {
      // console.log(user)
      const { token } = user;
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(actLoginUser(decoded));
      //   dispatch(actLoginUser(user));
    },
    onCheckToken: () => {
      dispatch(logout())
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Layout);

// export default Layout;