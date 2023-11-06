import axios from "axios";
import { SERVER } from "../constants/config";
import { GET_ERRORS } from "../constants/user";
import jwtDecode from 'jwt-decode'
import { param } from "jquery";

const sign = require('jwt-encode');

const secret = "ts6nJu7TGes*og$C63NKR412zVhtXsiw5Zd$LC7tk$B^6%WXU1";

const data = {
  type: 'browser',
  name: 'HRAI',
  time: Math.floor(Date.now() / 1000)
};

const jwt = sign(data, secret);

export const fetchDevice = (callback) => {
    // const headers = {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: localStorage.getItem("jwtToken"),
    //     fingerprint: "123456",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    // };

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
        const admin_system = decoded.admin_system
        const params = {admin_system}
        axios
          .get(`${SERVER}/device/fetch`, {
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


export const fetchLatLong = (EmpCode, callback) => {
  const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("jwtToken"),
      fingerprint: "123456",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const params = {
    EmpCode
  }
  return dispatch => {
      axios
          .get(`${SERVER}/device/check/latlong`, {
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


export const updateDevice = (device_code, device_name, callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    };
    const decoded = jwtDecode(localStorage.jwtToken)
    const EditBy = decoded.employee_code
    const admin_system = decoded.admin_system

    const formData = new FormData()
    formData.append('EditBy', EditBy)
    formData.append('admin_system', admin_system)
    formData.append('device_code', device_code)
    formData.append('device_name', device_name)

    console.log(formData)
    return dispatch => {
        axios
            .post(`${SERVER}/device/update`, formData, {
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


export const deleteDevice = (data, callback) => {
    const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("jwtToken"),
        fingerprint: "123456",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    };
    const decoded = jwtDecode(localStorage.jwtToken)
    const EditBy = decoded.employee_code
    data.EditBy= EditBy
    const params = data

    return dispatch => {
        axios
            .post(`${SERVER}/device/delete`, {
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

export const fetchFaceDetector = (Avatar, callback) => {
    // const headers = {
    //     "Content-Type": "multipart/form-data",
    //   //Authorization: localStorage.getItem("jwtToken"),
    //     //fingerprint: "123456",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    //   };  
          
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

        const base64Data = (Avatar.replace(/^data:image\/png;base64,/, "")).replace(/^data:image\/png;base64,/, "")
        // const buffer = Buffer.from(Avatar, "base64").toString('binary')
        // console.log(buffer)

        // console.log(params)

        const formData = new FormData();
        formData.append("file", base64Data);

        axios
          .post(`${SERVER}/device/facedectector`, formData, {
            headers: headers
          })
          .then(res => {
            // res.data.sizePerPage = sizePerPage
            // res.data.page = page
            // console.log(res.data)
            callback(res.data);
          })
          .catch(err => {
            // console.log(err.response.data.detail)
            // const { errors } = this.props            
            // alert(err.response.data.detail.image)
            console.log(err)
            // dispatch({
            //   type: GET_ERRORS,
            //   payload: err.response.data.detail
            // });
          });
      })
  };

} 

  export const fetchFaceRegister = (Avatar, params, callback) => {
    // const headers = {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: localStorage.getItem("jwtToken"),
    //     fingerprint: "123456",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    //   };  
      
    return dispatch => {
      axios.get("https://api.bigdatacloud.net/data/client-info")
      .then(res => {
        const ip_info = res.data
        const headers = {
          "Content-Type": "multipart/form-data",
          fingerprint: "123456",
          Authorization: jwt,
          "ip": ip_info['ipString'],
          "device_ip": ip_info['device'],
          "os": ip_info['os'],
          "userAgent": ip_info['userAgent'],
          "isMobile": ip_info['isMobile'],
          "userAgentDisplay": ip_info['userAgentDisplay'],
          "userAgentRaw": ip_info['userAgentRaw'],
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
        };

        const base64Data = Avatar.replace(/^data:image\/(png|jpeg);base64,/,"")    

        // const params = params
        // const buffer = Buffer.from(Avatar, "base64").toString('binary')
        // console.log(buffer)
    
        // console.log(params)
    
        const formData = new FormData();
        formData.append("file", base64Data);
        formData.append("name", params.name);
        formData.append("idcard", params.idcard);
        formData.append("gender", params.gender);
        formData.append("device", params.device);
        formData.append("is_emp", params.is_emp);
        formData.append("is_permission", params.is_permission);
        formData.append("start_date", params.start_date);
        formData.append("end_date", params.end_date);

        axios
        .post(`${SERVER}/device/faceregister`,formData,{
          headers: headers
        })
        .then(res => {
          // res.data.sizePerPage = sizePerPage
          // res.data.page = page
          // console.log(res.data)
          callback(res.data);
        })
        .catch(err => {
            // console.log(err.response.data.detail)
            // const { errors } = this.props            
            alert(err.response.data.detail.image)
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data.detail
            });
          });
      })      
    };
  
  } 

  export const fetchVisitRegister = (Avatar, params, callback) => {
    // const headers = {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: localStorage.getItem("jwtToken"),
    //     fingerprint: "123456",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    //   };  

    return dispatch => {
      axios.get("https://api.bigdatacloud.net/data/client-info")
        .then(res => {
          const ip_info = res.data
          const headers = {
            "Content-Type": "multipart/form-data",
            fingerprint: "123456",
            Authorization: jwt,
            "ip": ip_info['ipString'],
            "device_ip": ip_info['device'],
            "os": ip_info['os'],
            "userAgent": ip_info['userAgent'],
            "isMobile": ip_info['isMobile'],
            "userAgentDisplay": ip_info['userAgentDisplay'],
            "userAgentRaw": ip_info['userAgentRaw'],
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
          };

          const base64Data = Avatar.replace(/^data:image\/(png|jpeg);base64,/, "")
          const formData = new FormData();
          formData.append("file", base64Data);
          formData.append("VisitorPhone", params.VisitorPhone);
          formData.append("VisitorName", params.VisitorName);
          formData.append("IdentifyCard", params.IdentifyCard);
          formData.append("device", params.device);
          formData.append("Reason", params.Reason);
          formData.append("Company", params.Company);
          formData.append("is_permission", params.is_permission);
          formData.append("start_date", params.start_date);
          formData.append("end_date", params.end_date);

          axios
            .post(`${SERVER}/device/visitregister`, formData, {
              headers: headers
            })
            .then(res => {
              // res.data.sizePerPage = sizePerPage
              // res.data.page = page
              // console.log(res.data)
              callback(res.data);
            })
            .catch(err => {
              // console.log(err.response.data.detail)
              // const { errors } = this.props            
              alert(err.response.data.detail.image)
              dispatch({
                type: GET_ERRORS,
                payload: err.response.data.detail
              });
            });
        })
    };

  }

  

  
  export const fetchFaceFetch = (callback) => {
    // const headers = {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: localStorage.getItem("jwtToken"),
    //     fingerprint: "123456",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    //   };  

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

          axios
            .get(`${SERVER}/device/facefetch`, {
              headers: headers
            })
            .then(res => {
              // res.data.sizePerPage = sizePerPage
              // res.data.page = page
              // console.log(res.data)
              callback(res.data);
            })
            .catch(err => {
              console.log(err)
              // const { errors } = this.props            
              // alert(err.response.data.detail.image)
              // dispatch({
              //   type: GET_ERRORS,
              //   payload: err.response.data.detail
              // });
            });
        })
    };

  } 

  export const fetchFaceReload = (callback) => {
    // const headers = {
    //     "Content-Type": "multipart/form-data",
    //     Authorization: localStorage.getItem("jwtToken"),
    //     fingerprint: "123456",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    //   };  
            
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

        axios
        .get(`${SERVER}/device/facereload`,{
          headers: headers
        })
        .then(res => {
          // res.data.sizePerPage = sizePerPage
          // res.data.page = page
          // console.log(res.data)
          callback(res.data);
        })
        .catch(err => {
            console.log(err)
            // const { errors } = this.props            
            // alert(err.response.data.detail.image)
            // dispatch({
            //   type: GET_ERRORS,
            //   payload: err.response.data.detail
            // });
          });
      })      
    };
  } 

  export const checkFaceStudent = (face, EmpCode, lat, lng, callback) => {
    // const headers = {
    //   "Content-Type": "multipart/form-data",
    //   Authorization: localStorage.getItem("jwtToken"),
    //   fingerprint: "123456",
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    // };
  
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
  
          const base64Data = face.replace(/^data:image\/(png|jpeg);base64,/, "")
  
          const formData = new FormData();
          formData.append("file", base64Data);
          formData.append("EmpCode", EmpCode);
          formData.append("lat", lat);
          formData.append("lng", lng);
  
          console.log(EmpCode)
  
          axios
            .post(`${SERVER}/device/checkface/student`, formData, {
              headers: headers
            })
            .then(res => {
              // res.data.sizePerPage = sizePerPage
              // res.data.page = page
              // console.log(res.data)
              callback(res.data);
            })
            .catch(err => {
              console.log(err)
              // const { errors } = this.props            
              // alert(err.response.data.detail.image)
              // dispatch({
              //   type: GET_ERRORS,
              //   payload: err.response.data.detail
              // });
            });
        })
    };
  
  }

export const checkFace = (face, EmpCode, lat, lng, callback) => {
  // const headers = {
  //   "Content-Type": "multipart/form-data",
  //   Authorization: localStorage.getItem("jwtToken"),
  //   fingerprint: "123456",
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  // };

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

        const base64Data = face.replace(/^data:image\/(png|jpeg);base64,/, "")

        const formData = new FormData();
        formData.append("file", base64Data);
        formData.append("EmpCode", EmpCode);
        formData.append("lat", lat);
        formData.append("lng", lng);

        console.log(EmpCode)

        axios
          .post(`${SERVER}/device/checkface`, formData, {
            headers: headers
          })
          .then(res => {
            // res.data.sizePerPage = sizePerPage
            // res.data.page = page
            // console.log(res.data)
            callback(res.data);
          })
          .catch(err => {
            console.log(err)
            // const { errors } = this.props            
            // alert(err.response.data.detail.image)
            // dispatch({
            //   type: GET_ERRORS,
            //   payload: err.response.data.detail
            // });
          });
      })
  };

}


  export const checkFaceLogin = (face, session, callback) => {
    // const headers = {
    //   "Content-Type": "multipart/form-data",
    //   Authorization: localStorage.getItem("jwtToken"),
    //   fingerprint: "123456",
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    // };

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
          const base64Data = (face.replace(/^data:image\/png;base64,/, "")).replace(/^data:image\/png;base64,/, "")//.replace(/^data:image\/jpeg;base64,\/9j\//,"")    

          const formData = new FormData();
          formData.append("file", base64Data);
          formData.append('session', session)

          axios
            .post(`${SERVER}/user/login/face`, formData, {
              headers: headers
            })
            .then(res => {
              // res.data.sizePerPage = sizePerPage
              // res.data.page = page
              // console.log(res.data)
              callback(res.data);
            })
            .catch(err => {
              console.log(err)
              // const { errors } = this.props            
              // alert(err.response.data.detail.image)
              // dispatch({
              //   type: GET_ERRORS,
              //   payload: err.response.data.detail
              // });
            });
        })
    };

  }

  export const checkFaceOut = (face,EmpCode, lat, lng, callback) => {
    // const headers = {
    //   "Content-Type": "multipart/form-data",
    //   Authorization: localStorage.getItem("jwtToken"),
    //   fingerprint: "123456",
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    // };    


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
          const base64Data = face.replace(/^data:image\/(png|jpeg);base64,/, "")

          const formData = new FormData();
          formData.append("file", base64Data);
          formData.append("EmpCode", EmpCode);
          formData.append("lat", lat);
          formData.append("lng", lng);

          axios
            .post(`${SERVER}/device/checkface_out`, formData, {
              headers: headers
            })
            .then(res => {
              // res.data.sizePerPage = sizePerPage
              // res.data.page = page
              // console.log(res.data)
              callback(res.data);
            })
            .catch(err => {
              console.log(err)
              // const { errors } = this.props            
              // alert(err.response.data.detail.image)
              // dispatch({
              //   type: GET_ERRORS,
              //   payload: err.response.data.detail
              // });
            });
        })
    };

  }
  
export const updateFaceRegister = (Avatar, company_code, ObjType, EmpCode, EmpName, callback) => {
  // const headers = {
  //     "Content-Type": "multipart/form-data",
  //     //Authorization: localStorage.getItem("jwtToken"),
  //     //fingerprint: "123456",
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  //   };

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
        const base64Data = Avatar.replace(/^data:image\/(png|jpeg);base64,/, "")
        const formData = new FormData();
        formData.append("EditBy", EmpCode);
        formData.append('company_code', company_code);
        formData.append("file", base64Data);
        formData.append("EmpCode", EmpCode);
        formData.append("EmpName", EmpName);
        formData.append("ObjType", ObjType);


        axios
          .post(`${SERVER}/device/faceregisterpub`, formData, {
            headers: headers
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

export const updateFaceRegisterStudent = (Avatar, company_code, ObjType, EmpCode, EmpName, callback) => {
  // const headers = {
  //     "Content-Type": "multipart/form-data",
  //     //Authorization: localStorage.getItem("jwtToken"),
  //     //fingerprint: "123456",
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  //   };

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
        const base64Data = Avatar.replace(/^data:image\/(png|jpeg);base64,/, "")
        const formData = new FormData();
        formData.append("EditBy", EmpCode);
        formData.append('company_code', company_code);
        formData.append("file", base64Data);
        formData.append("EmpCode", EmpCode);
        formData.append("EmpName", EmpName);
        formData.append("ObjType", ObjType);


        axios
          .post(`${SERVER}/device/faceregisterpub/student`, formData, {
            headers: headers
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


export const updateFaceRegisterVisitor = (Avatar, VisitorName, VisitorID, Company, CompanyCode, TimePlan, ReasonPlan, AppointmentCode, callback) => {
  // const headers = {
  //     "Content-Type": "multipart/form-data",
  //     //Authorization: localStorage.getItem("jwtToken"),
  //     //fingerprint: "123456",
  //     "Access-Control-Allow-Origin": "*",
  //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  //   };

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
        const base64Data = Avatar.replace(/^data:image\/(png|jpeg);base64,/, "")
        const formData = new FormData();
        formData.append("file", base64Data);
        formData.append("VisitorName", VisitorName);
        formData.append("VisitorID", VisitorID);
        formData.append("Company", Company);
        formData.append("TimePlan", TimePlan);
        formData.append("ReasonPlan", ReasonPlan);
        formData.append("AppointmentCode", AppointmentCode);
        formData.append("CompanyCode", CompanyCode);


        axios
          .post(`${SERVER}/device/faceregisterpub/visitor`, formData, {
            headers: headers
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