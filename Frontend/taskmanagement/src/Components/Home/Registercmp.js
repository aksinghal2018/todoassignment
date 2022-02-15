import React,{useState} from 'react';
import { registeruser } from '../../Services/services';
import {emailvalidate, namevalidate, passwordvalidate} from './validation'
function Registercmp() {
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [cpassword, setcpassword] = useState("");
    const [errorfname, seterrorfname] = useState("");
    const [errorlname, seterrorlname] = useState("");
    const [erroremail, seterroremail] = useState("");
    const [errorpassword, seterrorpassword] = useState("");
    const [errorcpassword, seterrorcpassword] = useState("");
    const submithandler=(e)=>{
        const id=e.target.id
        e.preventDefault()
        const data={firstname:fname,lastname:lname,email:email,password:password,cpassword:cpassword}
        console.log(data)
        if(fname=="" || lname=="" || email=="" || password=="" || cpassword==""){
          alert("feild cannot be empty")
        }
        else{
          console.log(errorfname)
          if(errorfname=="" && errorlname=="" && erroremail=="" && errorpassword=="" && errorcpassword==""){
              registeruser(data).then(res=>{
                alert(res.data.message)
                  if(res.data.success==true){
                    window.location.replace("/login")
                  }
              })
          }
          else{
              alert("error in form feilds" )
          }
        }
    }
    const handler=(e)=>{
        const id=e.target.id
        if(id=="fname"){
          if(namevalidate(e.target.value)==true){
            seterrorfname("")
          }
          else{
            seterrorfname("invalid firstname")
          }
            setfname(e.target.value)
        }
        if(id=="lname"){
          if(namevalidate(e.target.value)==true){
            seterrorlname("")
          }
          else{
            seterrorlname("invalid lastname")
          }
            setlname(e.target.value)
        }
        if(e.target.id=="email"){
        if(emailvalidate(e.target.value)==true){
          seterroremail("")
        }
        else{
          seterroremail("invalid email")
        }
            setemail(e.target.value)
        }
        if(id=="password"){
          if(passwordvalidate(e.target.value)==true){
            seterrorpassword("")
          }
          else{
            seterrorpassword("invalid password")
          }
            setpassword(e.target.value)
        }
        if(id=="cpassword"){
          if(password!==e.target.value){
            seterrorcpassword("confirm password and passowrd not match")
          }
          else{
            seterrorcpassword("")
          }
            setcpassword(e.target.value)
        }
    }
  return <div style={{backgroundImage:`url("../images/background.jpg")`,backgroundRepeat:"no-repeat",backgroundSize:"cover",marginTop:"-40px",paddingTop:"40px",minHeight:"800px"}}>

<form style={{marginLeft:"25%",width:"50%",border:"2px solid black",padding:"20px",marginTop:"40px",marginBottom:"20px"}} onSubmit={submithandler}>
      <h2>Register</h2>
      <div className="form-group">
    <label htmlFor="fname">First name</label>
    <input type="text" className="form-control" id="fname"  placeholder="Enter fname" onChange={handler}  autoComplete="none"/>
    <h4 style={{color:"red"}}>{errorfname}</h4>
    </div>
  <div className="form-group">
    <label htmlFor="lname">Last name</label>
    <input type="text" className="form-control" id="lname"  placeholder="Enter lname" onChange={handler} autoComplete="none"/>
   <h4 style={{color:"red"}}>{errorlname}</h4>
   </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="text" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={handler} autoComplete="none"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
    <h4 style={{color:"red"}}>{erroremail}</h4>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="password" placeholder="Password" onChange={handler} autoComplete="none"/>
    <h4 style={{color:"red"}}>{errorpassword}</h4>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1"> Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" placeholder="Confirm Password" onChange={handler} autoComplete="none"/>
    <h4 style={{color:"red"}}>
  {errorcpassword}</h4>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
  </div>;
}

export default Registercmp;
