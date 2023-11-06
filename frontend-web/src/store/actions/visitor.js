import axios from "axios";
import {SERVER} from "../constants/config";
import jwtDecode from 'jwt-decode'
// import { useJwt } from "react-jwt";
const sign = require('jwt-encode');
const secret = "ts6nJu7TGes*og$C63NKR412zVhtXsiw5Zd$LC7tk$B^6%WXU1";
const data = {
  type: 'browser',
  name: 'HRAI',
  time: Math.floor(Date.now() / 1000)
};
const jwt = sign(data, secret);

export const fetchVisitorDetail = (CompanyCode, VisitorCode, callback) => {
  // const headers = {
  //     "Content-Type": "multipart/form-data",
  //     Authorization: localStorage.getItem("jwtToken"),
  //     fingerprint: "123456",
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  //   };        

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
        company_code: CompanyCode,
        visitor_code: VisitorCode 
      }

      axios
        .get(`${SERVER}/visitor/fetch/detail`, {
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

export const fetchVisitor = (callback) => {
    // const headers = {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: localStorage.getItem("jwtToken"),
    //     fingerprint: "123456",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    //   };        

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

        const params = { company_code }

        axios
          .get(`${SERVER}/visitor/fetch`, {
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

  export const deleteVisitor = (VisitorCode, callback) => {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("jwtToken"),
      fingerprint: "123456",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    };
    const decoded = jwtDecode(localStorage.jwtToken)
    const company_code = decoded.company_code
  
    const formData = new FormData()
    formData.append('visitor_code', VisitorCode)
    formData.append('company_code', company_code)
  
    return dispatch => {
      axios
        .post(`${SERVER}/visitor/delete`, formData, {
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

  export const insertVisitor = (Avatar, params, callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };  

    const base64Data = Avatar.replace(/^data:image\/png;base64,/,"")
    // const buffer = Buffer.from(Avatar, "base64").toString('binary')
    // console.log(buffer)

    // console.log(params)
    //console.log(base64Data)
    const decoded = jwtDecode(localStorage.jwtToken)
    const EditBy = decoded.employee_code
    const company_code = decoded.company_code

    const formData = new FormData();
    formData.append("EditBy",EditBy);
    formData.append("file", base64Data);
    formData.append("VisitorName", params.VisitorName);
    formData.append("VisitorCode", params.VisitorCode);
    formData.append("VisitorPhone", params.VisitorPhone);
    formData.append("IdentifyCard", params.VisitorID);
    formData.append("Reason", params.VisitorReason);
    formData.append("Company", params.VisitorCompany);
    formData.append('company_code', company_code)
      
    return dispatch => {
      axios
        .post(`${SERVER}/visitor/insert`,formData,{
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

  export const updateVisitor = (base64Data, params, callback) => {
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
    formData.append("file", base64Data);
    formData.append("VisitorName", params.VisitorName);
    formData.append("VisitorCode", params.VisitorCode);
    formData.append("VisitorPhone", params.VisitorPhone);
    formData.append("IdentifyCard", params.IdentifyCard);
    formData.append("Reason", params.Reason);
    formData.append("Company", params.Company);

    return dispatch => {
      axios
        .post(`${SERVER}/visitor/update`, formData, {
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
  
  export const fetchAppointmentCode = (company_code, callback) => {
    // console.log(jwt);
    // ipString
    // device
    // os
    // userAgent
    // isMobile
    // userAgentDisplay
    // userAgentRaw  
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
            company_code
          }
          axios
            .get(`${SERVER}/appointment/qrcode`, {
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

export const checkAppointmentCode = (appointment_code, callback) => {
  // console.log(jwt);
  // ipString
  // device
  // os
  // userAgent
  // isMobile
  // userAgentDisplay
  // userAgentRaw  
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

        const formData = new FormData();
        formData.append("appointment_code", appointment_code);
        axios
          .post(`${SERVER}/company/speccode/check`, formData, {
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

export const checkQRCodeStudent = (qr_code, callback) => {
  // console.log(jwt);
  // ipString
  // device
  // os
  // userAgent
  // isMobile
  // userAgentDisplay
  // userAgentRaw  
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

        const formData = new FormData();
        formData.append("qr_code", qr_code);
        axios
          .post(`${SERVER}/company/speccode/check_student`, formData, {
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

export const fetchMeetPlan = (start_date, end_date, callback) => {
    // const headers = {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: localStorage.getItem("jwtToken"),
    //     fingerprint: "123456",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    //   };        

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
        const params = {
          start_date, end_date, company_code
        }
        axios
          .get(`${SERVER}/meet_plan/fetch`, {
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