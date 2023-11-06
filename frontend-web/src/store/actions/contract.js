import axios from "axios";
import {SERVER} from "../constants/config";
// import {RNFS} from 'react-native-fs';

export const fetchContract = (callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };  
  
    return dispatch => {
      axios
        .get(`${SERVER}/contract/fetch`,{
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

  export const insertContract = (data, callback) => {
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
        .get(`${SERVER}/contract/insert`,{
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

//   export const updateContract = (dept_code, dept_name, callback) => {
//     const headers = {
//         "Content-Type": "multipart/form-data",
//         Authorization: localStorage.getItem("jwtToken"),
//         fingerprint: "123456",
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
//       };  

//     const params = {
//         dept_code,
//         dept_name
//     }
  
//     return dispatch => {
//       axios
//         .get(`${SERVER}/department/update`,{
//           params: params,
//           headers: headers
//         })
//         .then(res => {
//           // res.data.sizePerPage = sizePerPage
//           // res.data.page = page
//           // console.log(res.data)
//           callback(res.data);
//         })
//         .catch(console.log);
//     };
  
//   }

  export const deleteContract = (contract_type_code, callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };  

    const params = {
        contract_type_code        
    }
  
    return dispatch => {
      axios
        .get(`${SERVER}/contract/delete`,{
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

  export const fetchContractManagement = (callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };  
  
    return dispatch => {
      axios
        .get(`${SERVER}/contractmanagement/fetch`,{
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

  export const insertContractManagement = (data, callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
      };  

    const formData = new FormData();    
    const file = data.file
    
    // console.log(RNFS.DocumentDirectoryPath)
    // defaultPath = RNFS.DocumentDirectoryPath + '/undefined.txt';    

    if (file !== undefined && typeof (file) !== "string") {
      formData.append("file", data.file);
      formData.append("employee_code", data.employee_code);
      formData.append("contract_code", data.contract_code);
      formData.append("contract_type_code", data.contract_type_code);
      formData.append("description", data.description);
      formData.append("is_inactive_old", data.is_inactive_old);
      formData.append("start_date", data.start_date);
      formData.append("end_date", data.end_date);
      formData.append("created_by", data.created_by);

      return dispatch => {
        axios
          .post(`${SERVER}/contractmanagement/insert`, formData, {
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
    else {
      formData.append("employee_code", data.employee_code);
      formData.append("contract_code", data.contract_code);
      formData.append("contract_type_code", data.contract_type_code);
      formData.append("description", data.description);
      formData.append("is_inactive_old", data.is_inactive_old);
      formData.append("start_date", data.start_date);
      formData.append("end_date", data.end_date);
      formData.append("created_by", data.created_by);

      return dispatch => {
        axios
          .post(`${SERVER}/contractmanagement/insertnonfile`, formData, {
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
  
   
  
  }

export const deleteContractManagement = (employee_code, contract_code, created_by, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };

  const params = {
    employee_code,
    contract_code,
    created_by
  }

  return dispatch => {
    axios
      .get(`${SERVER}/contractmanagement/delete`, {
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
  }


}