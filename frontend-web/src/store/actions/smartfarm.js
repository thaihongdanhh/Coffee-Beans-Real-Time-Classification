import { LOGIN_USER, GET_ERRORS } from "../constants/user";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwtDecode from "jwt-decode";
import {SERVER} from "../constants/config";

export const fetchArea = (callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };  
  
    return dispatch => {
      axios
        .get(`${SERVER}/hass/iot/area`,{
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

  export const fetchSensor = (callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };  
  
    return dispatch => {
      axios
        .get(`${SERVER}/hass/iot/sensor`,{
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

  export const fetchSensorHistory = (sensorid, start_date, end_date, callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };  

    const params = {
        'sensorid': sensorid,
        'start_date': start_date,
        'end_date': end_date,        
    }
  
    return dispatch => {
      axios
        .get(`${SERVER}/hass/iot/sensor/history`,{
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

  export const fetchSensorIDHistory = (sensorid, callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };  

    const params = {
        'sensorid': sensorid,
    }
  
    return dispatch => {
      axios
        .get(`${SERVER}/hass/iot/sensor/history/id`,{
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