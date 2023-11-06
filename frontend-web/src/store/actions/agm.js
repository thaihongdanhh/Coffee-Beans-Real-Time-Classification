import axios from "axios";
import { param } from "jquery";
import { SERVER, SERVER_TEST } from "../constants/config";
import jwtDecode from 'jwt-decode'
import FileDownload from 'js-file-download';


export const fetchTransportGoods = (type ,start_date, end_date, callback) => {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("jwtToken"),
      fingerprint: "123456",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    };          
    const params = {
      type,
      start_date, 
      end_date,    
    }

    return dispatch => {
      axios
        .get(`${SERVER}/search/transportgoods/fetch_options`, {          
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

export const excelTransportGoods = (gate, classification,type ,start_date, end_date, callback) => {
  const headers = {
    // "Content-Type": "application/octet-stream", // or Content-type: "application/vnd.ms-excel"
    "Content-type": "application/vnd.ms-excel",
    // "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };          

  const decoded = jwtDecode(localStorage.jwtToken)
  const employee_code = decoded.employee_code

  const params = {
    employee_code,
    gate,
    classification,
    type,
    start_date, 
    end_date,    
  }

  let name=""
  if (type==='1,2'){
    name = 'Dữ liệu nhập hàng.xlsx'
  } else if (type==='3,4'){
    name = 'Dữ liệu xuất hàng.xlsx'
  }
    

  return dispatch => {
    axios
      .get(`${SERVER}/search/transportgoods/excel`, {          
        headers: headers,
        params: params,
        responseType: 'blob'
      })
      .then(res => {
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res)
        FileDownload(res.data, name );        
        callback(res.data);
      })
      .catch(console.log);
  };    
} 

export const fetchConnectWork = (start_date, end_date, callback) => {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("jwtToken"),
      fingerprint: "123456",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    };          

    const params = {
      start_date, 
      end_date,    
    }

    return dispatch => {
      axios
        .get(`${SERVER}/search/connectwork/fetch_options`, {          
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


export const fetchVgm = (start_date, end_date,  callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };          

  const params = {
    start_date, 
    end_date,    
  }

  return dispatch => {
    axios
      .get(`${SERVER}/vgm/fetch`, {          
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


export const fetchVgmWeight = (start_date, end_date, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };          
  const params = {
    start_date, 
    end_date,    
  }

  return dispatch => {
    axios
      .get(`${SERVER}/search/vgm/fetch_options`, {          
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

export const excelVgm = (cong, classification,start_date, end_date, callback) => {
  const headers = {
    // "Content-Type": "application/octet-stream", // or Content-type: "application/vnd.ms-excel"
    "Content-type": "application/vnd.ms-excel",
    // "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };          

  const decoded = jwtDecode(localStorage.jwtToken)
  const employee_code = decoded.employee_code

  const params = {
    cong,
    classification,
    start_date, 
    end_date,    
  }

  return dispatch => {
    axios
      .get(`${SERVER}/search/vgm/excel`, {          
        headers: headers,
        params: params,
        responseType: 'blob'
      })
      .then(res => {
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res)
        FileDownload(res.data, 'DuLieuTramCan.xlsx');        
        callback(res.data);
      })
      .catch(console.log);
  };    
} 

export const fetchFinishedGoods = (start_date, end_date, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };          
  const params = {
    start_date, 
    end_date,    
  }

  return dispatch => {
    axios
      .get(`${SERVER}/search/finishedgoods/fetch_options`, {          
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


export const excelFinishedGoods = (status,start_date, end_date, callback) => {
  const headers = {
    // "Content-Type": "application/octet-stream", // or Content-type: "application/vnd.ms-excel"
    "Content-type": "application/vnd.ms-excel",
    // "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };          

  const decoded = jwtDecode(localStorage.jwtToken)
  const employee_code = decoded.employee_code

  const params = {
    status,
    start_date, 
    end_date,    
  }

  return dispatch => {
    axios
      .get(`${SERVER}/search/finishedgoods/excel`, {          
        headers: headers,
        params: params,
        responseType: 'blob'
      })
      .then(res => {
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res)
        FileDownload(res.data, 'DuLieuKhoThanhPham.xlsx');        
        callback(res.data);
      })
      .catch(console.log);
  };    
} 


export const fetchImportGoods = (start_date, end_date, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };          
  const params = {
    start_date, 
    end_date,    
  }

  return dispatch => {
    axios
      .get(`${SERVER}/search/importgoods/fetch_options`, {          
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


export const excelImportGoods = (tick,start_date, end_date, callback) => {
  const headers = {
    // "Content-Type": "application/octet-stream", // or Content-type: "application/vnd.ms-excel"
    "Content-type": "application/vnd.ms-excel",
    // "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };          

  const decoded = jwtDecode(localStorage.jwtToken)
  const employee_code = decoded.employee_code

  const params = {
    tick,
    start_date, 
    end_date,    
  }

  return dispatch => {
    axios
      .get(`${SERVER}/search/importgoods/excel`, {          
        headers: headers,
        params: params,
        responseType: 'blob'
      })
      .then(res => {
        // res.data.sizePerPage = sizePerPage
        // res.data.page = page
        // console.log(res)
        FileDownload(res.data, 'DuLieuKhoCungUng.xlsx');        
        callback(res.data);
      })
      .catch(console.log);
  };    
} 