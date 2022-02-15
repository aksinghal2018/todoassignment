import React, { useState,useEffect } from 'react';
import { loginuser } from '../../Services/services';
import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
import {useHistory} from 'react-router-dom'
function Logincmp() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const history=useHistory()
    useEffect(() => {
      if(encryptStorage.getItem("user")!=undefined){
        history.push("/dashboard")
      }
    }, []);
    
    const submithandler=(e)=>{
        const id=e.target.id
        e.preventDefault()
        const data={email:email,password:password}
        console.log(data)
        loginuser(data).then((res)=>{
            console.log(res)
            encryptStorage.setItem("user",res.data.customer_details)
            alert(res.data.message)
            if(res.data.success==true){

              window.location.replace("/dashboard")
            }
        })
    }
    const handler=(e)=>{
        const id=e.target.id
        if(id=="email"){
            setemail(e.target.value)
        }
        else{
            setpassword(e.target.value)
        }
    }
  return <div style={{backgroundImage:`url("../images/background.jpg")`,backgroundRepeat:"no-repeat",backgroundSize:"cover",paddingTop:"70px",marginTop:"-20px",height:"600px"}}>
      <form style={{marginLeft:"25%",width:"50%",border:"2px solid black",padding:"20px"}} onSubmit={submithandler}>
  <div className="form-group">
      <h2>Login</h2>
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={handler}/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="password" placeholder="Password" onChange={handler}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
  </div>;
}

export default Logincmp;
