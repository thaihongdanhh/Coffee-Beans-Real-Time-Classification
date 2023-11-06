import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { isAuthorize } from '../../utils/isLogin'
// import jwtDecode from 'jwt-decode'

const loginGuard = ({ component: Component, path }) => {
  
  return (
    //    <Route to={path} component={Component} />
    
    <Route
      to={path}
      render={routeProps => {
        // // console.log(routeProps.location.pathname)            
        // const user = localStorage.getItem("userLogin")
        // if (user) {
        //   const company = JSON.parse(user)['company']
        //   if (company === 'PM') {
        //     const decoded = jwtDecode(localStorage.jwtToken)
        //     const pathname = routeProps.location.pathname
        //     const employee_code = decoded.employee_code
        //     // console.log(isAuthorize(pathname))
        //     // console.log(pathname)
        //     if (isAuthorize(pathname)) {
        //       return <Component {...routeProps} />;
        //     }
        //     else {
        //       alert('Bạn không có quyền truy cập !')
        //       return <Redirect to={"/mgt/emp/" + employee_code} />
        //     }
        //   }
        // }        
        // return <Redirect to="/" />

        return <Component {...routeProps} />;
      }}
    />
  );
};

export default loginGuard;
