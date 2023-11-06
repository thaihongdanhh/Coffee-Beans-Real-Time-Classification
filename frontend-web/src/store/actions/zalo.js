import axios from "axios";
import {SERVER} from "../constants/config";
import jwtDecode from 'jwt-decode'
export const fetchZaloGroup = (callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };  
  
    return dispatch => {
      axios
        .get(`${SERVER}/zalogroup/fetch`,{
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

export const insertZaloGroup = (group_code, group_name, description, callback) => {
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
      group_code,
      group_name,
      description
    }
  
    return dispatch => {
      axios
        .get(`${SERVER}/zalogroup/insert`,{
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

export const deleteZaloGroup = (group_code, callback) => {
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
      group_code        
    }
  
    return dispatch => {
      axios
        .get(`${SERVER}/zalogroup/delete`,{
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

export const fetchZaloFollower = (callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };  
  
    return dispatch => {
      axios
        .get(`${SERVER}/zalofollower/fetch`,{
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

export const updateZaloFollower = (params, callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };  
    const decoded = jwtDecode(localStorage.jwtToken)
    const EditBy = decoded.employee_code

    const formData= new FormData();
    formData.append('EditBy',EditBy)
    formData.append("user_id",params.user_id)
    formData.append("employee_code",params.employee_code)
    formData.append("group_in_charge_id",params.group_in_charge_id)
  
    return dispatch => {
      axios
        .post(`${SERVER}/zalofollower/update`,formData,{
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

export const fetchReportType = (callback) => {
  const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("jwtToken"),
      fingerprint: "123456",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    };  

  return dispatch => {
    axios
      .get(`${SERVER}/zaloreport/fetch/type`,{
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

export const fetchReport = (callback) => {
  const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("jwtToken"),
      fingerprint: "123456",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    };  

  return dispatch => {
    axios
      .get(`${SERVER}/zaloreport/fetch`,{
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

export const insertZaloReport = (params, callback) => {
  const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("jwtToken"),
      fingerprint: "123456",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    };  

  const formData= new FormData();
  formData.append("report_code",params.report_code)
  formData.append("report_name",params.report_name)
  formData.append("message",params.message)
  formData.append("report_type_code",params.report_type_code)
  formData.append("start_date",params.start_date)
  formData.append("end_date",params.end_date)
  formData.append("created_by",params.created_by)
  formData.append("group_in_charge_id",params.group_in_charge_id)
  formData.append("send_time",params.send_time)
  formData.append("schedule_type",params.schedule_type)

  return dispatch => {
    axios
      .post(`${SERVER}/zaloreport/insert`,formData,{
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


export const deleteZaloReport = (params, callback) => {
  const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("jwtToken"),
      fingerprint: "123456",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    };  
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code

  const formData= new FormData();
  formData.append("EditBy",EditBy)
  formData.append("report_code",params.report_code)

  return dispatch => {
    axios
      .post(`${SERVER}/zaloreport/delete`,formData,{
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