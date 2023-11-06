import axios from "axios";
import {SERVER} from "../constants/config";
import jwtDecode from 'jwt-decode'
export const fetchPartner = (callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };  
    return dispatch => {
      axios
        .get(`${SERVER}/partner/fetch`,{
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
// chưa xử lý
  export const insertPartner = (Avatar, params, callback) => {
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
    const decoded = jwtDecode(localStorage.jwtToken)
    const EditBy = decoded.employee_code

    const formData = new FormData();
    formData.append("EditBy",EditBy);
    formData.append("file", base64Data);
    formData.append("PartnerName", params.PartnerName);
    formData.append("PartnerCode", params.PartnerCode);
    formData.append("PartnerPhone", params.PartnerPhone);
    formData.append("IdentifyCard", params.PartnerID);
    formData.append("Reason", params.PartnerReason);
    formData.append("Company", params.PartnerCompany);
      
    return dispatch => {
      axios
        .post(`${SERVER}/partner/insert`,formData,{
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
// chưa xử lý
  export const updatePartner = (base64Data, params, callback) => {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("jwtToken"),
      fingerprint: "123456",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    };          

  
    const formData = new FormData();
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