import React, { Component, Fragment } from 'react';
// import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Layout from './layouts'

// const loading = () => <div className="animated fadeIn pt-3 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;

// // Containers
// const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// //Login
// const Login = React.lazy(() => import('./views/Login'));

class App extends Component {

  render() {
    return (      
      <Fragment>        
      <Layout></Layout>      
      </Fragment>
    );
  }
}

export default App;
