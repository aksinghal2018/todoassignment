export const emailvalidate=(email)=>{
    console.log( (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(email))
    return(
      (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(email));
}
export const namevalidate=(name)=>{
    //console.log(name)
    return( (/^[a-zA-Z]{2,15}$/).test(name))
}
export const passwordvalidate=(password)=>{
    return ((/^[a-zA-Z0-9@#$%]{5,20}$/).test(password))
}
