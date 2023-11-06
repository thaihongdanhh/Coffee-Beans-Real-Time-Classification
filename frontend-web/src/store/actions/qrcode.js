import axios from "axios";
import { SERVER } from "../constants/config";
import { GET_ERRORS } from "../constants/user";
import jwtDecode from 'jwt-decode'

export const fetchQRCode = (callback) => {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("jwtToken"),
      fingerprint: "123456",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    };
  
    return dispatch => {
      axios
        .get(`${SERVER}/qrcode/fetch`, {
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

export const updateQRCode = (Avatar, EmpCode, callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };
    
      const base64Data = Avatar.replace(/^data:image\/(png|jpeg);base64,/,"")    

      const decoded = jwtDecode(localStorage.jwtToken)
      const EditBy = decoded.employee_code
      const formData = new FormData();
      formData.append("EditBy",EditBy);
      formData.append("file", base64Data);
      formData.append("EmpCode", EmpCode);
    
      // console.log(params)
      // console.log(base64Data)
    
      return dispatch => {
        axios
          .post(`${SERVER}/qrcode/register`, formData, {
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

export const updateQRCodeHis = (Avatar, EmpCode, callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };
    
      const base64Data = Avatar.replace(/^data:image\/(png|jpeg);base64,/,"")    

      const decoded = jwtDecode(localStorage.jwtToken)
      const EditBy = decoded.employee_code
      const formData = new FormData();
      formData.append("EditBy",EditBy);
      formData.append("file", base64Data);
      formData.append("EmpCode", EmpCode);
    
      // console.log(params)
      // console.log(base64Data)
    
      return dispatch => {
        axios
          .post(`${SERVER}/qrcode/register/his`, formData, {
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

export const fetchQRCodeHis = (callback) => {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("jwtToken"),
      fingerprint: "123456",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    };
  
    return dispatch => {
      axios
        .get(`${SERVER}/qrcode/historyfetch`, {
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