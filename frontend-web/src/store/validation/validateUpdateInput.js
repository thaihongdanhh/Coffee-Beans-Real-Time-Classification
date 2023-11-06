const validator = require("validator");
const _ = require("lodash");

export const validateUpdateInput = async (data,userData,callback) => {    

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