import axios from 'axios'
import {url} from '../ConfigFiles/URL'
import {encryptStorage} from '../ConfigFiles/EncryptStorage'
const header={headers: {
  'Authorization': 'Bearer ' + encryptStorage.getItem('token')
}}
  
export const registeruser=(data)=>{
    return(axios.post(`${url}/registeruser`,data))
}

export const loginuser=(data)=>{
    return(axios.post(`${url}/checkuser`,data))
}

export const getUser=(data)=>{
    //console.log(data)
    return(axios.post(`${url}/getuser`,data))
}
export const changeimage=(data)=>{
    //console.log(data)
    return(axios.post(`${url}/changeimage`,data,header))
}
export const addtask=(data)=>{
    //console.log(data)
    return(axios.post(`${url}/addtask`,data))
}
export const removetask=(data)=>{
    //console.log(data)
    return(axios.post(`${url}/removetask`,data))
}
export const gettask=(data)=>{
    //console.log(data)
    return(axios.post(`${url}/gettask`,data))
}
export const updatetask=(data)=>{
    //console.log(data)
    return(axios.post(`${url}/updatetask`,data))
}
export const sorttask=(data)=>{
    //console.log(data)
    return(axios.post(`${url}/sorttask`,data))
}
