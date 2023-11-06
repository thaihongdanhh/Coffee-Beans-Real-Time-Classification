import { LOGIN_USER, GET_ERRORS, LOGOUT_USER } from "../constants/user";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwtDecode from "jwt-decode";
import {SERVER} from "../constants/config";
// import { data } from "jquery";
// import { useJwt } from "react-jwt";
const sign = require('jwt-encode');

const secret = "ts6nJu7TGes*og$C63NKR412zVhtXsiw5Zd$LC7tk$B^6%WXU1";

const data = {
  type: 'browser',
  name: 'HRAI',
  time: Math.floor(Date.now() / 1000)
};

const jwt = sign(data, secret);

export const changeAdminPass = (company_pass, callback) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
  };
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const is_hr = decoded.is_hr
  const company_username = decoded.username
  const company_code = decoded.company_code

  const formData = new FormData()
  formData.append('EditBy', EditBy)
  formData.append('is_hr', is_hr) 
  formData.append('company_username', company_username)
  formData.append('company_code', company_code)
  formData.append('company_pass',company_pass)
  //console.log(formData)

  return dispatch => {
    axios
      .post(`${SERVER}/role/useradmin/changepw`, formData, {
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

export const fetchNodeUserType = callback => {
  // const headers = {
  //   "Content-Type": "application/x-www-form-urlencoded",
  //   Authorization: localStorage.getItem("jwtToken"),
  //   fingerprint: "123456"
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
        const EditBy = decoded.employee_code
        const company_code = decoded.company_code

        const params = { company_code }


        axios
          .get(`${SERVER}/users/type/fetchnodes`, {
            headers: headers,
            params: params
          })
          .then(res => {

            callback(res.data);
          })
          .catch(console.log);
      })
  };
};

export const fetchAllUserPri = callback => {
  // const headers = {
  //   "Content-Type": "application/x-www-form-urlencoded",
  //   Authorization: localStorage.getItem("jwtToken"),
  //   fingerprint: "123456"
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
        const EditBy = decoded.employee_code
        const company_code = decoded.company_code

        const params = { company_code }

        axios
          .get(`${SERVER}/users/type/fetch`, {
            headers: headers,
            params: params
          })
          .then(res => {

            callback(res.data);
          })
          .catch(console.log);

      })
  };
};



export const insertUser = (username, password, user_type,employee_code, callback) => {
  const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("jwtToken"),
      fingerprint: "123456",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    };  
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const company_code = decoded.company_code
  
  const formData = new FormData()
  formData.append('EditBy', EditBy)
  formData.append('role_id', user_type)
  formData.append('username', username)
  formData.append('password', password)
  formData.append('employee_code', employee_code)
  formData.append('company_code', company_code)

  return dispatch => {
    axios
      .post(`${SERVER}/users/acc/insert`,formData,{
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


export const insertUserPri = (dataUserPri, callback) => {
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const company_code = decoded.company_code

  const formData = new FormData()
  formData.append('EditBy', EditBy)
  formData.append('role_id', dataUserPri.role_id)
  formData.append('role_name', dataUserPri.role_name)
  formData.append('role_description', dataUserPri.role_description)
  formData.append('dept_list_code', dataUserPri.dept_list_code)
  formData.append('access_list_id', dataUserPri.access_list_id)
  formData.append('office_list_code', dataUserPri.office_list_code)
  formData.append('company_code', company_code)

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  };

  return dispatch => {
    axios
      .post(`${SERVER}/users/type/insert`, formData, {
        headers: headers,
      })
      .then(res => {

        callback(res.data);
      })
      .catch(console.log);
  };
};


export const updateUserPW = (employee_code, password, callback) => {
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const company_code = decoded.company_code
  
  const formData = new FormData()
  formData.append('employee_code', employee_code)
  formData.append('password', password)
  formData.append('EditBy', EditBy)
  formData.append('company_code', company_code)
  
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  };

  // console.log(params)

  return dispatch => {
    axios
      .post(
        `${SERVER}/user/acc/updatepw`, formData,
        {
          headers: headers
        }
      )
      .then(res => {
        callback(res.data);
        // console.log(large)
        // history.push("/");
        // return <Redirect to='/users' />
      })
      .catch(err => {
        // console.log(large)
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  };
};


export const updateUserRole = (user_type,employee_code, callback) => {
  const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("jwtToken"),
      fingerprint: "123456",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE"
    };  
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const company_code = decoded.company_code
  
  
  const formData = new FormData()
  formData.append('EditBy', EditBy)
  formData.append('role_id', user_type)
  formData.append('employee_code', employee_code)
  formData.append('company_code', company_code)

  return dispatch => {
    axios
      .post(`${SERVER}/user/acc/updaterole`,formData,{
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


export const deactivateUser = (employee_code, callback) => {
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const company_code = decoded.company_code

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  };

  const formData = new FormData()
  formData.append('EditBy', EditBy)
  formData.append('employee_code', employee_code)
  formData.append('company_code', company_code)

  return dispatch => {
    axios
      .post(
        `${SERVER}/user/acc/deactivate`, formData,
        {
          headers: headers,
        }
      )
      .then(res => {
        callback(res.data);
        // console.log(large)
        // history.push("/");
        // return <Redirect to='/users' />
      })
      .catch(err => {
        // console.log(large)
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  };
};


export const activateUser = (employee_code, callback) => {
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const company_code = decoded.company_code

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  };

  const formData = new FormData()
  formData.append('EditBy', EditBy)
  formData.append('employee_code', employee_code)
  formData.append('company_code', company_code)

  return dispatch => {
    axios
      .post(
        `${SERVER}/user/acc/activate`, formData,
        {
          headers: headers,
        }
      )
      .then(res => {
        callback(res.data);
        // console.log(large)
        // history.push("/");
        // return <Redirect to='/users' />
      })
      .catch(err => {
        // console.log(large)
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  };
};


export const requestLoginUSer = userData => {
  // console.log(userData)


  // const headers = {
  //   "Content-Type": "application/x-www-form-urlencoded",
  //   Authorization: localStorage.getItem("jwtToken"),
  //   fingerprint: "123456",
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
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

        const params = {
          username: userData.username,
          password: userData.password,
          fingerprint: userData.fingerprint
        }

        axios
          .get(`${SERVER}/user/login`, {
            headers: headers,
            params: params
          })
          .then(res => {
            // console.log(res.data.detail)
            if (typeof res.data.detail !== "string") {
              const { token } = res.data.detail;
              localStorage.setItem("jwtToken", token);
              localStorage.setItem("userLogin", JSON.stringify(res.data.detail));
              // console.log('set Item Ok')
              setAuthToken(token);
              // console.log('set Token Ok')
              const decoded = jwtDecode(token);
              // console.log(decoded)    
              dispatch(actLoginUser(decoded));
              // console.log('decoded Ok')
              //   callback();
            } else {
              alert("Tài khoản hoặc mật khẩu sai gòi.");
            }
          })
          .catch(err => {
            // console.log(err.response.data.detail)
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data.detail
            });
          });
      })
  };
};

export const loginByEmpCode = userData => {
  // console.log(userData)
  const params = {
    emp_code: userData.employee_code,
    fingerprint: userData.fingerprint
  }
  console.log(userData)

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  };

  return dispatch => {
    axios
      .get(`${SERVER}/user/login/auto`, {
        headers: headers,
        params: params
      })
      .then(res => {
        // console.log(res.data.detail)
        if (typeof res.data.detail !== "string") {
          const { token } = res.data.detail;
          localStorage.setItem("jwtToken", token);
          localStorage.setItem("userLogin", JSON.stringify(res.data.detail));
          // console.log('set Item Ok')
          setAuthToken(token);          
          // console.log('set Token Ok')
          const decoded = jwtDecode(token);      
          // console.log(decoded)    
          dispatch(actLoginUser(decoded));
          // console.log('decoded Ok')
          //   callback();
        } else {
          alert("Tài khoản hoặc mật khẩu sai gòi.");
        }
      })
      .catch(err => {
        // console.log(err.response.data.detail)
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data.detail
        });
      });
  };
};





export const actLoginUser = decoded => {
  return {
    type: LOGIN_USER,
    payload: decoded
  };
};

export const registerInformation = (name,phone,email,company, callback) => {
  
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  };

  const formData = new FormData();
  formData.append("name",name);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("company", company);   

  return dispatch => {
    axios
      .post(
        `${SERVER}/information/register`, formData,
        {
          headers: headers,
        }
      )
      .then(res => {
        callback(res.data);
      })
      .catch(err => {
        console.log(err)
        // dispatch({
        //   type: GET_ERRORS,
        //   payload: err.response.data
        // });
      });
  };
}

export const registerUser = (userData, history, callback) => {
  const params = {
    username: userData.username,
    password: userData.password,
    employee_code: userData.employee_code,
    fingerprint: "123456",
    //email: userData.email,
    //full_name: userData.full_name,
    //phone: userData.phone,
    user_type: userData.user_type,
    //user_position: userData.user_position,
    //employee_name: userData.employee_name,
    //ManagerCode: userData.ManagerCode,
    //DeptCode: userData.DeptCode,
    //DeptInChargeCode: userData.DeptInChargeCode,
    EmpSelected: userData.EmpSelected
  }

  // console.log(userData)
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code

  const formData = new FormData();
  formData.append("EditBy",EditBy);
  formData.append("username", userData.username);
  formData.append("password", userData.password);
  formData.append("fingerprint", '123456');
  //formData.append("email", userData.email);
  //formData.append("phone", userData.phone);
  formData.append("user_type", userData.user_type);
  //formData.append("user_position", userData.user_position);
  //formData.append("employee_name", userData.employee_name);
  //formData.append("employee_code", userData.employee_code);
  //formData.append("ManagerCode", userData.ManagerCode);
  //formData.append("DeptCode", userData.DeptCode);
  //formData.append("DeptInChargeCode", userData.DeptInChargeCode);
  formData.append("EmpSelected", userData.EmpSelected);
  
  
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  };

  // console.log(params)

  return dispatch => {
    axios
      .post(
        `${SERVER}/user/register`,formData,
        {
          headers: headers,
        }
      )
      .then(res => {
        callback(res.data);
        // console.log(large)
        // history.push("/");
        // return <Redirect to='/users' />
      })
      .catch(err => {
        // console.log(large)
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  };
};



export const UpdateUserPri = (userData, callback) => {
  const decoded = jwtDecode(localStorage.jwtToken)
  const updated_by = decoded.employee_code
  const params = {    
    employee_code: userData.employee_code,    
    user_type: userData.user_type,
    position_code: userData.user_position,
    updated_by: updated_by
  }

  // console.log(params)
  
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  };

  // console.log(params)

  return dispatch => {
    axios
      .get(
        `${SERVER}/user/updatepri`,
        {
          headers: headers,
          params: params
        }
      )
      .then(res => {
        callback(res.data);
        // console.log(large)
        // history.push("/");
        // return <Redirect to='/users' />
      })
      .catch(err => {
        // console.log(large)
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  };
};


export const updateUserPWDetail = (userData, callback) => {
  const decoded = jwtDecode(localStorage.jwtToken)
  const updated_by = decoded.employee_code
  const params = {    
    password: userData.password,
    employee_code: userData.employee_code,    
    currentpassword: userData.currentpassword,
    updated_by: updated_by
  }
  
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  };

  // console.log(params)

  return dispatch => {
    axios
      .get(
        `${SERVER}/user/updatepw/detail`,
        {
          headers: headers,
          params: params
        }
      )
      .then(res => {
        callback(res.data);
        // console.log(large)
        // history.push("/");
        // return <Redirect to='/users' />
      })
      .catch(err => {
        // console.log(err.response.data.detail)
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data.detail
        });
      });
  };
};




export const fetchMaxemp = callback => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456"
  };

  return dispatch => {
    axios
      .get(`${SERVER}/employee/fetch/max`, null, {
        headers: headers
      })
      .then(res => {
        callback(res.data);
      })
      .catch(console.log);
  };
}




export const deleteUserPri = (user_privileges_id, callback) => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: localStorage.getItem("jwtToken"),
    fingerprint: "123456"
  };
  const decoded = jwtDecode(localStorage.jwtToken)
  const EditBy = decoded.employee_code
  const company_code = decoded.company_code

  const formData = new FormData()
  formData.append('EditBy', EditBy)
  formData.append('company_code', company_code)
  formData.append('role_id', user_privileges_id)

  return dispatch => {
    axios
      .post(`${SERVER}/users/type/delete`, formData, {
        headers: headers,
      })
      .then(res => {

        callback(res.data);
      })
      .catch(console.log);
  };
};

export const fetchAllUser = callback => {
  // const headers = {
  //   "Content-Type": "application/x-www-form-urlencoded",
  //   Authorization: localStorage.getItem("jwtToken"),
  //   fingerprint: "123456"
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
        const company_code = decoded.company_code

        const params = {
          company_code
        }
        axios
          .get(`${SERVER}/users/acc/fetch`, {
            headers: headers,
            params: params
          })
          .then(res => {

            callback(res.data);
          })
          .catch(console.log);

      })
  };
};


export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('userLogin')
    setAuthToken(false)
    dispatch(actLogoutUser());
  }
}


export const actLogoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};