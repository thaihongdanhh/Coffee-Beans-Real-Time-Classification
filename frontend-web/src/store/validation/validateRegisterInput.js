const validator = require("validator");
const _ = require("lodash");

export const validateRegisterInput = async (data,userData,callback) => {    

    // kiem tra xem input co bi bo trong hay ko
    // neu input ma bi bo trong thi cho no la ""
    // data.email = data.email ? data.email : ""
    data.username = _.get(data, "username", "");
    // data.email = _.get(data, "email", "");
    data.password = _.get(data, "password", "");
    data.password2 = _.get(data, "password2", "");
    // data.full_name = _.get(data, "full_name", "");
    // data.user_position = _.get(data, "user_position", "")
     data.user_type = _.get(data, "user_type", "");
    // data.phone = _.get(data, "phone", "");
    //data.employee_name = _.get(data, "employee_name", "");
    data.employee_code = _.get(data, "employee_code", "");

    let errors = {}

    // username 
    let err = 0
    if(validator.isEmpty(data.username)){ // true: "", false: co gia tri
        errors.email = "Vui lòng nhập tài khoản"
    } else {        
        userData.map((userdata,index) => {
            if(userdata.username.indexOf(data.username) > -1){
                err = 1                
            }
        })    

        if(err === 1){
            errors.username = "Tài khoản đã tồn tại"
        }
    }

    // console.log(errors)

    // email
    // if(validator.isEmpty(data.email)){ // true: "", false: co gia tri
    //     errors.email = "Vui lòng nhập email"
    // } else if(!validator.isEmail(data.email)){ // true: email valid, false: email invalid
    //     errors.email = "Email không đúng định dạng"
    // } else {        
    //     userData.map((userdata,index) => {
    //         if(userdata.email.indexOf(data.email) !== -1){
    //             errors.email = "Email đã tồn tại"
    //         }
    //     })        
    // }

    // password
    if(validator.isEmpty(data.password)){
        errors.password = "Vui lòng nhập Password"
    } else if(!validator.isLength(data.password, {min: 6})){
        errors.password = "Password có ít nhất 6 ký tự"
    }

    // password 2
    if(validator.isEmpty(data.password2)){
        errors.password2 = "Nhập lại Password"
    } else if(!validator.equals(data.password, data.password2)){
        errors.password2 = "Password không trùng khớp"
    }

    // DOB, fullName, userType, phone
    // if(validator.isEmpty(data.phone)){
    //     errors.phone = "Vui lòng nhập số điện thoại"
    // }

    // if(validator.isEmpty(data.employee_name)){
    //     errors.employee_name = "Vui lòng nhập họ tên"
    // }
    //
    // if(validator.isEmpty(data.full_name)){
    //     errors.full_name = "Vui lòng nhập Họ tên"
    // }

    // if(validator.isEmpty(data.user_type)){
    //     errors.user_type = "Vui lòng nhập vai trò"
    // }
    // else if (data.user_type === '-1'){
    //     errors.user_type = "Vui lòng nhập vai trò"
    // }

    // if(validator.isEmpty(data.user_position)){
    //     errors.user_position = "Vui lòng nhập chức vụ"
    // }
    // else if (data.user_position === '-1'){
    //     errors.user_position = "Vui lòng nhập chức vụ"
    // }

    // if(validator.isEmpty(data.employee_code)){
    //     errors.employee_code = "Vui lòng nhập mã nhân viên"
    // }
    // else if (data.employee_code === '-1'){
    //     errors.employee_code = "Vui lòng nhập mã nhân viên"
    // }
    // else {
    //     userData.map((userdata,index) => {
    //         if(userdata.employee_code.indexOf(data.employee_code) !== -1){
    //             errors.employee_code = "Mã nhân viên đã tồn tại"
    //         }
    //     })
    // }
    userData.map((userdata,index) => {
        if(userdata.employee_code.indexOf(data.employee_code) !== -1){
            errors.employee_code = "Mã nhân viên đã tồn tại"
        }
    })
    callback({
        // isValid: true neu errors la {}; isValid: false khi erros co thuoc tinh
        isValid: _.isEmpty(errors),
        errors
    })
}

// module.exports = validateRegisterInput;

export const validateUpdateInput = async (data,callback) => {    

    // kiem tra xem input co bi bo trong hay ko
    // neu input ma bi bo trong thi cho no la ""
    // data.email = data.email ? data.email : ""
    data.password = _.get(data, "password", "");
    data.password2 = _.get(data, "password2", "");

    let errors = {}

    // username 
    let err = 0
    
    // password
    if(validator.isEmpty(data.password)){
        errors.password = "Vui lòng nhập Password"
    } else if(!validator.isLength(data.password, {min: 6})){
        errors.password = "Password có ít nhất 6 ký tự"
    }

    // password 2
    if(validator.isEmpty(data.password2)){
        errors.password2 = "Nhập lại Password"
    } else if(!validator.equals(data.password, data.password2)){
        errors.password2 = "Password không trùng khớp"
    }    

    callback({
        // isValid: true neu errors la {}; isValid: false khi erros co thuoc tinh
        isUpdateValid: _.isEmpty(errors),
        errors
    })
}

// module.exports = validateRegisterInput;