import { LOGIN_USER, GET_ERRORS } from "../constants/user";
import {SERVER} from "../constants/config"
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwtDecode from "jwt-decode";

export const updateStudent = (profileStudent) => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: localStorage.getItem("jwtToken"),
      fingerprint: "123456"
    };
  
    // const params = {
    //   pageNo: page,
    //   size: sizePerPage * 3
    // }
    const paramsUpdateStudent = {
        profileStudent: profileStudent,
    };

    const token = localStorage.getItem("userLogin")
    setAuthToken(token);
    const decoded = jwtDecode(token);
    // console.log(decoded)

    const paramsInsertStudentLogs = {
      profileStudent: profileStudent,
      Action: "Update",
      User: decoded.email
  }

    // console.log(paramsInsertStudentLogs);
  
    return dispatch => {
      axios
        .post(`${SERVER}/api/users/updateStudent`, profileStudent, {
          params: paramsUpdateStudent,
          headers: headers
        })
        .then(res => {          
            
              axios
              .post(`${SERVER}/api/users/insertStudentLogs`, null, {
                params: paramsInsertStudentLogs,
                headers: headers
              })
              .then()
              .catch()

        })
        // .catch(console.log);
        .catch(err => {
          // console.log(large)
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          });
        });
    };
  };
  
  export const fetchDistinctTruong = (quan, callback) => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: localStorage.getItem("jwtToken"),
      fingerprint: "123456"
    };

    const params = {
      quan: quan
    }
  
    return dispatch => {
      axios
        .post(`${SERVER}/api/users/fetchDistinctTruong`, null, {
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

  export const fetchDistinctQuan = (callback) => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: localStorage.getItem("jwtToken"),
      fingerprint: "123456"
    };
  
    return dispatch => {
      axios
        .post(`${SERVER}/api/users/fetchDistinctQuan`, null, {
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

  export const fetchDistinctKhoi = (truong, callback) => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: localStorage.getItem("jwtToken"),
      fingerprint: "123456"
    };

    const params = {
      truong: truong
    }
  
    return dispatch => {
      axios
        .post(`${SERVER}/api/users/fetchDistinctKhoi`, null, {
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

  export const fetchDistinctLop = (truong, khoi, callback) => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: localStorage.getItem("jwtToken"),
      fingerprint: "123456"
    };

    const params = {
      truong: truong,
      khoi: khoi
    }
  
    return dispatch => {
      axios
        .post(`${SERVER}/api/users/fetchDistinctLop`, null, {
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

  export const UploadCSV = (formData, callback) => {
    const headers = {
      "Content-Type": "text/html",
      Authorization: localStorage.getItem("jwtToken"),
      fingerprint: "123456"
    };

    return dispatch => {
      axios
        .post(`${SERVER}/api/users/upload-csv`, formData , {
          headers: headers
        })
        .then(res => {
          // res.data.sizePerPage = sizePerPage
          // res.data.page = page
          // console.log(res.data)
          callback(res.data);
          alert("The file is successfully uploaded")
          // console.log(formData)
        })
        .catch(console.log);
    };
  
  }

  export const fetchUploadInfo = callback => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: localStorage.getItem("jwtToken"),
      fingerprint: "123456"
    };
  
    return dispatch => {
      axios
        .post(`${SERVER}/api/users/uploadInfo`, null, {
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
  };
  
  export const progressFileStudent = (FILE_ID,quan, truong, khoi, lop, callback) => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: localStorage.getItem("jwtToken"),
      fingerprint: "123456"
    };

    const params = {
      FILE_ID: FILE_ID,
      truong: truong,
      quan: quan,
      khoi: khoi,
      lop: lop
    };
  
    return dispatch => {
      axios
        .post(`${SERVER}/api/users/progressFileStudent`, null, {
          params: params,
          headers: headers
        })
        .then(res => {
          // res.data.sizePerPage = sizePerPage
          // res.data.page = page
          // console.log(res.data)
          callback(res.data);
          alert("The File is successfully processed")
        })
        .catch(console.log);
    };
  };