import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Badge, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, ModalBody, ModalHeader, Progress ,Modal, Input,
  Col, Button, FormGroup, ModalFooter } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import setAuthToken from "../../utils/setAuthToken";
import {SERVER, IP} from '../../store/constants/config'
import { LOGOUT_USER } from '../../store/constants/user'
import { logout } from "../../store/actions/user";
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import axios from "axios";
import { connect } from "react-redux";

const propTypes = {
  notif: PropTypes.bool,
  accnt: PropTypes.bool,
  tasks: PropTypes.bool,
  mssgs: PropTypes.bool,
};
const defaultProps = {
  notif: false,
  accnt: false,
  tasks: false,
  mssgs: false,
};

class DefaultHeaderDropdown extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.onChangePW = this.onChangePW.bind(this);
    this.state = {
      dropdownOpen: false,
      isLoadingVersionLog: false,
    };
  }

  onChangePW(){

  }

  handleOnClick () {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('userLogin')
    setAuthToken(false)
    this.props.onlogout()
    
  }

  // actLoginUser = () => {
  //   return {
  //     type: LOGOUT_USER,
  //   };
  // };

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onUpdateVersionToggle = () => {
    this.setState({
      modalUpdateVersion: !this.state.modalUpdateVersion
    })
  }

  fetchVersion = (version_code, callback) => {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("jwtToken"),
      fingerprint: "123456",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    };

    const params = {
      version_code
    }
    axios
      .get(`${SERVER}/version/fetch`, {
        params: params,
        headers: headers
      })
      .then(res => {
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res.data)
        callback(res.data);
      })
      .catch(console.log);

  }

  onUpdateVersionChange = (e) => {
    this.setState({
      isLoadingVersionLog: true,
      [e.target.name]: e.target.value
    },() => {
      const {
        version 
      } =  this.state          
      
      this.fetchVersion(version, versionLog => {        
        // console.log(versionLog[0]['description'])

        this.setState({
          isLoadingVersionLog: false,
          versionLog: versionLog[0]['description']
        })
      })      
    })
  }
  

  dropNotif() {
    const itemsCount = 4;
    return (
      <Dropdown nav className="d-md-down-none" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <i className="icon-bell"></i><Badge pill color="danger">{itemsCount}</Badge>
        </DropdownToggle>
        <DropdownMenu right>
          {/* <DropdownItem header tag="div" className="text-center"><strong>You have {itemsCount} notifications</strong></DropdownItem>
          <DropdownItem><i className="icon-user-follow text-success"></i> New user registered</DropdownItem>
          <DropdownItem><i className="icon-user-unfollow text-danger"></i> User deleted</DropdownItem>
          <DropdownItem><i className="icon-chart text-info"></i> Sales report is ready</DropdownItem>
          <DropdownItem><i className="icon-basket-loaded text-primary"></i> New client</DropdownItem>
          <DropdownItem><i className="icon-speedometer text-warning"></i> Server overloaded</DropdownItem>
          <DropdownItem header tag="div" className="text-center"><strong>Server</strong></DropdownItem> */}
          {/* <DropdownItem>
            <div className="text-uppercase mb-1">
              <small><b>CPU Usage</b></small>
            </div>
            <Progress className="progress-xs" color="info" value="25" />
            <small className="text-muted">348 Processes. 1/4 Cores.</small>
          </DropdownItem>
          <DropdownItem>
            <div className="text-uppercase mb-1">
              <small><b>Memory Usage</b></small>
            </div>
            <Progress className="progress-xs" color="warning" value={70} />
            <small className="text-muted">11444GB/16384MB</small>
          </DropdownItem>
          <DropdownItem>
            <div className="text-uppercase mb-1">
              <small><b>SSD 1 Usage</b></small>
            </div>
            <Progress className="progress-xs" color="danger" value={90} />
            <small className="text-muted">243GB/256GB</small>
          </DropdownItem> */}
        </DropdownMenu>
      </Dropdown>
    );
  }

  dropAccnt() {
    const {
      isLoadingVersionLog,
      versionLog
    } = this.state   
    
    const decoded = jwtDecode(localStorage.jwtToken)
    const is_hr = decoded.is_hr

    return (
      <>
      <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          {/* <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" /> */}
          <img className="img-avatar" src={SERVER + `/employee/avatar?avatar_path=` + this.state.avatar_path} alt="Preview" />

        </DropdownToggle>
        <DropdownMenu right>
          {/* <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem> */}
          <DropdownItem
            onClick={this.onUpdateVersionToggle}
          ><i className="fa fa-bell-o"></i> Updates<Badge color="info">
            {moment(new Date()).isSameOrBefore(moment('2021-06-30'), 'day') && (1)}
            </Badge></DropdownItem>
          {/* <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
          <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
          <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
          <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
          <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
          <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
          <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
          <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
          <DropdownItem divider />
          <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem> */}
          <DropdownItem onClick={this.handleOnClick}><i className="fa fa-lock"></i><Link to="/Login">Đăng xuất</Link></DropdownItem>
          {/* {is_hr ==='1' && (<DropdownItem onClick={this.onChangePW}><i className="fa fa-lock"></i><Link to="/">Đổi mật khẩu</Link></DropdownItem>)} */}
          {/*<DropdownItem><i className="fa fa-lock"></i> Logout</DropdownItem>*/}
        </DropdownMenu>
      </Dropdown>
        <Modal
          isOpen={this.state.modalUpdateVersion}
          toggle={this.onUpdateVersionToggle}
          className={'modal-lg ' + this.props.className}
          // style={{ maxWidth: '1000px', width: '80%' }}
        >
          <ModalHeader>Thông tin phiên bản</ModalHeader>
          <ModalBody>
            <FormGroup row>
              <Col md={3}>
                <Button style={{ 'width': '120px' }} type="button" color="primary"><i className="cui-puzzle icons"></i> Phiên bản</Button>
              </Col>
              <Col md={9}>
                <Input type="select" name="version" onChange={this.onUpdateVersionChange} >
                  <option key={"v1"} value={"v1"}>HRAI version 1</option>
                  <option key={"v2"} value={"v2"}>HRAI version 2</option>
                  <option selected key={"v3"} value={"v3"}>HRAI version 3</option>
                </Input>
              </Col>
            </FormGroup>
            Nội dung cập nhật
            <hr/>
            {!isLoadingVersionLog && (              
              <div style={{ whiteSpace: 'pre-line' }}>{versionLog}</div>
            )}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </>
    );
  }

  dropTasks() {
    const itemsCount = 15;
    return (
      <Dropdown nav className="d-md-down-none" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <i className="icon-list"></i><Badge pill color="warning">{itemsCount}</Badge>
        </DropdownToggle>
        <DropdownMenu right className="dropdown-menu-lg">
          <DropdownItem header tag="div" className="text-center"><strong>You have {itemsCount} pending tasks</strong></DropdownItem>
          <DropdownItem>
            <div className="small mb-1">Upgrade NPM &amp; Bower <span
              className="float-right"><strong>0%</strong></span></div>
            <Progress className="progress-xs" color="info" value={0} />
          </DropdownItem>
          <DropdownItem>
            <div className="small mb-1">ReactJS Version <span className="float-right"><strong>25%</strong></span>
            </div>
            <Progress className="progress-xs" color="danger" value={25} />
          </DropdownItem>
          <DropdownItem>
            <div className="small mb-1">VueJS Version <span className="float-right"><strong>50%</strong></span>
            </div>
            <Progress className="progress-xs" color="warning" value={50} />
          </DropdownItem>
          <DropdownItem>
            <div className="small mb-1">Add new layouts <span className="float-right"><strong>75%</strong></span>
            </div>
            <Progress className="progress-xs" color="info" value={75} />
          </DropdownItem>
          <DropdownItem>
            <div className="small mb-1">Angular 2 Cli Version <span className="float-right"><strong>100%</strong></span></div>
            <Progress className="progress-xs" color="success" value={100} />
          </DropdownItem>
          <DropdownItem className="text-center"><strong>View all tasks</strong></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  dropMssgs() {
    const itemsCount = 7;
    return (
      <Dropdown nav className="d-md-down-none" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <i className="icon-envelope-letter"></i><Badge pill color="info">{itemsCount}</Badge>
        </DropdownToggle>
        <DropdownMenu right className="dropdown-menu-lg">
          <DropdownItem header tag="div"><strong>You have {itemsCount} messages</strong></DropdownItem>
          <DropdownItem href="#">
            <div className="message">
              <div className="pt-3 mr-3 float-left">
                <div className="avatar">

                  <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@hrai.com" />                  
                  <span className="avatar-status badge-success"></span>
                </div>
              </div>
              <div>
                <small className="text-muted">John Doe</small>
                <small className="text-muted float-right mt-1">Just now</small>
              </div>
              <div className="text-truncate font-weight-bold"><span className="fa fa-exclamation text-danger"></span> Important message</div>
              <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
              </div>
            </div>
          </DropdownItem>
          <DropdownItem href="#">
            <div className="message">
              <div className="pt-3 mr-3 float-left">
                <div className="avatar">
                  <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  <span className="avatar-status badge-warning"></span>
                </div>
              </div>
              <div>
                <small className="text-muted">Jane Doe</small>
                <small className="text-muted float-right mt-1">5 minutes ago</small>
              </div>
              <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
              <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
              </div>
            </div>
          </DropdownItem>
          <DropdownItem href="#">
            <div className="message">
              <div className="pt-3 mr-3 float-left">
                <div className="avatar">
                  <img src={'assets/img/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  <span className="avatar-status badge-danger"></span>
                </div>
              </div>
              <div>
                <small className="text-muted">Janet Doe</small>
                <small className="text-muted float-right mt-1">1:52 PM</small>
              </div>
              <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
              <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
              </div>
            </div>
          </DropdownItem>
          <DropdownItem href="#">
            <div className="message">
              <div className="pt-3 mr-3 float-left">
                <div className="avatar">
                  <img src={'assets/img/avatars/4.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  <span className="avatar-status badge-info"></span>
                </div>
              </div>
              <div>
                <small className="text-muted">Joe Doe</small>
                <small className="text-muted float-right mt-1">4:03 AM</small>
              </div>
              <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
              <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
              </div>
            </div>
          </DropdownItem>
          <DropdownItem href="#" className="text-center"><strong>View all messages</strong></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  render() {
    const { notif, accnt, tasks, mssgs } = this.props;    
    return (
        notif ? this.dropNotif() :
          accnt ? this.dropAccnt() :
            tasks ? this.dropTasks() :
              mssgs ? this.dropMssgs() : null
    );
    
  }

  
componentDidMount() {
  const decoded = jwtDecode(localStorage.jwtToken)

  const avatar_path = decoded.avatar_path === null  ? 'operator_m.png' : decoded.avatar_path

  this.setState({
    avatar_path
  })

  this.fetchVersion('v3', versionLog => {
    // console.log(versionLog[0]['description'])

    this.setState({
      isLoadingVersionLog: false,
      versionLog: versionLog[0]['description']
    })
  })
}
}


DefaultHeaderDropdown.propTypes = propTypes;
DefaultHeaderDropdown.defaultProps = defaultProps;


const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors,
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onlogout: () => {
      dispatch(logout())
    } 
  };
};

// export default DefaultHeaderDropdown;
export default connect(
  mapStateToProps, mapDispatchToProps
)(withRouter(DefaultHeaderDropdown));