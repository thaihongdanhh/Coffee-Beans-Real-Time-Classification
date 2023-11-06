import React, { Component, Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import axios from "axios";
import { Bar, Line, Radar } from 'react-chartjs-2';
import ReactSpeedometer from "react-d3-speedometer"
import Widget04 from './Widget04';

import {
  Alert,
  Spinner,
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Form,
  Input,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Media
} from 'reactstrap';

import {
  fetchDevice,
  updateDevice,
  deleteDevice
} from '../../store/actions/device'

import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui-pro/dist/js/coreui-utilities'
import Image from 'react-bootstrap/Image'
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { AppSwitch } from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useImage } from 'react-image'
import { SERVER_VIDEO } from "../../store/constants/config"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import Avatar from 'react-avatar-edit'
import { data } from 'jquery';


class Camera extends Component {

  constructor(props) {
    super(props);
    this.success = this.success.bind(this);    
    this.state = {
      isLoadingDevice: true,
      dataDevice: [],
      columnsDevice: [{
        dataField: "update",
        isDummyField: true,
        text: "Cập nhật",
        sort: true,
        headerFormatter: this.columnFormatter,
        formatter: this.columnButtonFormatter
      },{
        dataField: "device_code",
        text: "Mã TB",
        sort: true,
        headerFormatter: this.columnFormatter,
      },{
        dataField: "device_name",
        text: "Tên TB",
        sort: true,
        headerFormatter: this.columnFormatter
      },{
        dataField: "last_heartbeat",
        text: "Tín hiệu cuối",
        headerFormatter: this.columnFormatter,        
      },{
        dataField: "status",
        text: "Trạng thái",
        headerFormatter: this.columnFormatter,
        formatter: this.columnStatusFormatter
      }
      
    ],

        device_name: "",
        device_code: "",
        device_url:'',
        device_ip:'',
        isUpdate: false,
    };
  }

  columnButtonFormatter = (cell, row) => {
    return (
      <Button color='primary' type='button' onClick={() => { this.update_or_delete(row) }}> Cập nhật</Button>
    )
  }


  columnStatusFormatter = (cell, row) => {
    if (String(cell) === "0") {
      return (
        <Button color='warning' type='button'> Cảnh báo</Button>
      );
    }

    else if (String(cell) === "1") {
      return (
        <Button color='success' type='button'> Tốt</Button>
      );
    }

    else if (String(cell) === "-1") {
      return (
        <Button color='danger' type='button'> Mất tín hiệu</Button>
      );
    }

  }
 
  columnFormatter = (column, colIndex, { sortElement, filterElement }) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: "150px" }}>
        { filterElement}
        { column.text}
      </div>
    );
  }

  handleDataChange = ({ dataSize }) => {
    this.setState({ rowCount: dataSize });
  }

  onInputChange = e => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  success() {
    // add type: 'success' to options
    // positioning: https://github.com/fkhadra/react-toastify#positioning-toast
    return toast.success('Success... ', {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  // Device 

  onRefreshToggle = () => {
    this.setState({
      isLoadingDevice: true
    },() => {
      this.props.onfetchDevice(dataDevice => {
        // console.log(dataDevice)
        this.setState({
          dataDevice,
          isLoadingDevice: false
        })
      })
    })
  }

  onAddDevToggle = () => {
    this.setState({
      modalAddDev: !this.state.modalAddDev,
      device_code:'',
      device_name:'',
      device_url:'',
      device_ip:'',
      isUpdate: false
    })
  }

  onDelDevToggle = () => {
    this.setState({
      modalDelDev: !this.state.modalDelDev,      
    })
  }

  onDelDevClick = () => {
    this.setState({
      isLoadingDevice: true
    },() => {
      const {
        device_code
      } = this.state

      const newData = {
        device_code
      }
      this.props.ondeleteDevice(newData, dataDevice => {
        this.setState({
          isLoadingDevice: false,
          dataDevice: dataDevice,
          modalDelDev: !this.state.modalDelDev
        },() => {this.success()})
      })
    })
  }

  onUpdateDevClick = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    },() => {
      const {
        device_code,
        device_name,
        device_url,
        device_ip,
        device_type
      } = this.state

      const newData = {
        device_code,
        device_name
      }

      let err = 0

      if(device_code === ""){
        err = 1
      }

      if(device_name === ""){
        err = 2
      }

      if(err === 0){
        this.setState({
          isLoadingDevice: true
        },() => {
          this.props.onupdateDevice(device_code, device_name, dataDevice => {
            this.setState({
              modalAddDev: !this.state.modalAddDev,
              isLoadingDevice: false,
              dataDevice
            }, () => {this.success()})
          })
        })
      }
      else if (err === 1){
        alert('Vui lòng điền mã thiết bị !')
      }
      else if (err === 2){
        alert('Vui lòng điền tên thiết bị !')
      }

    })
  }

  onAddDevClick = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    },() => {
      const {
        device_code,
        device_name,
        device_url,
        device_ip
      } = this.state

      const newData = {
        device_code,
        device_name,
        device_url,
        device_ip
      }

      let err = 0

      if(device_code === ""){
        err = 1
      }

      if(device_name === ""){
        err = 2
      }

      if(err === 0){
        this.setState({
          isLoadingDevice: true
        },() => {
          // this.props.oninsertDevice(newData, dataDevice => {
          //   this.setState({
          //     modalAddDev: !this.state.modalAddDev,
          //     isLoadingDevice: false,
          //     dataDevice
          //   }, () => {this.success()})
          // })
        })
      }
      else if (err === 1){
        alert('Vui lòng điền mã thiết bị !')
      }
      else if (err === 2){
        alert('Vui lòng điền tên thiết bị !')
      }
    })
  }

  // onUpdateRow = (row) => {
  //   this.setState({
  //     modalAddDev: !this.state.modalAddDev,      
  //     device_name: row.device_name,
  //     device_code: row.device_code,
  //     isUpdate: true
  //   });
  // }

  update_or_delete = (row) => {
    this.setState({
      modalAddDev: !this.state.modalAddDev,
      device_name: row.device_name,
      device_url : row.device_url,
      device_ip: row.camera_ip,
      device_code: row.device_code,
      device_type: row.device_type,
      isUpdate: true
    });
  }


  // End Device
  
  
  render() {

    const {
      device_code,
      device_name,
      device_url,
      device_ip,
      dataDevice,
      columnsDevice,
      isLoadingDevice,
      isUpdate
    } = this.state    

    // console.log(dataVisitor)


    const containerStyle = {
      zIndex: 1999
    };

    return (
      <div className="animated fadeIn">       
        <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
          <Fragment>
          {isLoadingDevice && (
            <div className="sk-cube-grid">
              <div className="sk-cube sk-cube1"></div>
              <div className="sk-cube sk-cube2"></div>
              <div className="sk-cube sk-cube3"></div>
              <div className="sk-cube sk-cube4"></div>
              <div className="sk-cube sk-cube5"></div>
              <div className="sk-cube sk-cube6"></div>
              <div className="sk-cube sk-cube7"></div>
              <div className="sk-cube sk-cube8"></div>
              <div className="sk-cube sk-cube9"></div>
            </div>
          )}
          {!isLoadingDevice && (
            <Card>
              <CardHeader>Quản lý thiết bị</CardHeader>
              <CardBody>
              {/* <Button
                  onClick={this.onRefreshToggle}
                  size="sm"
                  color="secondary"
                  style={{ marginRight: "5px" }} >
                  Làm mới trang
              </Button>
                <Button
                  onClick={this.onAddDevToggle}
                  size="sm"
                  color="primary"
                  style={{ marginRight: "5px" }} >
                  <i className="fa fa-plus-square"></i> Thêm Thiết bị
              </Button> */}
                <ToolkitProvider
                  onDataSizeChange={this.handleDataChange}
                  keyField="device_code"
                  data={dataDevice}
                  columns={columnsDevice}
                  columnToggle
                  exportCSV
                >
                  {props => (
                    <div>
                      <BootstrapTable
                        {...props.baseProps}
                        wrapperClasses="table-responsive"
                        filter={filterFactory()}
                        pagination={paginationFactory()}
                      />
                    </div>
                  )}
                </ToolkitProvider>

                <Modal
                  isOpen={this.state.modalAddDev}
                  toggle={this.onAddDevToggle}
                  className={'modal-lg ' + this.props.className}
                >
                  <ModalHeader toggle={this.onAddEmpToggle}>{isUpdate ? "Cập nhật" :"Thêm mới"} Thiết bị</ModalHeader>
                  <ModalBody>
                    <Form>                      
                      <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend" style={{'width': '150px'}}>
                            <Button style={{'width': '150px'}} type="button" color="primary"><i className="cui-puzzle icons"></i> Mã TB</Button>
                          </InputGroupAddon>
                          <Input onChange={this.onInputChange} disabled={isUpdate} defaultValue={device_code} type="text" id="device_code" name="device_code" placeholder="Mã TB" />
                        </InputGroup>
                      </FormGroup>

                      <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend" style={{'width': '150px'}}>
                            <Button style={{'width': '150px'}} type="button" color="primary"><i className="cui-puzzle icons"></i> Tên TB</Button>
                          </InputGroupAddon>
                          <Input onChange={this.onInputChange} defaultValue={device_name} type="text" id="device_name" name="device_name" placeholder="Tên TB" />
                        </InputGroup>
                      </FormGroup>   

                      {/* <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend" style={{'width': '150px'}}>
                            <Button style={{'width': '150px'}} type="button" color="primary"><i className="cui-puzzle icons"></i> URL</Button>
                          </InputGroupAddon>
                          <Input onChange={this.onInputChange} defaultValue={device_url} type="text" id="device_url" name="device_url" placeholder="URL" />
                        </InputGroup>
                      </FormGroup>  
                      <FormGroup>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend" style={{'width': '150px'}}>
                            <Button style={{'width': '150px'}} type="button" color="primary"><i className="cui-puzzle icons"></i> Camera IP</Button>
                          </InputGroupAddon>
                          <Input onChange={this.onInputChange} defaultValue={device_ip} type="text" id="device_ip" name="device_ip" placeholder="camera ip" />
                        </InputGroup>
                      </FormGroup>                       */}
                                                              
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    {isUpdate && (
                      <Button color="primary" onClick={this.onUpdateDevClick}>Cập nhật</Button>
                    )}
                    {!isUpdate && (
                      <Button color="primary" onClick={this.onAddDevClick}>Thêm</Button>
                    )}
                    <Button color="secondary" onClick={this.onAddDevToggle}>Hủy bỏ</Button>
                  </ModalFooter>
                </Modal>

                <Modal
                  isOpen={this.state.modalDelDev}
                  toggle={this.onDelDevToggle}
                  className={'modal-sm ' + this.props.className}
                >
                  <ModalHeader toggle={this.onDelDevToggle}>Xóa</ModalHeader>
                  <ModalBody>
                    Bạn có muốn xóa không ?
              </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.onDelDevClick}>Xóa</Button>{' '}
                    <Button color="danger" onClick={this.onDelDevToggle}>Không Xóa</Button>{' '}
                  </ModalFooter>
                </Modal>
                
              </CardBody>
              <CardFooter>
              </CardFooter>
            </Card>
          )}
            
        </Fragment>
      </div>
    );
  }

  componentDidMount() {
    // const timeElapsed = Date.now();
    // const today = new Date(timeElapsed);
    // const intervalID = setInterval(() => {
    //   this.setState({
    //     intervalID,
    //     time: new Date(Date.now()).toLocaleTimeString(),
    //     date: new Date(Date.now()).toLocaleDateString(),
    //   }, () => {
    //     this.props.onfetchDevice(dataDevice => {
    //       this.setState({
    //         dataDevice,
    //         isLoadingDevice: false
    //       })
    //     })
    //    })
    // }, 10000)


    this.props.onfetchDevice(dataDevice => {
      // console.log(dataDevice)
      this.setState({
        dataDevice,
        isLoadingDevice: false
      })
    })

  }

  componentWillUnmount() {
    clearInterval(this.time, this.date);
  }

}


const mapStateToProps = (state) => {
  return {
    user: state.user,
    errors: state.errors
  }
}

const mapDispatchToProps = dispatch => {
  return {   
    onfetchDevice: (callback) => {
      dispatch(fetchDevice(callback))
    },
    onupdateDevice: (device_code, device_name, callback) => {
      dispatch(updateDevice(device_code, device_name, callback))
    },
    ondeleteDevice: (data, callback) => {
      dispatch(deleteDevice(data,callback))
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Camera));
