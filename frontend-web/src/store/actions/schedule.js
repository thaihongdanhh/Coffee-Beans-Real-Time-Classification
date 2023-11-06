import axios from "axios";
import { param } from "jquery";
import {SERVER} from "../constants/config";
import jwtDecode from 'jwt-decode'
export const fetchAppointment = (is_hr,start_date, end_date, callback) => {
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
      employee_code,
      is_hr,
      is_manager,
      start_date, 
      end_date,    
    }

    return dispatch => {
      axios
        .get(`${SERVER}/appointment/fetch`, {          
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
export const fetchAppointmentForm = (callback) => {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("jwtToken"),
      fingerprint: "123456",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    };          

    return dispatch => {
      axios
        .get(`${SERVER}/appointment/fetch/form`, {          
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

export const fetchAppointmentDetails = (appointment_code, callback) => {
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
      appointment_code   
    }

    return dispatch => {
      axios
        .get(`${SERVER}/appointment/fetch/details`, {          
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

export const fetchAppointmentRegister = (callback) => {
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


    return dispatch => {
      axios
        .get(`${SERVER}/appointment/fetch/register`, {          
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

export const insertAppointmentDetails = (data, callback) => {
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
        .post(`${SERVER}/appointment/insert/details`,{
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

  export const insertAppointmentForm = (data, callback) => {
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
        .post(`${SERVER}/appointment/insert/register`,{
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
export const updateAppointmentStatus = (
    appointment_code,
    status,
    code,
    name,
    reason,
    callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };  

    const params = {
        appointment_code,
        status,
        code,
        name ,
        reason
    }
  
    return dispatch => {
      axios
        .get(`${SERVER}/appointment/update/status`,{
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