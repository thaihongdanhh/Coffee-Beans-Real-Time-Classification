import jwtDecode from 'jwt-decode'

export const isAuthorize = (pathname) => {
    const decoded = jwtDecode(localStorage.jwtToken)
    const dashboard = decoded.dashboard
    const recognization = decoded.recognization
    const monitor = decoded.monitor
    const system = decoded.system
    const timesheet = decoded.timesheet
    const equipment = decoded.equipment
    const store = decoded.store
    const statistic = decoded.statistic
    const employee = decoded.employee
    // console.log(pathname)
    // console.log(pathname.includes('dashboard') && dashboard === "-1")
    if (pathname.includes('dashboard') && dashboard === "-1") {
        return false;
    }
    else if (pathname.includes('emp') && employee === "-1"){
        return false;
    }
    else if (pathname.includes('mgt') && recognization === "-1"){
        return false;
    }
    else if (pathname.includes('monitor') && monitor === "-1"){
        return false;
    }
    else if (pathname.includes('sys') && system === "-1"){
        return false;
    }    
    else if (pathname.includes('timesheet') && timesheet === "-1"){
        return false;
    }
    else if (pathname.includes('dev') && equipment === "-1"){
        return false;
    }
    else if (pathname.includes('record') && store === "-1"){
        return false;
    }
    else if (pathname.includes('stat') && statistic === "-1"){
        return false;
    }
    
    // else if (pathname.includes('/')){
    //     return true;
    // }
    else {
        return true;
    }
    
}