import React, { useCallback, Component } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, UncontrolledDropdown, NavItem } from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import DefaultHeaderDropdown from './DefaultHeaderDropdown'
// import logo from '../../assets/img/brand/logo.svg'
// import logo from '../../assets/img/logo_huongnghiep.jpg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import avatar from '../../assets/img/avatars/6.jpg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    const { userType } = this.props.user.userProfile;      

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        {/* <AppNavbarBrand
          // full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        /> */}
        {/* <span><a href="https://troly.ai">Data Science </a> &copy; Lab.</span> */}
        {/* <AppSidebarToggler className="d-md-down-none" display="lg" /> */}
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" ><b>Coffee Beans Real-time Classification</b></NavLink>
          </NavItem>
          {userType === "Admin" && 
          <NavItem className="px-3">
            {/* <NavLink to="/users" className="nav-link">Users</NavLink> */}
          </NavItem>}          
          <NavItem className="px-3">
            {/* <NavLink to="#" className="nav-link">Settings</NavLink> */}
          </NavItem>
        </Nav>
        {/* <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={avatar} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ height: '400px', right: 0 }}>
              <DropdownItem>
                AppHeaderDropdown
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav> */}
        <Nav className="ml-auto" navbar>
          {/* <DefaultHeaderDropdown notif />
          <DefaultHeaderDropdown tasks />
          <DefaultHeaderDropdown mssgs />
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          </NavItem> */}
          {/* <DefaultHeaderDropdown to="/dashboard" onLogout= {this.handleOnClick} accnt /> */}
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
      user: state.user,
      errors: state.errors
  }
}

export default connect(mapStateToProps,null)(DefaultHeader);
