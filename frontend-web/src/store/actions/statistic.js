import { LOGIN_USER, GET_ERRORS } from "../constants/user";
import {SERVER} from "../constants/config"
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwtDecode from "jwt-decode";

const sign = require('jwt-encode');

const secret = "ts6nJu7TGes*og$C63NKR412zVhtXsiw5Zd$LC7tk$B^6%WXU1";

const data = {
  type: 'browser',
  name: 'HRAI',
  time: Math.floor(Date.now() / 1000)
};

const jwt = sign(data, secret);

export const fetchStatisticTraffic = (working_date, callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };  

    const params = {
      working_date
    }
  
    return dispatch => {
      axios
        .get(`${SERVER}/statistic/traffic`,{
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

  export const fetchStatisticTrafficPivot = (working_date, callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };  

    const params = {
      working_date
    }
  
    return dispatch => {
      axios
        .get(`${SERVER}/statistic/trafficpivot`,{
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

  export const fetchStatisticTime = (callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };  

      return dispatch => {
      axios
        .get(`${SERVER}/statistic/time`,{
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

  export const fetchStatisticDept = (callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };  

      return dispatch => {
      axios
        .get(`${SERVER}/statistic/department`,{
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

  export const fetchStatisticHC = (callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };  

      return dispatch => {
      axios
        .get(`${SERVER}/statistic/headcount`,{
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


export const fetchDashboardDepartment = (callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };  

      return dispatch => {
      axios
        .get(`${SERVER}/dashboard/department`,{
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

  export const fetchDashboardDevice = (callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };  

      return dispatch => {
      axios
        .get(`${SERVER}/dashboard/device`,{
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

  export const fetchDashboardAbsent = (callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };  

      return dispatch => {
      axios
        .get(`${SERVER}/dashboard/absent`,{
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

  export const fetchDashboardOverview = (callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };  

      return dispatch => {
      axios
        .get(`${SERVER}/dashboard/overview`,{
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

  export const fetchDepartmentStatistic = (callback) => {
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
            company_code
          }
  
          axios
            .get(`${SERVER}/visualize/department`, {
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

  export const fetchTimekeepingStatistic = (callback) => {
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
            company_code
          }
  
          axios
            .get(`${SERVER}/visualize/timekeeping`, {
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