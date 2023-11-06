import axios from "axios";
import { param } from "jquery";
import {SERVER} from "../constants/config";
import jwtDecode from 'jwt-decode'

export const fetchParking = (date, callback) => {
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
        .get(`${SERVER}/parking/fetchbydate`,{
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