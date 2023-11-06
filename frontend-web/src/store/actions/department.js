import axios from "axios";
import { SERVER } from "../constants/config";
import jwtDecode from 'jwt-decode'
import { Form } from "reactstrap";
import { moment } from 'moment'

const sign = require('jwt-encode');
const secret = "ts6nJu7TGes*og$C63NKR412zVhtXsiw5Zd$LC7tk$B^6%WXU1";
const data = {
  type: 'browser',
  name: 'HRAI',
  time: Math.floor(Date.now() / 1000)
};
const jwt = sign(data, secret);

export const fetchCompany = (callback) => {
  // const headers = {
  //   "Content-Type": "multipart/form-data",
  //   Authorization: jwt,
  //   fingerprint: "123456",
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  // };    
  return dispatch => {
    axios.get("https://api.bigdatacloud.net/data/client-info")
      .then(res => {
        const ip_info = res.data
        const headers = {
          "Content-Type": "multipart/form-data",
          fingerprint: "123456",
          Authorization: jwt,
          "ip": ip_info['ipString'],
          "device": ip_info['device'],
          "os": ip_info['os'],
          "userAgent": ip_info['userAgent'],
          "isMobile": ip_info['isMobile'],
          "userAgentDisplay": ip_info['userAgentDisplay'],
          "userAgentRaw": ip_info['userAgentRaw'],
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
        };

        const decoded = jwtDecode(localStorage.jwtToken)
        const is_admin = decoded.admin_system

        const params = { is_admin }
        axios
          .get(`${SERVER}/role/company/fetch`, {
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
      })
  };

}

export const insertCompany = (company_code, company_name, company_description,company_username, company_pass, company_device, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const is_admin = decoded.admin_system
  const formData = new FormData()
  formData.append('EditBy', EditBy)
  formData.append('is_admin', is_admin) 
  formData.append('company_code', company_code)
  formData.append('company_name', company_name)
  formData.append('company_description',company_description)
  formData.append('company_username', company_username)
  formData.append('company_pass', company_pass)
  formData.append('company_device', company_device)
  //console.log(formData)

  return dispatch => {
    axios
      .post(`${SERVER}/role/company/insert`, formData, {
        //params: params,
        headers: headers
      })
      .then(res => {
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res.data)
        callback(res.data);
      })
      .catch(console.log);
  };

}


export const deleteCompany = (company_code, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const is_admin = decoded.admin_system
  
  const formData = new FormData()
  formData.append('EditBy', EditBy)
  formData.append('is_admin', is_admin)
  formData.append('company_code', company_code)

  return dispatch => {
    axios
      .post(`${SERVER}/role/company/delete`, formData, {
        //params: params,
        headers: headers
      })
      .then(res => {
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res.data)
        callback(res.data);
      })
      .catch(console.log);
  };

}

export const fetchOffice = (callback) => {
  // const headers = {
  //   "Content-Type": "multipart/form-data",
  //   Authorization: localStorage.getItem("jwtToken"),
  //   fingerprint: "123456",
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  // };

  return dispatch => {

    axios.get("https://api.bigdatacloud.net/data/client-info")
      .then(res => {
        const ip_info = res.data
        const headers = {
          "Content-Type": "multipart/form-data",
          fingerprint: "123456",
          Authorization: jwt,
          "ip": ip_info['ipString'],
          "device": ip_info['device'],
          "os": ip_info['os'],
          "userAgent": ip_info['userAgent'],
          "isMobile": ip_info['isMobile'],
          "userAgentDisplay": ip_info['userAgentDisplay'],
          "userAgentRaw": ip_info['userAgentRaw'],
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
        };
        const decoded = jwtDecode(localStorage.jwtToken)
        const company_code = decoded.company_code
        const is_hr = decoded.is_hr
        const office_list_code = decoded.office_list_code
        const dept_list_code = decoded.dept_list_code

        const params = { company_code, is_hr, office_list_code, dept_list_code }

        axios
          .get(`${SERVER}/role/office/fetch`, {
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

      })
  };

}

export const fetchOffice_all = (callback) => {
  // const headers = {
  //   "Content-Type": "multipart/form-data",
  //   Authorization: localStorage.getItem("jwtToken"),
  //   fingerprint: "123456",
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  // };

  return dispatch => {

    axios.get("https://api.bigdatacloud.net/data/client-info")
      .then(res => {
        const ip_info = res.data
        const headers = {
          "Content-Type": "multipart/form-data",
          fingerprint: "123456",
          Authorization: jwt,
          "ip": ip_info['ipString'],
          "device": ip_info['device'],
          "os": ip_info['os'],
          "userAgent": ip_info['userAgent'],
          "isMobile": ip_info['isMobile'],
          "userAgentDisplay": ip_info['userAgentDisplay'],
          "userAgentRaw": ip_info['userAgentRaw'],
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
        };

        const decoded = jwtDecode(localStorage.jwtToken)
        const company_code = decoded.company_code
        const is_hr = 1
        const office_list_code = decoded.office_list_code

        const params = { company_code, is_hr, office_list_code }

        axios
          .get(`${SERVER}/role/office/fetch`, {
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

      })
  };
}

export const insertOffice = (office_code, office_name, office_description, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const company_code = decoded.company_code
  const is_hr= decoded.is_hr
  const office_list_code = decoded.office_list_code
  const formData = new FormData()
  formData.append('EditBy', EditBy)
  formData.append('office_code', office_code)
  formData.append('office_name', office_name)
  formData.append('office_description',office_description)
  formData.append('company_code', company_code)
  formData.append('is_hr', is_hr)
  formData.append('office_list_code', office_list_code)

  //console.log(formData)

  return dispatch => {
    axios
      .post(`${SERVER}/role/office/insert`, formData, {
        //params: params,
        headers: headers
      })
      .then(res => {
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res.data)
        callback(res.data);
      })
      .catch(console.log);
  };

}

export const deleteOffice = (office_code,callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const company_code = decoded.company_code
  const is_hr= decoded.is_hr
  const office_list_code = decoded.office_list_code
  
  const formData = new FormData()
  formData.append('EditBy', EditBy)
  formData.append('company_code', company_code)
  formData.append('office_code', office_code)
  formData.append('is_hr', is_hr)
  formData.append('office_list_code', office_list_code)

  return dispatch => {
    axios
      .post(`${SERVER}/role/office/delete`, formData, {
        //params: params,
        headers: headers
      })
      .then(res => {
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res.data)
        callback(res.data);
      })
      .catch(console.log);
  };

}

export const fetchPosition = (callback) => {
  // const headers = {
  //   "Content-Type": "multipart/form-data",
  //   Authorization: localStorage.getItem("jwtToken"),
  //   fingerprint: "123456",
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  // };

  return dispatch => {
    axios.get("https://api.bigdatacloud.net/data/client-info")
      .then(res => {
        const ip_info = res.data
        const headers = {
          "Content-Type": "multipart/form-data",
          fingerprint: "123456",
          Authorization: jwt,
          "ip": ip_info['ipString'],
          "device": ip_info['device'],
          "os": ip_info['os'],
          "userAgent": ip_info['userAgent'],
          "isMobile": ip_info['isMobile'],
          "userAgentDisplay": ip_info['userAgentDisplay'],
          "userAgentRaw": ip_info['userAgentRaw'],
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
        };

        const decoded = jwtDecode(localStorage.jwtToken)
        const company_code = decoded.company_code
        const is_hr = decoded.is_hr
        const office_list_code = decoded.office_list_code
        const dept_list_code = decoded.dept_list_code

        // const params = { company_code }
        const params = { company_code, is_hr, office_list_code, dept_list_code }


        axios
          // .get(`${SERVER}/role/position/fetch`, {
          //   params: params,
          //   headers: headers
          // })
          .get(`${SERVER}/role/position/fetchv2`, {
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
      })
  };
}

export const insertPosition = (position_code, position_name, position_description, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const company_code = decoded.company_code
  const formData = new FormData()
  formData.append('EditBy', EditBy)
  formData.append('position_code', position_code)
  formData.append('position_name', position_name)
  formData.append('position_description',position_description)
  formData.append('company_code', company_code)

  //console.log(formData)

  return dispatch => {
    axios
      .post(`${SERVER}/role/position/insert`, formData, {
        //params: params,
        headers: headers
      })
      .then(res => {
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res.data)
        callback(res.data);
      })
      .catch(console.log);
  };

}

export const insertPositionv2 = (position_code, position_name, position_description, office_code, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const company_code = decoded.company_code
  const is_hr = decoded.is_hr
  const office_list_code = decoded.office_list_code
  const dept_list_code = decoded.dept_list_code
  const formData = new FormData()
  formData.append('EditBy', EditBy)
  formData.append('position_code', position_code)
  formData.append('position_name', position_name)
  formData.append('position_description',position_description)
  formData.append('company_code', company_code)
  formData.append('office_code', office_code)
  formData.append('is_hr', is_hr)
  formData.append('office_list_code', office_list_code)
  formData.append('dept_list_code', dept_list_code)


  //console.log(formData)

  return dispatch => {
    axios
      .post(`${SERVER}/role/position/insertv2`, formData, {
        //params: params,
        headers: headers
      })
      .then(res => {
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res.data)
        callback(res.data);
      })
      .catch(console.log);
  };

}


export const deletePosition = (position_code,callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const company_code = decoded.company_code
  
  const formData = new FormData()
  formData.append('EditBy', EditBy)
  formData.append('company_code', company_code)
  formData.append('position_code', position_code)

  return dispatch => {
    axios
      .post(`${SERVER}/role/position/delete`, formData, {
        //params: params,
        headers: headers
      })
      .then(res => {
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res.data)
        callback(res.data);
      })
      .catch(console.log);
  };

}

export const deletePositionv2 = (position_code,callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const company_code = decoded.company_code
  const is_hr = decoded.is_hr
  const office_list_code = decoded.office_list_code
  const dept_list_code = decoded.dept_list_code
  
  const formData = new FormData()
  formData.append('EditBy', EditBy)
  formData.append('company_code', company_code)
  formData.append('position_code', position_code)
  formData.append('is_hr', is_hr)
  formData.append('office_list_code', office_list_code)
  formData.append('dept_list_code', dept_list_code)


  return dispatch => {
    axios
      .post(`${SERVER}/role/position/deletev2`, formData, {
        //params: params,
        headers: headers
      })
      .then(res => {
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res.data)
        callback(res.data);
      })
      .catch(console.log);
  };

}


export const fetchDepartment = (callback) => {
  // const headers = {
  //   "Content-Type": "multipart/form-data",
  //   Authorization: localStorage.getItem("jwtToken"),
  //   fingerprint: "123456",
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  // };  

  return dispatch => {

    axios.get("https://api.bigdatacloud.net/data/client-info")
      .then(res => {
        const ip_info = res.data
        const headers = {
          "Content-Type": "multipart/form-data",
          fingerprint: "123456",
          Authorization: jwt,
          "ip": ip_info['ipString'],
          "device": ip_info['device'],
          "os": ip_info['os'],
          "userAgent": ip_info['userAgent'],
          "isMobile": ip_info['isMobile'],
          "userAgentDisplay": ip_info['userAgentDisplay'],
          "userAgentRaw": ip_info['userAgentRaw'],
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
        };

        const decoded = jwtDecode(localStorage.jwtToken)
        const company_code = decoded.company_code
        const is_hr = decoded.is_hr
        const dept_list_code = decoded.dept_list_code
        const office_list_code = decoded.office_list_code

        const params = { company_code, is_hr, dept_list_code, office_list_code }

        axios
          .get(`${SERVER}/role/department/fetch`, {
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
      })
  };

}


export const fetchDepartmentByEmp = (CompanyCode, callback) => {
  // const headers = {
  //   "Content-Type": "multipart/form-data",
  //   Authorization: localStorage.getItem("jwtToken"),
  //   fingerprint: "123456",
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  // };  

  return dispatch => {    

    axios.get("https://api.bigdatacloud.net/data/client-info")
      .then(res => {
        const ip_info = res.data
        const headers = {
          "Content-Type": "multipart/form-data",
          fingerprint: "123456",
          Authorization: jwt,
          "ip": ip_info['ipString'],
          "device": ip_info['device'],
          "os": ip_info['os'],
          "userAgent": ip_info['userAgent'],
          "isMobile": ip_info['isMobile'],
          "userAgentDisplay": ip_info['userAgentDisplay'],
          "userAgentRaw": ip_info['userAgentRaw'],
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
        };
        
        const company_code = CompanyCode
        const is_hr = 0
        const dept_list_code = 'None'
        const params = { company_code, is_hr, dept_list_code }

        axios
          .get(`${SERVER}/role/department/fetch`, {
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
      })
  };

}

export const fetchDepartment_all = (callback) => {
  // const headers = {
  //   "Content-Type": "multipart/form-data",
  //   Authorization: localStorage.getItem("jwtToken"),
  //   fingerprint: "123456",
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  // };

  return dispatch => {
    axios.get("https://api.bigdatacloud.net/data/client-info")
    .then(res => {
      const ip_info = res.data
      const headers = {
        "Content-Type": "multipart/form-data",
        fingerprint: "123456",
        Authorization: jwt,
        "ip": ip_info['ipString'],
        "device": ip_info['device'],
        "os": ip_info['os'],
        "userAgent": ip_info['userAgent'],
        "isMobile": ip_info['isMobile'],
        "userAgentDisplay": ip_info['userAgentDisplay'],
        "userAgentRaw": ip_info['userAgentRaw'],
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };

      const decoded = jwtDecode(localStorage.jwtToken)
      const company_code = decoded.company_code
      const is_hr = 1
      const dept_list_code = decoded.dept_list_code
      const office_list_code = decoded.office_list_code

      const params = { company_code, is_hr, dept_list_code, office_list_code }

      axios
        .get(`${SERVER}/role/department/fetch`, {
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
    })    
  };

}

export const insertDepartment = (department_code, 
  department_name, 
  department_description, 
  office_code,
  shift_start_date,
  shift_end_date,
  shift_code_1,
  shift_start_time_1,
  shift_end_time_1,
  shift_code_2,
  shift_start_time_2,
  shift_end_time_2,
  shift_code_3,
  shift_start_time_3,
  shift_end_time_3,
  shift_code_4,
  shift_start_time_4,
  shift_end_time_4,
  shift_code_5,
  shift_start_time_5,
  shift_end_time_5,
  callback ) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const company_code = decoded.company_code
  const is_hr= decoded.is_hr
  const dept_list_code = decoded.dept_list_code
  const office_list_code = decoded.office_list_code
  const formData = new FormData()  
  formData.append('EditBy', EditBy)
  formData.append('department_code', department_code)
  formData.append('department_name', department_name)
  formData.append('department_description',department_description)
  formData.append('company_code', company_code)
  formData.append('office_code', office_code)
  formData.append('is_hr', is_hr)
  formData.append("start_date",shift_start_date)
  formData.append("end_date",shift_end_date)
  formData.append("shift_code_1",shift_code_1)
  formData.append("shift_start_time_1",shift_start_time_1)
  formData.append("shift_end_time_1",shift_end_time_1)
  formData.append("shift_code_2",shift_code_2)
  formData.append("shift_start_time_2",shift_start_time_2)
  formData.append("shift_end_time_2",shift_end_time_2)
  formData.append("shift_code_3",shift_code_3)
  formData.append("shift_start_time_3",shift_start_time_3)
  formData.append("shift_end_time_3",shift_end_time_3)
  formData.append("shift_code_4",shift_code_4)
  formData.append("shift_start_time_4",shift_start_time_4)
  formData.append("shift_end_time_4",shift_end_time_4)
  formData.append("shift_code_5",shift_code_5)
  formData.append("shift_start_time_5",shift_start_time_5)
  formData.append("shift_end_time_5",shift_end_time_5)
  formData.append('dept_list_code', dept_list_code)
  formData.append('office_list_code', office_list_code)

  //console.log(formData)

  return dispatch => {
    axios
      .post(`${SERVER}/role/department/insert`, formData, {
        //params: params,
        headers: headers
      })
      .then(res => {
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res.data)
        callback(res.data);
      })
      .catch(console.log);
  };

}


export const deleteDepartment = (department_code,callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const company_code = decoded.company_code
  const is_hr= decoded.is_hr
  const dept_list_code = decoded.dept_list_code
  const office_list_code = decoded.office_list_code
  
  const formData = new FormData()
  formData.append('EditBy', EditBy)
  formData.append('company_code', company_code)
  formData.append('department_code', department_code)
  formData.append('is_hr', is_hr)
  formData.append('dept_list_code', dept_list_code)
  formData.append('office_list_code', office_list_code)

  return dispatch => {
    axios
      .post(`${SERVER}/role/department/delete`, formData, {
        //params: params,
        headers: headers
      })
      .then(res => {
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res.data)
        callback(res.data);
      })
      .catch(console.log);
  };

}


export const fetchPlace = (callback) => {
  // const headers = {
  //   "Content-Type": "multipart/form-data",
  //   Authorization: localStorage.getItem("jwtToken"),
  //   fingerprint: "123456",
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  // };

  return dispatch => {
    axios.get("https://api.bigdatacloud.net/data/client-info")
    .then(res => {
      const ip_info = res.data
      const headers = {
        "Content-Type": "multipart/form-data",
        fingerprint: "123456",
        Authorization: jwt,
        "ip": ip_info['ipString'],
        "device": ip_info['device'],
        "os": ip_info['os'],
        "userAgent": ip_info['userAgent'],
        "isMobile": ip_info['isMobile'],
        "userAgentDisplay": ip_info['userAgentDisplay'],
        "userAgentRaw": ip_info['userAgentRaw'],
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };

      const decoded = jwtDecode(localStorage.jwtToken)
      const company_code = decoded.company_code
      
      const params = {company_code}
      
      axios
        .get(`${SERVER}/role/place/fetch`, {
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
    })    
  };

}

export const insertPlace = (place_code, place_name, place_address, lat,long, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const company_code = decoded.company_code

  const formData = new FormData()
  formData.append('EditBy', EditBy)
  formData.append('place_code', place_code)
  formData.append('place_name',place_name)
  formData.append('place_address', place_address)
  formData.append('company_code', company_code)
  formData.append('EditBy', EditBy)
  formData.append('lat', lat)
  formData.append('long',long)

  //console.log(formData)

  return dispatch => {
    axios
      .post(`${SERVER}/role/place/insert`, formData, {
        //params: params,
        headers: headers
      })
      .then(res => {
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res.data)
        callback(res.data);
      })
      .catch(console.log);
  };

}


export const deletePlace = (place_code,callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const company_code = decoded.company_code
  
  const formData = new FormData()
  formData.append('EditBy', EditBy)
  formData.append('company_code', company_code)
  formData.append('place_code', place_code)

  return dispatch => {
    axios
      .post(`${SERVER}/role/place/delete`, formData, {
        //params: params,
        headers: headers
      })
      .then(res => {
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res.data)
        callback(res.data);
      })
      .catch(console.log);
  };

}