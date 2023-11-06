import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import ReactExport from "react-export-excel";
import { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import { IP, SERVER } from '../../store/constants/config'
import DateInput from 'date-input';
import moment from "moment";
import jwtDecode from 'jwt-decode';
import "react-datepicker/dist/react-datepicker.css";
// import "./styles.css";
import classnames from "classnames";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  Input,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tooltip,
  Alert,
  UncontrolledTooltip
} from 'reactstrap';
import {
  fetchDashboard,
  fetchEmployee,
  updateEmployee,
  insertEmployee,
  deleteEmployee,
  fetchProfile,
  updateProfile,
  updateEmployeeApprove,
  updateEmployeeUnapprove
} from '../../store/actions/employee';

import {
  fetchDepartment,
  fetchPosition,
  fetchOffice
} from '../../store/actions/department';

import {
  fetchFaceDetector,
} from '../../store/actions/device'

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import Avatar from 'react-avatar-edit'

import Select from 'react-select';
import 'react-select/dist/react-select.min.css';
import { string } from 'prop-types';
// import { filter } from 'core-js/core/array';

class DeptUpdateRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      DeptCode: props.DeptCode
    }
  }


  render() {
    const { data, DeptCode } = this.state
    if (data['department_code'].indexOf(DeptCode) !== -1) {
      return (
        <option selected value={data['department_code']}>{data['department_name']}</option>
      )
    }

    else {
      return (
        <option value={data['department_code']}>{data['department_name']}</option>
      )
    }

  }
}

class Employee extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.success = this.success.bind(this);
    this.onCrop = this.onCrop.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.onClose = this.onClose.bind(this);
    this.savePosChanges = this.savePosChanges.bind(this);
    this.onImageLoad = this.onImageLoad.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.saveMangerChanges = this.saveMangerChanges.bind(this);
    this.saveDeptFilterChanges = this.saveDeptFilterChanges.bind(this);
    this.saveOfficeFilterChanges = this.saveOfficeFilterChanges.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.saveFilterChanges = this.saveFilterChanges.bind(this);
    this.state = {
      is_update_avatar: false,
      isLoadingDashboard: true,
      isLoadingDepartment: true,
      isLoadingEmployee: true,
      isLoadingManager: true,
      isLoadingSelectManager: true,
      isLoadingPosition: true,
      isUpdateProfile: false,
      isLoadingLeave: false,
      dataLeave: [],
      dataDepartment: [],
      dataProfile: [],
      dataEmployee: [],
      filterEmployee: [],
      filterEmployeeMain: [],
      filterEmployeeStatus: [],
      dataPosition: [],
      errors: [],
      text:"Tất cả",
      DeptArr: [],
      DeptInChargeArr: [],
      DeptInChargeValue: [],
      filterDeptInChargeArr: [],
      OfficeValueFilter: { value: '-1', label: '--Tất cả khối văn phòng'},
      DeptValueFilter: { value: '-1', label: '--Tất cả bộ phận' },
      DeptValue: { value: '-1', label: '--Tất cả bộ phận' },
      DeptValueEmpArr: [],
      RoleValue: { value: "-1", label: "--Vui lòng chọn Vai trò" },
      PosValueArr: [],
      PosValue: { value: "-1", label: "--Vui lòng chọn Chức Danh" },
      positionArr: [],
      columnsEmployee: [
        {
          dataField: "status",
          isDummyField: true,
          text: "Trạng thái",
          sort: true,
          headerFormatter: this.columnFormatter,
          formatter: this.columnButtonUpdateFormatter
        }, {
          dataField: "pic",
          text: "Kiểm tra",
          sort: true,
          headerFormatter: this.columnFormatter,
          formatter: this.columnImageCheckFormatter
        }, {
          dataField: "employee_code",
          text: "Mã NV",
          sort: true,
          headerFormatter: this.columnFormatter,
        }, {
          dataField: "employee_name",
          text: "Tên NV",
          sort: true,
          headerFormatter: this.columnFormatter
        }, {
          dataField: "department_name",
          text: "Phòng ban",
          sort: true,
          headerFormatter: this.columnFormatter
        },
        {
          dataField: "position_name",
          text: "Chức Danh",
          sort: true,
          headerFormatter: this.columnFormatter
        },],

      columnsLeave: [{
        dataField: "leaves_code",
        text: "Mã Phép",
        sort: true,
        headerFormatter: this.columnFormatter
      }, {
        dataField: "leaves_name",
        text: "Tên Phép",
        sort: true,
        headerFormatter: this.columnFormatter
      }],

      filterGuestData: [],
      LeaveCode: "",
      LeaveName: "",
      DeptName: "",
      DeptCode: "",
      DeptCodeFilter: "-1",
      OfficeCodeFilter: '-1',
      DeptInChargeCode: "",
      DeptArr: [],
      DeptInChargeArr: [],
      DeptInChargeValue: [],
      Avatar: "",
      Image: "",
      EmpName: "",
      EmpCode: "",
      Reason: "",
      ManagerCode: "-1",
      ManagerArr: [],
      ManagerValueArr: [],
      ManagerValue: { value: '-1', label: '--Vui lòng chọn QL' },
      avatar_base64: "",
      tooltipOpen: false,
    };
  }

  toggle() {
    //console.log(this.state.tooltipOpen)
    this.setState({
      tooltipOpen: !this.state.tooltipOpen,
    });
  }

  onClose() {
    this.setState({ Avatar: "", Image: "", preview: "" })
  }

  onCrop(Image) {
    this.setState({
      Image: Image
    })
  }

  onImageLoad(Avatar) {
    this.setState({ Avatar })
  }

  columnFormatter = (column, colIndex, { sortElement, filterElement }) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: "150px" }}>
        {filterElement}
        {column.text}
      </div>
    );
  }

  columnImageCheckFormatter = (cell, row) => {
    if(row.avatar_request_path !=""){
      return (
        <img width="50px" height="50px" src={SERVER + '/employee/avatar?avatar_path=' + row.avatar_request_path} />
      );
    } else if(row.avatar_path !== "" && row.avatar_request_path === ""){
      return (
        <img width="50px" height="50px" src={SERVER + '/employee/avatar?avatar_path=' + row.avatar_path} />
      );
    } else{
      return (
        <img width="50px" height="50px" src={SERVER + '/employee/avatar?avatar_path=' + 'operator_m.png'} />
      );
    }
  }


  savePosChanges = (value) => {
    if (value !== null) {
      this.setState({
        PosValue: value,
        user_position: value['value'],
        position_code: value['value'],
        Position: value['value'],
      }, () => {
        const {
          dataPosition,
          position_code,
          DeptInChargeValue,
          DeptValue,
          DeptCode
        } = this.state

        let emp_is_manager = dataPosition.filter(data => {
          return data['position_code'] === position_code
        })


        let DeptInChargeValueTemp = DeptInChargeValue

        if (emp_is_manager.length !== 0) {
          if (String(emp_is_manager[0]['is_manager']) !== '1') {
            this.setState({
              RoleValue: { value: "", label: "" },
              DeptInChargeValue: DeptValue,
              emp_is_manager: emp_is_manager[0]['is_manager']
            })
          }

          else {
            this.setState({
              RoleValue: { value: "", label: "" },
              DeptInChargeValue: [DeptValue],
              DeptInChargeValue: DeptInChargeValueTemp,
              emp_is_manager: emp_is_manager[0]['is_manager']
            })
          }
        }
      })
    }

  }
  columnImageFormatter = (cell, row) => {
    return (
      <img width="50px" height="50px" src={SERVER + "/employee/avatar?avatar_path=" + cell} />
    );
  }

  columnButtonUpdateFormatter = (cell, row) => {
    if (row.avatar_request_path !== "") {
      return (
        <Button color='success' type='button' onClick={() => { this.update_or_delete(row) }}> Chờ xét duyệt</Button>
      )
    } else if (row.avatar_path !== "" && row.avatar_request_path === "") {
      return (
        <Button color='primary' type='button'> Đã đăng ký</Button>
      )
    } else {
      return (
        <Button type='button' > Chưa đăng ký</Button>
      )
    }

  }

  // columnButtonFormatter = (cell, row) => {
  //   return (
  //     <Button color='primary' type='button' onClick={() => alert(row.pic) }> Cập nhật</Button>
  //   )
  // }

  columnButtonFormatter = (cell, row) => {
    return (
      <Button color='primary' type='button' onClick={() => {
        this.setState({
          is_update_avatar: true,
          avatar_base64: row.pic,
          modalAvatarToggle: !this.state.modalAvatarToggle
        })
      }}> Cập nhật</Button>
    )
  }

  handleDataChange = ({ dataSize }) => {
    this.setState({ rowCount: dataSize });
  }

  saveChanges(value) {
    this.setState({ DeptInChargeValue: value });
  }

  saveMangerChanges(value) {
    this.setState({ ManagerValue: value, ManagerCode: value['value'] }, () => {
      const {
        filterManager,
        ManagerCode,
        dataDepartment
      } = this.state


      let dataManager = filterManager.filter(data => {
        return ManagerCode.indexOf(data.employee_code) !== -1;
      })

      let ManagerInChargeDept = []
      let ManagerInChargeDeptID = dataManager[0]['department_in_charge_id'].split('|')
      ManagerInChargeDeptID.map((ManagerDeptID, index) => {
        dataDepartment.map((data, index) => {
          if (String(data['department_id']) === String(ManagerDeptID)) {
            ManagerInChargeDept.push(data['department_name'])
          }
        })
      })

      this.setState({
        isLoadingManager: false,
        dataManager: dataManager,
        ManagerInChargeDept: ManagerInChargeDept
      })
    })
  }

  saveFilterChanges() {
    const {
      dataEmployee,
      OfficeArr,
      DeptArr,
      OfficeCodeFilter,
      DeptCodeFilter
    } = this.state

    let tempData = []
    let tempOfficeList = []
    let tempDeptList = []
    let tempDeptValueArr = []

    tempOfficeList.push( { value: '-1', label: '--Tất cả khối văn phòng'} )
    tempDeptList.push( { value: '-1', label: '--Tất cả bộ phận'} )

    switch (OfficeCodeFilter) {
      case '-1':
        switch (DeptCodeFilter) {
          case '-1':
            // console.log('0-0')

            tempData = dataEmployee // [0;0]

            DeptArr.map((data, index) => {
              if (1===1) {
                tempDeptList.push( { value: data.department_code, label: data.department_name } )
              }
            })
            OfficeArr.map((data, index) => {
              if (1===1) {
                tempOfficeList.push( { value: data.office_code, label: data.office_name } )
              }
            })

            break;
          default:
            // console.log('0-1')

            tempData = dataEmployee.filter(data => // [0;1]
              data.department_code === DeptCodeFilter) 
            
            DeptArr.map((data, index) => {
              if (1===1) {
                tempDeptList.push( { value: data.department_code, label: data.department_name })
              }
              if (data.department_code === DeptCodeFilter) {
                tempDeptValueArr.push(data)
              }
            })
            OfficeArr.map((data, index) => {
              if (tempDeptValueArr.filter(dataDept => data.office_code === dataDept.office_code).length !== 0) {
                tempOfficeList.push( { value: data.office_code, label: data.office_name } )
              }
            })
        }
        break;
      default:
        switch (DeptCodeFilter) {
          case '-1':
            // console.log('1-0')

            tempData = dataEmployee.filter(data => // [1;0]
              data.office_code === OfficeCodeFilter)

            DeptArr.map((data, index) => {
              if (data.office_code === OfficeCodeFilter) {
                tempDeptList.push( { value: data.department_code, label: data.department_name } )
              }
            })
            OfficeArr.map((data, index) => {
              if (1===1) {
                tempOfficeList.push( { value: data.office_code, label: data.office_name } )
              }
            })

            break;
          default:
            // console.log('1-1')

            tempData = dataEmployee.filter(data => // [1;1]
              data.department_code === DeptCodeFilter &&
              data.office_code === OfficeCodeFilter) 
            
            DeptArr.map((data, index) => {
              if (data.office_code === OfficeCodeFilter) {
                tempDeptList.push( { value: data.department_code, label: data.department_name })
              }
              if (data.department_code === DeptCodeFilter) {
                tempDeptValueArr.push(data)
              }
            })
            OfficeArr.map((data, index) => {
              if (tempDeptValueArr.filter(dataDept => data.office_code === dataDept.office_code).length !== 0) {
                tempOfficeList.push( { value: data.office_code, label: data.office_name } )
              }
            })
        }
    }

    this.setState({
      filterEmployeeMain: tempData,
      filterEmployeeStatus: tempData,
      OfficeValueEmpArr: tempOfficeList,
      DeptValueEmpArr: tempDeptList,
      isLoadingEmployee: false
    })
  }

  saveOfficeFilterChanges(value) {
    const {
      DeptCodeFilter,
      DeptValueFilter
    } = this.state

    this.setState({
      OfficeValueFilter: value === null ? { value: '-1', label: '--Tất cả khối văn phòng'} : value,
      OfficeCodeFilter: value === null ? '-1' : value['value'],
      DeptValueFilter: value === null ? {value: '-1', label: '--Tất cả bộ phận'}: DeptValueFilter,
      DeptCodeFilter: value === null ? '-1': DeptCodeFilter,
      isLoadingEmployee: true,
    }, () => {
      this.saveFilterChanges()
    })
  }

  saveDeptFilterChanges(value) {
    const {
      OfficeCodeFilter,
      OfficeArr,
      DeptArr
    } = this.state

    let newOfficeCodeFilter = ''
    let newOfficeValueFilter = {value: '-1', label: '--Tất cả khối văn phòng'}

    if (OfficeCodeFilter === '-1' && value !== null) {
      newOfficeCodeFilter = DeptArr.filter(dataDept => dataDept.department_code === value.value)[0].office_code
    }
    else {
      newOfficeCodeFilter = OfficeCodeFilter
    }
    OfficeArr.filter(dataOffice => {
      if (dataOffice.office_code === newOfficeCodeFilter) {
        newOfficeValueFilter = {value: dataOffice.office_code, label: dataOffice.office_name}
      }
    })

    this.setState({
      DeptValueFilter: value === null ? { value: "-1", label: '--Tất cả bộ phận' } : value,
      DeptCodeFilter: value === null ? "-1" : value['value'],
      OfficeCodeFilter: newOfficeCodeFilter,
      status_emp_device: "-1",
      text:"Tất cả",
      isLoadingEmployee: true
    }, () => {
      this.saveOfficeFilterChanges(newOfficeValueFilter)
      // const {
      //   DeptCodeFilter,
      //   dataEmployee,
      //   DeptArr
      // } = this.state

      // let filterEmployeeMain = []

      // if (DeptCodeFilter === "-1") {
      //   filterEmployeeMain = dataEmployee
      // }

      // else {
      //   filterEmployeeMain = dataEmployee.filter(data => {
      //     // console.log(data)
      //     return data['department_code'] === DeptCodeFilter
      //   })
      // }

      // this.setState({
      //   isLoadingEmployee: false,
      //   filterEmployeeMain,

      // })

    })
  }


  onInputChange = e => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onInputDateChange = (value, option) => {
    this.setState({
      [option]: value
    })
  }

  success() {
    // add type: 'success' to options
    // positioning: https://github.com/fkhadra/react-toastify#positioning-toast
    return toast.success('Success... ', {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }


  // Employee

  onselectManagerToggle = () => {
    this.setState({ modalSelectManager: !this.state.modalSelectManager }, () => { });
  }

  onselectManagerClick = (e) => {
    e.preventDefault();
    const {
      ManagerCode
    } = this.state
    this.setState({
      modalSelectManager: !this.state.modalSelectManager,
      selectManager: ManagerCode,
      isLoadingSelectManager: false
    })
  }

  onUpdateEmpToggle = () => {
    // 2021-05-31
    const {
      dataEmployee
    } = this.state


    let nonselected = []
    dataEmployee.map((data, index) => {
      if (data['manager_code'] !== '') {
        nonselected.push(data['employee_code'])
      }
    })

    let filterEmployee = []
    // dataEmployee.map((data,index) => {
    //   if(data['manager_code'] === ''){
    //     filterEmployee.push(data)
    //   }
    // })

    let filterEmpNo = []
    dataEmployee.map((data, index) => {
      if (data['manager_code'] === '') {
        filterEmpNo.push(data)
      }
    })

    let filterEmpYes = []
    dataEmployee.map((data, index) => {
      if (data['manager_code'] !== '') {
        filterEmpYes.push(data)
      }
    })

    this.setState({
      modalUpdateEmp: !this.state.modalUpdateEmp,
      isLoadingSelectManager: true,
      isLoadingDepartment: true,
      DeptValue: { value: "-1", label: '--Tất cả bộ phận' },
      DeptCode: "-1",
      DeptInChargeValue: [],
      selectEmp: "-- Duyệt phép cho",
      manager_code: "",
      ManagerCode: "",
      ManagerName: "",
      EmpCode: "",
      EmpName: "",
      PosValue: { value: '-1', label: '--Vui lòng chọn Chức Danh' },
      Reason: "",
      preview: "",
      Avatar: "",
      Image: "",
      // 2021-05-31
      nonselected,
      filterEmpNo,
      filterEmpYes,
      filterEmployee,
      avatar_base64: "",
      is_update_avatar: false
    }, () => { });
  }



  // Update Profile 

  onUpdateProfileToggle = () => {
    this.setState({
      modalUpdateProfile: !this.state.modalUpdateProfile,
      isUpdateProfile: false,
      contract_1: "",
      contract_2: "",
      contract_3: "",
      contract_effective: "",
      contract_signed_date: "2020-02-01",
      first_working_date: "2020-02-01",
      gender: "",
      email: "",
      phone: "",
      date_of_birth: "1900-01-01",
      place_of_birth: "",
      folk: "",
      identified_card: "",
      date_of_issue: "1900-01-01",
      place_of_issue: "",
      domicile: "",
      place_of_origin: "",
      place_of_current: "",
      tax_code: "",
      academic_level: "",
      major: "",
      social_insurance_book: "",
      bank1: "",
      bank_account1: "",
      bank2: "",
      bank_account2: "",
      bank3: "",
      bank_account3: "",
      is_use_mobile_wifi: '1',
      is_use_home_wifi: '1',
      height: '0',
      weight: '0',
      distance_from_home: '0',
      frequency_from_training: '0',
      name_of_training: '',
      status_of_maritial: '0',
      birth_of_child_1: '',
      birth_of_child_2: '',
      birth_of_child_3: '',
      number_of_past_company: '0',
      number_of_month_work_manager: '0',
      month_of_neareast_promotion: ''
    }, () => { });
  }

  onUpdateProfileClick = () => {
    const {
      EmpCode,
      contract_1,
      contract_2,
      contract_3,
      contract_effective,
      contract_signed_date,
      first_working_date,
      gender,
      email,
      phone,
      date_of_birth,
      place_of_birth,
      folk,
      identified_card,
      date_of_issue,
      place_of_issue,
      domicile,
      place_of_origin,
      place_of_current,
      tax_code,
      academic_level,
      major,
      social_insurance_book,
      bank1,
      bank_account1,
      bank2,
      bank_account2,
      bank3,
      bank_account3,

      is_use_mobile_wifi,
      is_use_home_wifi,
      height,
      weight,
      distance_from_home,
      frequency_from_training,
      name_of_training,
      status_of_maritial,
      birth_of_child_1,
      birth_of_child_2,
      birth_of_child_3,
      number_of_past_company,
      number_of_month_work_manager,
      month_of_neareast_promotion
    } = this.state

    const newData = {
      EmpCode,
      contract_1,
      contract_2,
      contract_3,
      contract_effective,
      contract_signed_date,
      first_working_date,
      gender,
      email,
      phone,
      date_of_birth,
      place_of_birth,
      folk,
      identified_card,
      date_of_issue,
      place_of_issue,
      domicile,
      place_of_origin,
      place_of_current,
      tax_code,
      academic_level,
      major,
      social_insurance_book,
      bank1,
      bank_account1,
      bank2,
      bank_account2,
      bank3,
      bank_account3,

      is_use_mobile_wifi,
      is_use_home_wifi,
      height,
      weight,
      distance_from_home,
      frequency_from_training,
      name_of_training,
      status_of_maritial,
      birth_of_child_1,
      birth_of_child_2,
      birth_of_child_3,
      number_of_past_company,
      number_of_month_work_manager,
      month_of_neareast_promotion
    }

    this.props.onupdateProfile(newData, dataProfile => {
      this.setState({
        dataProfile: dataProfile,
        modalUpdateProfile: !this.state.modalUpdateProfile,
        isUpdateProfile: !this.state.isUpdateProfile,
        isUpdateProfile: false,
        contract_1: "",
        contract_2: "",
        contract_3: "",
        contract_effective: "",
        contract_signed_date: "2020-02-01",
        first_working_date: "2020-02-01",
        gender: "",
        email: "",
        phone: "",
        date_of_birth: "1900-01-01",
        place_of_birth: "",
        folk: "",
        identified_card: "",
        date_of_issue: "1900-01-01",
        place_of_issue: "",
        domicile: "",
        place_of_origin: "",
        place_of_current: "",
        tax_code: "",
        academic_level: "",
        major: "",
        social_insurance_book: "",
        bank1: "",
        bank_account1: "",
        bank2: "",
        bank_account2: "",
        bank3: "",
        bank_account3: "",
        is_use_mobile_wifi: '1',
        is_use_home_wifi: '1',
        height: '0',
        weight: '0',
        distance_from_home: '0',
        frequency_from_training: '0',
        name_of_training: '',
        status_of_maritial: '0',
        birth_of_child_1: '',
        birth_of_child_2: '',
        birth_of_child_3: '',
        number_of_past_company: '0',
        number_of_month_work_manager: '0',
        month_of_neareast_promotion: ''
      }, () => {

        this.props.onfetchEmployee(dataEmployee => {
          const {
            dataDepartment
          } = this.state

          let ManagerArr = []
          let ManagerValueArr = []
          let filterManager = dataEmployee.filter(data => {
            return data['is_manager'] == 1;
          })

          ManagerValueArr.push({ value: '-1', label: '--Vui lòng chọn QL', disabled: true })
          filterManager.map((data, index) => {
            ManagerArr.push(data.employee_code)
            ManagerValueArr.push({ value: data.employee_code, label: data.employee_code + '-' + data.employee_name })
          })

          let DeptNameArr = []
          dataEmployee.map((data, index) => {
            let DeptIDArr = data['department_in_charge_id'].split('|')
            let filterDepartment = []
            DeptIDArr.map((dataArr, index) => {
              dataDepartment.filter(dataDept => {
                if (String(dataDept['department_id']) === String(dataArr)) {
                  filterDepartment.push(dataDept['department_name'])
                }
              })
            })
            DeptNameArr.push({ 'employee_code': data['employee_code'], 'department_in_charge_name': filterDepartment.join(',') })
            data['department_in_charge_name'] = String(filterDepartment.length) + ' Bộ phận'
          })
          this.setState({
            dataEmployee: dataEmployee,
            filterEmployee: dataEmployee,
            filterEmployeeMain: dataEmployee,
            filterManager: filterManager,
            ManagerArr: ManagerArr,
            ManagerValueArr: ManagerValueArr,
            isLoadingEmployee: false
          }, () => { this.success() })
        })
      })
    })
  }
  onChange = e => {

    let value = ""
    if (e.target.name === 'employee_code') {
      value = (e.target.value).toUpperCase()
    }

    else {
      value = e.target.value
    }

    this.setState({
      [e.target.name]: value
    }, () => {
      const {
        username,
        // email,
        employee_code,
        password,
        password2,
        // full_name,
        // phone,
        employee_name,
        // user_type,
        // user_position,
        // position_code,
        userData,
        filteruserData
      } = this.state;

      const newUser = {
        username,
        // email,
        employee_code,
        password,
        password2,
        // full_name,
        // phone,
        employee_name
        // user_type,
        // user_position,
        // position_code,
      };

      // if (!isValid) console.log(errors) ;            
    });



    // console.log([e.target.name], e.target.value)

  };
  onUpdateButtonClick = () => {
    this.setState({
      isUpdateProfile: !this.state.isUpdateProfile
    })
  }


  checkAvatar = async (Avatar, params, callback) => {
    var request = require('request').defaults({ encoding: null });
    if (Avatar === "") {
      let url = ""
      if (params.avatar_path === undefined || params.avatar_path === "") {
        url = SERVER + `/employee/avatar?avatar_path=./operator_m.png`
      }
      else {
        url = SERVER + `/employee/avatar?avatar_path=` + params.avatar_path
      }
      await request.get(url, async (err, response, body) => {
        let data = Buffer.from(body).toString('base64');
        return callback(data)
      })
    }

    else {
      let data = Avatar.replace(/^data:image\/(png||jpeg);base64,/, "")
      return callback(data)
    }
  }

  onUpdateApprove = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      //isLoadingEmployee: true
    }, async () => {
      const {
        employee_code,
        avatar_request,
        avatar_request_path
      } = this.state
      const newUser={
        employee_code
      }
      let avatar_path= avatar_request_path
      const newUser1={
        employee_code,
        avatar_path
      }
      let avatar_base64=""
      this.checkAvatar(avatar_base64, newUser1, base64Data=>{
        this.setState({
          isLoadingEmployee: true,
        },()=>{
          this.props.onupdateEmployeeApprove(base64Data, newUser, dataApprove=>{
            //console.log(avatar_request)
            this.setState({
              dataEmployee: dataApprove,
              filterEmployeeMain: dataApprove,
              status_emp_device: "-1",
              DeptValueFilter: { value: '-1', label: '--Tất cả bộ phận' },
              OfficeValueFilter: { value: '-1', label: '--Tất cả khối văn phòng'},
              modalUpdateEmp: !this.state.modalUpdateEmp,
              employee_code:"",
              avatar_request:"",
              avatar_request_path:"",
              isLoadingEmployee: false,
            },()=>{this.success()})
          })
        })

      })
      //console.log(avatar_request)
      

    })
  }

  onUpdateUnapprove = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      isLoadingEmployee: true
    }, async () => {
      const {
        employee_code,
      } = this.state
      this.props.onupdateEmployeeUnapprove(employee_code, dataUnapprove=>{
        this.setState({
          dataEmployee: dataUnapprove,
          filterEmployeeMain: dataUnapprove,
          status_emp_device: "-1",
          DeptValueFilter: { value: '-1', label: '--Tất cả bộ phận' },
          OfficeValueFilter: { value: '-1', label: '--Tất cả khối văn phòng'},
          modalUpdateEmp: !this.state.modalUpdateEmp,
          employee_code:"",
          avatar_request:"",
          avatar_request_path:"",
          isLoadingEmployee: false,
        },()=>{this.success()})
      })

    })
  }

  onUpdateAvatarToggle = () => {
    this.setState({
      modalAvatarToggle: !this.state.modalAvatarToggle
    })
  }

  onDeleteEmpToggle = () => {
    this.setState({ modalDeleteEmp: !this.state.modalDeleteEmp })
  }


  onDeleteEmpClickYes = () => {
    this.setState({
      modalDeleteEmp: !this.state.modalDeleteEmp,
      isLoadingEmployee: true
    }, () => {
      const { EmpCode } = this.state
      this.props.ondeleteEmployee(EmpCode, dataEmployee => {
        this.setState({
          dataEmployee: dataEmployee,
          filterEmployee: dataEmployee,
          filterEmployeeMain: dataEmployee,
          isLoadingEmployee: false
        }, () => { this.success() })
      })
    })
  }

  onChangeStatus = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      const {
        status_emp_device,
        dataEmployee,
        filterEmployeeStatus,
        DeptCodeFilter,
        text,
      } = this.state
      
      let filter0 = []
      let filter1 = []
      let filter2 = []
      let filterEmployeeMain1 = []

      if (DeptCodeFilter === "-1") {
        // filterEmployeeMain1 = dataEmployee
        filterEmployeeMain1 = filterEmployeeStatus
      }
      else {
        // filterEmployeeMain1 = dataEmployee.filter(data => {
        //   // console.log(data)
        //   return data['department_code'] === DeptCodeFilter
        // })
        filterEmployeeMain1 = filterEmployeeStatus.filter(data => {
          return data['deparment_code'] = DeptCodeFilter
        })
      }

      filterEmployeeMain1.filter(data => {
        if (data['avatar_request_path'] !== "") {
          filter2.push(data)
        } else if (data['avatar_path'] !== "" && data['avatar_request_path'] === "") {
          filter1.push(data)
        } else {
          filter0.push(data)
        }
      })
      if (status_emp_device === "-1") {
        this.setState({
          filterEmployeeMain: filterEmployeeMain1,
          text:"Tất cả"
        })
      } else if (status_emp_device === "0") {
        this.setState({
          filterEmployeeMain: filter0,
          text: "Chưa đăng ký"
        })
      } else if (status_emp_device === "1") {
        this.setState({
          filterEmployeeMain: filter1,
          text:"Đã đăng ký"
        })
      } else if (status_emp_device === "2") {
        this.setState({
          filterEmployeeMain: filter2,
          text: "Chờ xét duyệt"
        })
      }
    })
  }

  update_or_delete = (row) => {
    const decoded = jwtDecode(localStorage.jwtToken)
    const equipment = decoded.equipment
    if(equipment==='1'){
      this.setState({
        modalUpdateEmp: !this.state.modalUpdateEmp,
        Avatar: this.state.Avatar,
        employee_code: row.employee_code,
        employee_name: row.employee_name,
        department_name: row.department_name,
        position_name: row.position_name,
        avatar_path: row.avatar_path,
        avatar_request: row.avatar_request,
        avatar_request_path: row.avatar_request_path
      })
    }
    
  }

  componentDidUpdate(prevProps, prevState) {

    const {
      Avatar,
      Image,
      preview
    } = this.state

    if (prevState.Image !== Image && Image !== "") {

      let data = Image.replace(/^data:image\/png;base64,/, "")

      this.props.onfetchFaceDetector(data, Image => {
        let Image_base64 = "data:image/png;base64," + Image['encoded_img']
        this.setState({
          preview: Image_base64,
          Avatar: Image_base64
        },
          () => {
          })
      })

    }

  }
  toggleLarge() {
    const {
      employee_code_init,
      dataEmployee
    } = this.state

    // 2021-05-31
    let nonselected = []
    dataEmployee.map((data, index) => {
      if (data['manager_code'] !== '') {
        nonselected.push(data['employee_code'])
      }
    })

    let filterEmployee = []
    dataEmployee.map((data, index) => {
      if (data['manager_code'] === '') {
        filterEmployee.push(data)
      }
    })

    let filterEmpNo = []
    dataEmployee.map((data, index) => {
      if (data['manager_code'] === '') {
        filterEmpNo.push(data)
      }
    })

    let filterEmpYes = []
    dataEmployee.map((data, index) => {
      if (data['manager_code'] !== '') {
        filterEmpYes.push(data)
      }
    })

    // console.log(dataMaxEmp)

    this.setState({
      large: !this.state.large,
      isLoadingSelectManager: true,
      isLoadingManager: true,
      avatar_base64: "",
      is_update_avatar: false,
      employee_code: employee_code_init,
      manager_code: "",
      username: "",
      password: "",
      password2: "",
      // full_name,
      phone: "0",
      employee_name: "",
      RoleValue: { value: "-1", label: "--Vui lòng chọn Vai trò" },
      PosValue: { value: "-1", label: "--Vui lòng chọn Chức Danh" },
      ManagerValue: { value: '-1', label: '--Vui lòng chọn QL' },
      DeptValue: { value: '-1', label: '--Vui lòng chọn Bộ Phận' },
      DeptInChargeValue: [],
      // 2021-05-31
      nonselected,
      filterEmpNo,
      filterEmpYes,
      filterEmployee
    });
  }
  render() {
    registerLocale("vi", vi);

    const {
      is_update_avatar,
      isLoadingDashboard,
      filterdataUserPri,
      DeptValueEmpArr,
      OfficeValueEmpArr,
      DeptValue,
      dataEmployee,
      filterEmployee,
      columnsEmployee,
      isLoadingEmployee,
      employee_code,
      employee_name,
      department_name,
      position_name,
      avatar_path,
      avatar_request_path,
      DeptValueFilter,
      OfficeValueFilter,
      filterEmployeeMain,
      text
    } = this.state

    let { year, month, date } = this.state;
    if (!!!year) { year = "YYYY" };
    if (!!!month) { month = "MM" };
    if (!!!date) { date = "DD" };

    const containerStyle = {
      zIndex: 1999
    };

    const { SearchBar } = Search;

    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
    const expandRow = {
      onlyOneExpanding: true,
      renderer: row => (
        <div>
          <p>{`Danh sách phòng ban do nhân viên ${row.employee_name} phụ trách là: `}</p>
          <p>{row.department_in_charge_list}</p>
        </div>
      )
    };
    return (
      <div className="animated fadeIn">
        <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
        {isLoadingEmployee && (
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
        {!isLoadingEmployee && (
          <Fragment>
            <Card>
              <CardHeader>
                <Button type='button' className="badge badge-primary">Quản lý đăng ký</Button>
              </CardHeader>
              <CardBody>
                <ToolkitProvider
                  onDataSizeChange={this.handleDataChange}
                  keyField="employee_id"
                  data={filterEmployeeMain}
                  columns={columnsEmployee}
                  columnToggle
                  exportCSV
                  search
                >
                  {props => (
                    <div>
                      <Row>
                        <Col md={2}>
                          <SearchBar
                            placeholder={"Tìm nhân viên / Bộ phận"}
                            {...props.searchProps}
                          />
                        </Col>

                        <Col md={2}>
                          <Select
                            name="OfficeCodeTimesheet"
                            value={OfficeValueFilter}
                            options={OfficeValueEmpArr}
                            onChange={this.saveOfficeFilterChanges}
                          />
                        </Col>
                        <Col md={2}>
                          <Select
                            name="DeptCodeTimesheet"
                            value={DeptValueFilter}
                            options={DeptValueEmpArr}
                            onChange={this.saveDeptFilterChanges}
                          />
                        </Col>

                        <Col md={2}>
                          <Input type='select' name="status_emp_device" onChange={this.onChangeStatus}>
                            <option value="-1">Tất cả</option>
                            <option value="0">Chưa Đăng Ký</option>
                            <option value="1">Đã Đăng Ký</option>
                            <option value="2">Chờ xét duyệt</option>
                          </Input>
                        </Col>
                      </Row>
                      <hr />
                      <ExcelFile
                        element={<Button color='link'><i className="cui-cloud-download icons"> </i> Tải danh sách </Button>}
                        filename={'QUANLYDANGKY_' + this.state.text}
                      >
                        <ExcelSheet data={filterEmployeeMain} name="Thông tin nhân viên">
                          <ExcelColumn label="Mã NV" value="employee_code" />
                          <ExcelColumn label="Tên NV" value="employee_name" />
                          <ExcelColumn label="Phòng ban" value="department_name" />
                          <ExcelColumn label="Chức Danh" value="position_name" />
                        </ExcelSheet>
                      </ExcelFile>
                      <hr />
                      <BootstrapTable
                        {...props.baseProps}
                        wrapperClasses="table-responsive"
                        filter={filterFactory()}
                        // expandRow={ expandRow }
                        pagination={paginationFactory()}
                      />
                    </div>
                  )}
                </ToolkitProvider>
                <Modal
                  isOpen={this.state.modalUpdateEmp}
                  toggle={this.onUpdateEmpToggle}
                  className={'modal-lg ' + this.props.className}
                >
                  <ModalHeader toggle={this.onUpdateEmpToggle}>Phê duyệt cập nhật khuôn mặt</ModalHeader>
                  <ModalBody>
                    <p>Tiến hành phê duyệt thay đổi khuôn mặt của nhân viên</p>
                    <FormGroup row>
                      <Col md={6}>
                        <p>Mã nhân viên: <h5>{employee_code}</h5></p>
                        <p>Tên nhân viên: <h5>{employee_name}</h5></p>
                      </Col>
                      <Col md={6}>
                        <p>Phòng ban: <h5>{department_name}</h5></p>
                        <p>Chức danh: <h5>{position_name}</h5></p>
                      </Col>
                    </FormGroup>
                    <hr />
                    <FormGroup row>
                      <Col md={6}>
                        <img width="300px" height="300px" src={SERVER + `/employee/avatar?avatar_path=` + avatar_path} />
                        <p>Hình ảnh đăng ký cũ</p>

                      </Col>
                      <Col md={6}>
                        <img width="300px" height="300px" src={SERVER + `/employee/avatar?avatar_path=` + avatar_request_path} />
                        <p>Hình ảnh đăng ký mới</p>
                      </Col>
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.onUpdateApprove}>Phê duyệt</Button>{' '}
                    <Button color="secondary" onClick={this.onUpdateUnapprove}>Hủy phê duyệt</Button>
                  </ModalFooter>
                </Modal>

              </CardBody>
            </Card>


          </Fragment>
        )}
      </div>
    );
  }

  componentDidMount() {
    this.props.onfetchOffice(dataOffice => {
      let filterOffice=[]
      dataOffice.filter(data=>{
        if(data['grant_access']!=='khongtruycap'){
          filterOffice.push(data)
        }
      })
      let OfficeArr = []
      let OfficeValueEmpArr = []
      OfficeValueEmpArr.push({ value: "-1", label: "--Tất cả khối văn phòng" })
      filterOffice.map((data, index) => {
        OfficeValueEmpArr.push({ value: data['office_code'], label: data['office_name'] })
        OfficeArr.push({ 'office_id': data['office_id'], 'office_name': data['office_name'], 'office_code': data['office_code'] })
      })
      this.setState({
        OfficeArr,
        OfficeValueEmpArr
      })
    })

    this.props.onfetchDepartment(dataDepartment => {
      let DeptArr = []
      let DeptInChargeArr = []
      let DeptValueEmpArr = []
      DeptValueEmpArr.push({ value: '-1', label: '--Tất cả bộ phận' })
      dataDepartment.map((data, index) => {
        if (data['grant_access'] !== 'khongtruycap'){
          DeptArr.push({ 'department_code': data.department_code, 'department_name': data.department_name, 'office_code': data.office_code })
          DeptInChargeArr.push({ 'value': data.department_code, 'label': data.department_name })
          // DeptValueEmpArr.push({ value: data.department_code, label:data.office_name + ' - '+ data.department_name })
          DeptValueEmpArr.push({ value: data.department_code, label:data.department_name })
        }        
      })
      this.setState({
        dataDepartment: dataDepartment,
        DeptArr: DeptArr,
        isLoadingDepartment: false,
        DeptInChargeArr: DeptInChargeArr,
        filterDeptInChargeArr: DeptInChargeArr,
        DeptValueEmpArr: DeptValueEmpArr
      }, () => {
        this.props.onfetchEmployee(dataEmployee => {
          const {
            dataDepartment
          } = this.state
          let filterEmployee=[]
          dataEmployee.filter(data => {
            if (data['grant_access'] !== 'khongtruycap') {
              filterEmployee.push(data)
            }
          })

          let DeptNameArr = []
          filterEmployee.map((data, index) => {
            let DeptIDArr = data['department_in_charge_id'].split('|')
            let filterDepartment = []
            DeptIDArr.map((dataArr, index) => {
              dataDepartment.filter(dataDept => {
                if (String(dataDept['department_id']) === String(dataArr)) {
                  filterDepartment.push(dataDept['department_name'])
                }
              })
            })
            DeptNameArr.push({ 'employee_code': data['employee_code'], 'department_in_charge_name': filterDepartment.join(', ') })
            data['department_in_charge_name'] = String(filterDepartment.length) + ' phòng ban'
            if (filterDepartment.length === 0) {
              data['department_in_charge_list'] = '0 phòng ban'
            }
            else {
              data['department_in_charge_list'] = String(filterDepartment.join('| '))
            }

          })

          this.setState({
            dataEmployee: filterEmployee,
            filterEmployeeMain: filterEmployee,
            filterEmployeeStatus: filterEmployee,
            filterEmployee: filterEmployee,
            isLoadingEmployee: false
          })
        })
      })
    });

    this.props.onfetchProfile(dataProfile => {
      this.setState({
        dataProfile: dataProfile
      })
    })
  }

  componentWillUnmount() {
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
    onfetchEmployee: (callback) => {
      dispatch(fetchEmployee(callback))
    },
    onupdateEmployee: (Avatar, dept_name, callback) => {
      dispatch(updateEmployee(Avatar, dept_name, callback))
    },
    onupdateEmployeeApprove:(avatar_request,newUser, callback)=>{
      dispatch(updateEmployeeApprove(avatar_request, newUser, callback))
    },
    onupdateEmployeeUnapprove:(employee_code,callback)=>{
      dispatch(updateEmployeeUnapprove(employee_code, callback))
    },
    oninsertEmployee: (base64, dept_name, callback) => {
      dispatch(insertEmployee(base64, dept_name, callback))
    },
    ondeleteEmployee: (dept_code, callback) => {
      dispatch(deleteEmployee(dept_code, callback))
    },
    onfetchDepartment: (callback) => {
      dispatch(fetchDepartment(callback))
    },
    onfetchPosition: (callback) => {
      dispatch(fetchPosition(callback))
    },
    onupdateProfile: (data, callback) => {
      dispatch(updateProfile(data, callback))
    },
    onfetchProfile: (callback) => {
      dispatch(fetchProfile(callback))
    },
    onfetchFaceDetector: (Avatar, callback) => {
      dispatch(fetchFaceDetector(Avatar, callback))
    },
    onfetchDashboard: (callback) => {
      dispatch(fetchDashboard(callback))
    },
    onfetchOffice: (callback) => {
      dispatch(fetchOffice(callback))
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Employee));
