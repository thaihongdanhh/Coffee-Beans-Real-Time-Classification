const validator = require("validator");
const _ = require("lodash");
// const { User } = require("../models/users");

validateUpdateStudent = async (data) => {
    let errors = {}

    // kiem tra xem input co bi bo trong hay ko
    // neu input ma bi bo trong thi cho no la ""
    // data.email = data.email ? data.email : ""
    
    // console.log(data)
    // console.log(data.TRANG_THAI)
    
    data.TRANG_THAI = _.get(data, "TRANG_THAI", "");
    data.TRANG_THAI_CHI_TIET = _.get(data, "TRANG_THAI_CHI_TIET", "");
    data.NGUOI_THUC_HIEN = _.get(data, "NGUOI_THUC_HIEN", "");

    


    if(validator.isEmpty(data.TRANG_THAI)){
        errors.TRANG_THAI = "Trang Thai is required"
    }

    if(validator.isEmpty(data.TRANG_THAI_CHI_TIET)){
        errors.TRANG_THAI_CHI_TIET = "Trang Thai Chi Tiet is required"
    }

    if(validator.isEmpty(data.NGUOI_THUC_HIEN)){
        errors.NGUOI_THUC_HIEN = "Nguoi Thuc Hien is required"
    }

    return {
        // isValid: true neu errors la {}; isValid: false khi erros co thuoc tinh
        isValid: _.isEmpty(errors),
        errors
    }
}

module.exports = validateUpdateStudent;