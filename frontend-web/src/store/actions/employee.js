import axios from "axios";
import { param } from "jquery";
import { SERVER } from "../constants/config";
import jwtDecode from 'jwt-decode'
import FileDownload from 'js-file-download';

const sign = require('jwt-encode');

const secret = "ts6nJu7TGes*og$C63NKR412zVhtXsiw5Zd$LC7tk$B^6%WXU1";

const data = {
  type: 'browser',
  name: 'HRAI',
  time: Math.floor(Date.now() / 1000)
};

const jwt = sign(data, secret);

export const fetchDashboard = (callback) => {
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
        const EditBy = decoded.employee_code
        const company_code = decoded.company_code

        const params = { company_code }

        axios
          .get(`${SERVER}/dashboard/fetch`, {
            headers: headers,
            params: params
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

export const fetchEmployee = (callback) => {
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
        const EditBy = decoded.employee_code
        const company_code = decoded.company_code
        const dept_list_code = decoded.dept_list_code
        const office_list_code = decoded.office_list_code
        const is_hr = decoded.is_hr

        const formData = new FormData()
        formData.append('EditBy', EditBy)
        formData.append('company_code', company_code)
        formData.append('dept_list_code', dept_list_code)
        formData.append('office_list_code', office_list_code)
        formData.append('is_hr', is_hr)

        axios
          .post(`${SERVER}/employee/fetch`, formData, {
            // params: params,
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



export const uploadEmployeeFile = (file, callback) => {
  // const headers = {
  //   "Content-Type": "multipart/form-data",
  //   Authorization: localStorage.getItem("jwtToken"),
  //   fingerprint: "123456",
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  // };
  return dispatch=>{
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
      const EditBy = decoded.employee_code
      const dept_list_code = decoded.dept_list_code
      const office_list_code = decoded.office_list_code
      const is_hr = decoded.is_hr
      const formData = new FormData();
      formData.append("EditBy",EditBy);
      formData.append("file", file);
      formData.append("company_code", company_code);
      formData.append('dept_list_code', dept_list_code)
      formData.append('office_list_code', office_list_code)
      formData.append('is_hr', is_hr)
    
      axios
        .post(`${SERVER}/employee/upload/file`, formData, {
          // params: params,
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

export const downloadTemplateEmp = (callback) => {
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
        const EditBy = decoded.employee_code
        const company_code = decoded.company_code
        

        const formData = new FormData()
        formData.append('EditBy', EditBy)
        formData.append('company_code', company_code)
        

        const newDate = new Date()


        axios
          .post(`${SERVER}/employee/download/template`, formData, {
            // params: params,
            headers: headers,
            responseType: 'blob'
          })
          .then(res => {
            // res.data.sizePerPage = sizePerPage
            // res.data.page = page
            // console.log(res.data)
            FileDownload(res.data, 'Template_upload_employee.xlsx' );
            callback(res.data);
          })
          .catch(console.log);
      })
  };

}


export const fetchEmployee_notlogin = (callback) => {
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
        const EditBy = decoded.employee_code
        const company_code = decoded.company_code
        const dept_list_code = decoded.dept_list_code
        const is_hr = decoded.is_hr

        const formData = new FormData()
        formData.append('EditBy', 'HS0000')
        formData.append('company_code', company_code)
        formData.append('dept_list_code', dept_list_code)
        formData.append('is_hr', is_hr)

        axios
          .post(`${SERVER}/employee/fetch`, formData, {
            // params: params,
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
export const fetchCostumeConfig = (callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  return dispatch => {
    axios
      .get(`${SERVER}/costume/fetch`, {
        // params: params,
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
export const fetchEmployeeDetail = (employee_code, callback) => {
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

        const params = {
          employee_code
        }

        axios
          .get(`${SERVER}/employee/fetch/detail`, {
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

export const fetchEmployeeDetailByCom = (employee_code, company_code, callback) => {
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

        const params = {
          employee_code,
          company_code
        }

        axios
          .get(`${SERVER}/employee/fetch/detailbycom`, {
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

export const fetchScheduleDetail = (working_date, employee_code, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = {
    working_date,
    employee_code
  }

  return dispatch => {
    axios
      .get(`${SERVER}/shift/fetchrequest`, {
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
  };

}

export const insertEmployee = (base64Data, params, callback) => {
  // export const insertEmployee = ( params, callback) => {
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
  const dept_list_code = decoded.dept_list_code
  const office_list_code = decoded.office_list_code
  const formData = new FormData();
  formData.append("EditBy",EditBy);
  formData.append("file", base64Data);
  formData.append("EmpName", params.EmpName);
  formData.append("EmpCode", params.EmpCode);
  formData.append("EmpEmail", params.EmpEmail);
  formData.append("EmpPhone", params.EmpPhone);
  formData.append("DeptCode", params.DeptCode);
  formData.append("Position", params.Position);
  formData.append("DeptInChargeCode", params.DeptInChargeCode);
  formData.append('company_code', company_code);
  formData.append('office_code', params.office_code);
  formData.append('dept_list_code', dept_list_code);
  formData.append('office_list_code', office_list_code);
  formData.append('is_hr', is_hr)


  return dispatch => {
    axios
      .post(`${SERVER}/employee/insert`, formData, {
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

export const insertExplan = (params, callback) => {
  // export const insertEmployee = ( params, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  // alert(String(params.company_code))
  // alert(String(params.employee_code))
  // alert(String(params.timesheet_date))
  // alert(String(params.explan_text))
  // alert(String(params.image_text))
  // alert(String(params.timesheet_month))

  const formData = new FormData();
  formData.append("company_code", params.company_code);
  formData.append("employee_code", params.employee_code);
  formData.append("timesheet_date", params.timesheet_date);
  formData.append("explan_text", params.explan_text);
  formData.append("image_text", params.image_text);
  formData.append('timesheet_month', params.timesheet_month)

  return dispatch => {
    axios
      .post(`${SERVER}/explan/insert`, formData, {
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

export const deleteExplan = (params, callback) => {
  // export const insertEmployee = ( params, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const formData = new FormData();
  formData.append("company_code", params.company_code);
  formData.append("employee_code", params.employee_code);
  formData.append("timesheet_date", params.timesheet_date);
  formData.append('timesheet_month', params.timesheet_month)

  return dispatch => {
    axios
      .post(`${SERVER}/explan/delete`, formData, {
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

export const updateEmployee = (base64Data, params, callback) => {
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
  const dept_list_code = decoded.dept_list_code
  const office_list_code = decoded.office_list_code
  const formData = new FormData();
  formData.append("EditBy",EditBy);
  formData.append("file", base64Data);
  formData.append("EmpName", params.EmpName);
  formData.append("EmpPhone", params.EmpPhone);
  formData.append("EmpEmail", params.EmpEmail);
  formData.append("ManagerCode", params.ManagerCode);
  formData.append("DeptCode", params.DeptCode);
  formData.append("Position", params.Position); 
  formData.append("Reason", params.Reason);
  formData.append("EmpCode", params.EmpCode);
  formData.append("DeptInChargeCode", params.DeptInChargeCode);
  formData.append("UserType", params.user_type);
  formData.append("EmpSelected", params.EmpSelected);
  formData.append('company_code', company_code);
  formData.append('office_code', params.office_code);
  formData.append('dept_list_code', dept_list_code);
  formData.append('office_list_code', office_list_code);
  formData.append('is_hr', is_hr)

  // console.log(params)
  // console.log(base64Data)

  return dispatch => {
    axios
      .post(`${SERVER}/employee/update`, formData, {
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

export const deleteEmployee = (EmpCode, callback) => {
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
  const dept_list_code = decoded.dept_list_code
  const office_list_code = decoded.office_list_code

  const formData = new FormData()
  formData.append('EditBy', EditBy)
  formData.append('EmpCode', EmpCode)
  formData.append('company_code', company_code)
  formData.append('dept_list_code', dept_list_code)
  formData.append('office_list_code', office_list_code)
  formData.append('is_hr', is_hr)

  return dispatch => {
    axios
      .post(`${SERVER}/employee/delete`, formData, {
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
export const deleteCostumeType = (ppe_role_code, department_code, position_code, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code

  const params = {
    EditBy,
    ppe_role_code,
    department_code,
    position_code
  }

  return dispatch => {
    axios
      .get(`${SERVER}/costume/type/delete`, {
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
  };

}
export const deleteAllCostumeType = (ppe_role_code, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = {
    ppe_role_code,
  }

  return dispatch => {
    axios
      .get(`${SERVER}/costume/type/deleteall`, {
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
  };

}
export const updateEmployeeApprove = (
  avatar_request,
  params,
  callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const formData = new FormData();
  formData.append("EditBy",EditBy);
  formData.append("avatar_request", avatar_request);
  formData.append("employee_code", params.employee_code);

  return dispatch => {
    axios
      .post(`${SERVER}/employee/update/approve`, formData, {
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

export const updateEmployeeAvatar = (path, params,callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  //const base64Data1 = pic.replace(/^data:image\/jpeg;base64,/,"")
  //const base64Data = base64Data1.replace(/^data:image\/png;base64,/,"")
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const company_code = decoded.company_code
  const formData = new FormData();
  formData.append("EditBy",EditBy);
  formData.append("pic", path);
  formData.append("employee_code", params.employee_code);
  formData.append('company_code', company_code)

  return dispatch => {
    axios
      .post(`${SERVER}/employee/register/avatar`, formData, {
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

export const updateVisitorAvatar = (path, params,callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  //const base64Data1 = pic.replace(/^data:image\/jpeg;base64,/,"")
  //const base64Data = base64Data1.replace(/^data:image\/png;base64,/,"")
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const company_code = decoded.company_code

  const formData = new FormData();
  formData.append("EditBy",EditBy);
  formData.append("pic", path);
  formData.append("visitor_code", params.visitor_code);
  formData.append('company_code', company_code)

  return dispatch => {
    axios
      .post(`${SERVER}/visitor/register/avatar`, formData, {
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


export const updatePartnerAvatar = (path, params,callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  //const base64Data1 = pic.replace(/^data:image\/jpeg;base64,/,"")
  //const base64Data = base64Data1.replace(/^data:image\/png;base64,/,"")
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const formData = new FormData();
  formData.append("EditBy",EditBy);
  formData.append("pic", path);
  formData.append("partner_code", params.partner_code);

  return dispatch => {
    axios
      .post(`${SERVER}/partner/register/avatar`, formData, {
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


export const updateEmployeeUnapprove = (
  employee_code,
  callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code

  const params = {
    EditBy,
    employee_code
  }

  return dispatch => {
    axios
      .get(`${SERVER}/employee/update/unapprove`, {
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
  };

}
export const updateCostumeRole = (
  ppe_role_code,
  ppe_role_name,
  helmet_type,
  vest_type,
  pants_type,
  shoes_type,
  mask_type,
  bag_type,
  callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = {
    ppe_role_code,
    ppe_role_name,
    helmet_type,
    vest_type,
    pants_type,
    shoes_type,
    mask_type,
    bag_type
  }

  return dispatch => {
    axios
      .get(`${SERVER}/costume/role/insert`, {
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
  };

}

export const insertCostume = (
  ppe_role_code,
  ppe_role_name,
  helmet_type,
  vest_type,
  pants_type,
  shoes_type,
  mask_type,
  bag_type,
  check_metal,
  list_department_code,
  list_position_code,
  callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code

  const params = {
    EditBy,
    ppe_role_code,
    ppe_role_name,
    helmet_type,
    vest_type,
    pants_type,
    shoes_type,
    mask_type,
    bag_type,
    check_metal,
    list_department_code,
    list_position_code,
  }

  return dispatch => {
    axios
      .get(`${SERVER}/costume/insert`, {
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
  };

}

export const updateCostumeResult = (
  EmpCode,
  CreatedDate,
  column_check,
  value_update,
  callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code

  const params = {
    EditBy,
    EmpCode,
    CreatedDate,
    column_check,
    value_update
  }

  return dispatch => {
    axios
      .get(`${SERVER}/costume/update/result`, {
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
  };

}

export const insertCostumeType = (
  ppe_role_code,
  department_code,
  position_code,
  callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = {
    ppe_role_code,
    department_code,
    position_code
  }

  return dispatch => {
    axios
      .get(`${SERVER}/costume/type/insert`, {
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
  };

}

export const insertUnRoleCostume = (
  DeptCode, PosCode, RoleCode, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code

  const params = {
    EditBy,DeptCode, PosCode, RoleCode
  }



  return dispatch => {
    axios
      .get(`${SERVER}/costume/listunrole/insert`, {
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
  };

}

export const fetchAccess = (snapshot_date, callback) => {
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


        // const params = {
        //   snapshot_date,
        //   company_code
        // }

        const params = {
          snapshot_date,
          company_code,
          is_hr,
          office_list_code,
          dept_list_code
        }

        axios
          .get(`${SERVER}/access/fetch`, {
            headers: headers,
            params: params
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


export const fetchCostumeHistory = (date, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const params = {
    date
  }


  return dispatch => {
    axios
      .get(`${SERVER}/costume/fetch/history`, {
        headers: headers,
        params: params
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

export const fetchListUnRole = (callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  return dispatch => {
    axios
      .get(`${SERVER}/costume/listunrole/fetch`, {
        headers: headers,
        //params: params
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

export const fetchListRoleCostume = (callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  return dispatch => {
    axios
      .get(`${SERVER}/costume/role/fetch`, {
        headers: headers,
        //params: params
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

export const fetchCostumeHis = (start_date, end_date, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const params = {
    start_date, 
    end_date
  }


  return dispatch => {
    axios
      .get(`${SERVER}/costume/history/fetch`, {
        headers: headers,
        params: params
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


export const fetchCostumeReport = (start_date, end_date, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const params = {
    start_date, 
    end_date
  }


  return dispatch => {
    axios
      .get(`${SERVER}/costume/fetchreport`, {
        headers: headers,
        params: params
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

export const fetchProfile = (callback) => {
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

        axios
          .get(`${SERVER}/profile/fetch`, {
            headers: headers,
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

export const updateProfile = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = data

  return dispatch => {
    axios
      .post(`${SERVER}/profile/update`, {
        params: params,
        headers: headers,
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

export const fetchLeave = (callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };


  return dispatch => {
    axios
      .get(`${SERVER}/leave/fetch`, {
        headers: headers,
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

export const fetchWorkingType = (callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };


  return dispatch => {
    axios
      .get(`${SERVER}/workingtype/fetch`, {
        headers: headers,
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
export const insertWorkingType = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  data.EditBy= EditBy
  const params = data


  return dispatch => {
    axios
      .post(`${SERVER}/workingtype/insert`, {
        params: params,
        headers: headers,
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

export const updateWorkingType = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  data.EditBy=EditBy
  const params = data


  return dispatch => {
    axios
      .post(`${SERVER}/workingtype/update`, {
        params: params,
        headers: headers,
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

export const deleteWorkingType = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  data.EditBy=EditBy
  const params = data


  return dispatch => {
    axios
      .post(`${SERVER}/workingtype/delete`, {
        params: params,
        headers: headers,
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

export const insertAssignSchedule = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = data

  return dispatch => {
    axios
      .post(`${SERVER}/schedule/assign`, {
        headers: headers,
        params: params
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

export const insertAssignScheduleSingle = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = data

  return dispatch => {
    axios
      .post(`${SERVER}/schedule/assign/single`, {
        headers: headers,
        params: params
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

export const fetchAssignSchedule = (callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  return dispatch => {
    axios
      .get(`${SERVER}/schedule/fetch`, {
        headers: headers,
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

export const deleteAssignSchedule = (assign_schedule_id, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = {
    assign_schedule_id
  }

  return dispatch => {
    axios
      .get(`${SERVER}/schedule/delete`, {
        headers: headers,
        params: params
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

export const updateAssignSchedule = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = {
    data
  }

  return dispatch => {
    axios
      .post(`${SERVER}/schedule/update`, {
        headers: headers,
        params: params
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

export const fetchLeaveSchedule = (employee_code, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const decoded = jwtDecode(localStorage.jwtToken)
  const is_hr = decoded.is_hr

  const params = {
    employee_code,
    is_hr
  }

  return dispatch => {
    axios
      .get(`${SERVER}/scheduleleave/fetch`, {
        headers: headers,
        params: params
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

export const deleteLeaveSchedule = (leave_schedule_id, employee_code, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = {
    leave_schedule_id,
    employee_code
  }

  return dispatch => {
    axios
      .get(`${SERVER}/scheduleleave/delete`, {
        headers: headers,
        params: params
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

export const transferLeaveSchedule = (leave_schedule_id, employee_code, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = {
    leave_schedule_id,
    employee_code
  }

  return dispatch => {
    axios
      .get(`${SERVER}/scheduleleave/transfer`, {
        headers: headers,
        params: params
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

export const fetchDepartmentTimesheet = (is_hr, department_in_charge_id, callback) => {
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

        const params = {
          department_in_charge_id,
          is_hr
        }

        axios
          .get(`${SERVER}/schedule/department`, {
            headers: headers,
            params: params
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

export const updateTimesheetComment = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = data

  return dispatch => {
    axios
      .post(`${SERVER}/schedule/comment`, {
        headers: headers,
        params: params
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

export const fetchTimesheetAbsent = (is_hr, department_in_charge_id, working_date, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = {
    department_in_charge_id,
    is_hr,
    working_date
  }

  return dispatch => {
    axios
      .get(`${SERVER}/schedule/timesheetabsent`, {
        headers: headers,
        params: params
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

export const fetchTimesheetMissing = (is_hr, department_in_charge_id, start_date, end_date, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const decoded = jwtDecode(localStorage.jwtToken)
  const is_manager = decoded.is_manager
  const employee_code = decoded.employee_code

  const params = {
    department_in_charge_id,
    is_hr,
    start_date,
    end_date,
    is_manager,
    employee_code
  }

  return dispatch => {
    axios
      .get(`${SERVER}/schedule/timesheetmissing`, {
        headers: headers,
        params: params
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

export const fetchCostumeOut = (is_hr, department_in_charge_id, start_date, end_date, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const decoded = jwtDecode(localStorage.jwtToken)
  const is_manager = decoded.is_manager
  const employee_code = decoded.employee_code

  const params = {
    department_in_charge_id,
    is_hr,
    start_date,
    end_date,
    is_manager,
    employee_code
  }

  return dispatch => {
    axios
      .get(`${SERVER}/costume/fetch/out`, {
        headers: headers,
        params: params
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

export const fetchTimesheet = (is_hr, department_in_charge_id, start_date, end_date, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const decoded = jwtDecode(localStorage.jwtToken)
  const is_manager = decoded.is_manager
  const employee_code = decoded.employee_code

  const params = {
    department_in_charge_id,
    is_hr,
    start_date,
    end_date,
    is_manager,
    employee_code
  }

  return dispatch => {
    axios
      .get(`${SERVER}/schedule/timesheet`, {
        headers: headers,
        params: params
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

export const fetchTimesheetAll = (is_hr, department_in_charge_id, start_date, end_date, callback) => {
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
        const is_manager = decoded.is_manager
        const employee_code = decoded.employee_code
        const company_code = decoded.company_code
        const office_list_code = decoded.office_list_code
        const dept_list_code = decoded.dept_list_code

        const params = {
          department_in_charge_id,
          is_hr,
          start_date,
          end_date,
          is_manager,
          employee_code,
          company_code,
          office_list_code,
          dept_list_code
        }

        axios
          .get(`${SERVER}/schedule/timesheetall`, {
            headers: headers,
            params: params
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

export const fetchTimesheetPerson = (empcode, start_date, end_date, callback) => {
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

        const is_manager = '0'
        const is_hr = '0'
        const department_in_charge_id = ''
        const employee_code = empcode.split('_')[0]
        const company_code = empcode.split('_')[1]

        const params = {
          department_in_charge_id,
          is_hr,
          start_date,
          end_date,
          is_manager,
          employee_code,
          company_code
        }

        axios
          .get(`${SERVER}/schedule/timesheetall_nv`, {
            headers: headers,
            params: params
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

export const fetchTimesheetPersonNV = (empcode, start_date, end_date, callback) => {
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

        const is_manager = '0'
        const is_hr = '0'
        const department_in_charge_id = ''
        const employee_code = empcode.split('_')[0]
        const company_code = empcode.split('_')[1]

        const params = {
          department_in_charge_id,
          is_hr,
          start_date,
          end_date,
          is_manager,
          employee_code,
          company_code
        }

        axios
          .get(`${SERVER}/schedule/timesheetall_nv`, {
            headers: headers,
            params: params
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

export const fetchTimesheetByMonth = (empcode, timesheet_month, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const employee_code = empcode.split('_')[0]
  const company_code = empcode.split('_')[1]

  const params = {
    employee_code,
    company_code ,
    timesheet_month
  }

  return dispatch => {
    axios
      .get(`${SERVER}/schedule/timesheetbymonth`, {
        headers: headers,
        params: params
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

export const fetchTimesheetReport = (is_hr, department_in_charge_id, start_date, end_date, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const decoded = jwtDecode(localStorage.jwtToken)
  const is_manager = decoded.is_manager
  const employee_code = decoded.employee_code

  const params = {
    department_in_charge_id,
    is_hr,
    start_date,
    end_date,
    is_manager,
    employee_code
  }

  return dispatch => {
    axios
      .get(`${SERVER}/schedule/timesheetreport`, {
        headers: headers,
        params: params
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


export const predictWorkingType = (start_date, end_date, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const decoded = jwtDecode(localStorage.jwtToken)
  const is_manager = decoded.is_manager
  const emp_code = decoded.employee_code

  const params = {
    emp_code,
    start_date,
    end_date,
  }

  return dispatch => {
    axios
      .get(`${SERVER}/timesheet/predict/type_demo`, {
        headers: headers,
        params: params,
        responseType: 'blob'
      })
      .then(res => {
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res.data)
        FileDownload(res.data, 'Dự đoán phân ca.xlsx' );   
        callback(res.data);
      })
      .catch(console.log);
  };
}


export const exportExcelTimesheet = (start_date, end_date, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const decoded = jwtDecode(localStorage.jwtToken)
  const is_manager = decoded.is_manager
  const emp_code = decoded.employee_code

  const params = {
    emp_code,
    start_date,
    end_date,
  }

  return dispatch => {
    axios
      .get(`${SERVER}/timesheet/export/template`, {
        headers: headers,
        params: params,
        responseType: 'blob'
      })
      .then(res => {
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res.data)
        FileDownload(res.data, 'Bảng xuất kết công.xlsx' );   
        callback(res.data);
      })
      .catch(console.log);
  };
}

export const exportWorkingType = (start_date, end_date, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const decoded = jwtDecode(localStorage.jwtToken)
  const is_manager = decoded.is_manager
  const emp_code = decoded.employee_code

  const params = {
    emp_code,
    start_date,
    end_date,
  }

  return dispatch => {
    axios
      .get(`${SERVER}/timesheet/export/type`, {
        headers: headers,
        params: params,
        responseType: 'blob'
      })
      .then(res => {
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res.data)
        FileDownload(res.data, 'Xuất công theo ca.xlsx' );   
        callback(res.data);
      })
      .catch(console.log);
  };
}

export const costumeReport = (start_date, end_date, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const decoded = jwtDecode(localStorage.jwtToken)
  const is_manager = decoded.is_manager
  const emp_code = decoded.employee_code

  const params = {
    emp_code,
    start_date,
    end_date,
  }

  return dispatch => {
    axios
      .get(`${SERVER}/costume/export/report`, {
        headers: headers,
        params: params,
        responseType: 'blob'
      })
      .then(res => {
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res.data)
        FileDownload(res.data, "Dữ liệu chấm tác phong.xlsx" );     
        callback(res.data);
      })
      .catch(console.log);
  };
}

export const fetchTimesheetWeekly = (is_hr, department_in_charge_id, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };


  const decoded = jwtDecode(localStorage.jwtToken)
  const is_manager = decoded.is_manager
  const employee_code = decoded.employee_code

  const params = {
    department_in_charge_id,
    is_hr,
    is_manager,
    employee_code
  }

  return dispatch => {
    axios
      .get(`${SERVER}/schedule/timesheetweekly`, {
        headers: headers,
        params: params
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

export const insertLeaveSchedule = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const decoded = jwtDecode(localStorage.jwtToken)
  const created_by = decoded.employee_code
  const is_hr = decoded.is_hr

  const params = data
  params['created_by'] = created_by
  params['is_hr'] = is_hr


  return dispatch => {
    axios
      .post(`${SERVER}/scheduleleave/insert`, {
        headers: headers,
        params: params
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

export const fetchLeaveScheduleManager = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };


  const decoded = jwtDecode(localStorage.jwtToken)
  const is_hr = decoded.is_hr


  const params = {
    employee_code: data,
    is_hr: is_hr
  }

  return dispatch => {
    axios
      .get(`${SERVER}/scheduleleave/manager`, {
        headers: headers,
        params: params
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

export const approveLeaveScheduleManager = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const decoded = jwtDecode(localStorage.jwtToken)
  const employee_code = decoded.employee_code
  const is_hr = decoded.is_hr

  const params = {
    leave_schedule_id: data,
    employee_code: employee_code,
    is_hr: is_hr
  }

  return dispatch => {
    axios
      .get(`${SERVER}/scheduleleave/approve`, {
        headers: headers,
        params: params
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

export const cancelLeaveScheduleManager = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const decoded = jwtDecode(localStorage.jwtToken)
  const employee_code = decoded.employee_code
  const is_hr = decoded.is_hr

  const params = {
    leave_schedule_id: data,
    employee_code: employee_code,
    is_hr: is_hr
  }

  return dispatch => {
    axios
      .get(`${SERVER}/scheduleleave/cancel`, {
        headers: headers,
        params: params
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

export const removeLeaveScheduleManager = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const decoded = jwtDecode(localStorage.jwtToken)
  const employee_code = decoded.employee_code
  const is_hr = decoded.is_hr

  const params = {
    leave_schedule_id: data,
    employee_code: employee_code,
    is_hr: is_hr
  }

  return dispatch => {
    axios
      .get(`${SERVER}/scheduleleave/remove`, {
        headers: headers,
        params: params
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

export const insertLeave = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = data

  return dispatch => {
    axios
      .post(`${SERVER}/leave/insert`, {
        headers: headers,
        params: params
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

export const updateLeave = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = data

  return dispatch => {
    axios
      .post(`${SERVER}/leave/update`, {
        headers: headers,
        params: params
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

export const deleteLeave = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = data

  return dispatch => {
    axios
      .post(`${SERVER}/leave/delete`, {
        headers: headers,
        params: params
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

export const fetchTimesheetShift = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = data

  return dispatch => {
    axios
      .post(`${SERVER}/schedule/shift/fetch`, {
        headers: headers,
        params: params
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

export const fetchTimesheetShiftLevel = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = data

  return dispatch => {
    axios
      .post(`${SERVER}/schedule/shift/fetchlevel`, {
        headers: headers,
        params: params
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

export const fetchTimesheetShiftEmployee = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = data

  return dispatch => {
    axios
      .post(`${SERVER}/schedule/timesheetemployee`, {
        headers: headers,
        params: params
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

export const insertTimesheetShift = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = data

  return dispatch => {
    axios
      .post(`${SERVER}/schedule/shift/insert`, {
        headers: headers,
        params: params
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
export const fetchShift = (callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const decoded = jwtDecode(localStorage.jwtToken)
  const is_manager = decoded.is_manager
  const employee_code = decoded.employee_code
  const is_hr= decoded.is_hr
  const department_in_charge_id= decoded.department_in_charge_id

  const params = {
    department_in_charge_id,
    employee_code,
    is_hr,
    is_manager
  }

  return dispatch => {
    axios
      .get(`${SERVER}/shift/fetch`, {
        headers: headers,
        params:params
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
export const fetchLeaveRemain = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = data

  return dispatch => {
    axios
      .post(`${SERVER}/leaveremain/fetch`, {
        headers: headers,
        params: params
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

export const fetchLeaveToday = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = data

  return dispatch => {
    axios
      .post(`${SERVER}/leavetoday/fetch`, {
        headers: headers,
        params: params
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

export const fetchHistory = (start_date, end_date, callback) => {
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

        const params = {
          start_date,
          end_date,
          company_code,
          is_hr,
          dept_list_code,
          office_list_code
        }

        axios
          .get(`${SERVER}/history/fetch`, {
            headers: headers,
            params: params
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

// 2021-08-20 DanhTH Update

export const insertShiftMonth = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = data
  return dispatch => {
    axios
      .post(`${SERVER}/shift/insert/month`, {
        params: params,
        headers: headers,
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

export const insertShift = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = data


  return dispatch => {
    axios
      .post(`${SERVER}/shift/insert`, {
        params: params,
        headers: headers,
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

export const insertShiftRequest = (data, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  data.EditBy=EditBy
  const params = data


  return dispatch => {
    axios
      .post(`${SERVER}/shift/insertInMonth`, {
        params: params,
        headers: headers,
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

export const uploadShift = (file, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const formData = new FormData();
  formData.append("EditBy",EditBy);
  formData.append("file", file);

  return dispatch => {
    axios
      .post(`${SERVER}/shift/upload`, formData, {
        // params: params,
        headers: headers,
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


export const uploadTimesheet = (file,start_date, end_date, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const formData = new FormData();
  formData.append("EditBy",EditBy);
  formData.append("file", file);
  formData.append("start_date", start_date);
  formData.append("end_date", end_date);


  return dispatch => {
    axios
      .post(`${SERVER}/timesheet/export/upload`, formData, {
        // params: params,
        headers: headers,
        responseType: 'blob'
      })
      .then(res => {
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res.data)
        FileDownload(res.data, 'Xuất kết công.xlsx' );
        callback(res.data);
      })
      .catch(console.log);
  };
}

export const uploadTimesheetPlan = (file,start_date, end_date, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const formData = new FormData();
  formData.append("EditBy",EditBy);
  formData.append("file", file);
  formData.append("start_date", start_date);
  formData.append("end_date", end_date);


  return dispatch => {
    axios
      .post(`${SERVER}/timesheet/export/uploadplan`, formData, {
        // params: params,
        headers: headers,
        responseType: 'blob'
      })
      .then(res => {
        callback(res.data);
      })
      .catch(console.log);
  };
}


export const downloadFileTimesheet = (start_date, end_date, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const formData = new FormData();
  formData.append("EditBy",EditBy);
  formData.append("start_date", start_date);
  formData.append("end_date", end_date);


  return dispatch => {
    axios
      .post(`${SERVER}/timesheet/export/file`, formData, {
        // params: params,
        headers: headers,
        responseType: 'blob'
      })
      .then(res => {
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res.data)
        FileDownload(res.data, 'Xuất kết công.xlsx' );
        callback(res.data);
      })
      .catch(console.log);
  };
}

export const fetchfileTimesheet = (callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  return dispatch => {
    axios
      .get(`${SERVER}/timesheet/fetchfile`, {
        // params: params,
        headers: headers,
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