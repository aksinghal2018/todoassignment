import React from 'react'
import { encryptStorage } from '../../ConfigFiles/EncryptStorage'
import { changeimage } from '../../Services/services'
function EditImage() {
    const submit = (e) => {
        e.preventDefault()
        let formData = new FormData();    //formdata object
        var imagedata = document.querySelector('input[type="file"]').files[0];
        formData.append("myfile", imagedata);
        formData.append('email', encryptStorage.getItem("user").email);   //append the values with key, value pair
        
        const config = {
            headers: {
                "Content-Type": "multipart/form-data; boundary=AaB03x" +
                "--AaB03x" +
                "Content-Disposition: file" +
                    "Content-Type: png" +
                    "Content-Transfer-Encoding: binary" +
                    "...data... " +
                    "--AaB03x--",
                    "Accept": "application/json",
                    "type": "formData",
                    "Authentication":`Bearer ${localStorage.getItem('_token')}`
                    
                }
            }
            if(imagedata==undefined){
                alert("select profile image before submit.")
            }
            else{
                
                changeimage(formData).then(
                    data => {
                        console.log(data)
                        if (data.data.Status === "success") {
                            var newdata=encryptStorage.getItem("user")
                            newdata.profile_img=data.data.new_profile_img
                            encryptStorage.setItem("user",newdata)
                            //console.log(newdata)
                            alert(data.data.message)
                            window.location.replace("/dashboard")
                        }
                        else{
                            alert("error")
                            window.location.reload("")
                        }
                    }
                    )
                }
                
            }
            var datacmp1
            if(encryptStorage.getItem("user").profile_img==""){
                datacmp1=<><img src="../user.png" style={{width:"170%",height:"150%"}}  className="rounded" alt="Cinque Terre"  /></>
            }
            else{
                datacmp1=<><img src={`http://localhost:8899/images/${encryptStorage.getItem("user").profile_img}`} style={{width:"170%",height:"150%"}}  className="rounded" alt="Cinque Terre"   /></>
            }
            return (
        <div className='row'>
            <div className='col-4' style={{paddingLeft:"12%"}}>
            {datacmp1}
            </div>
            <div className='col-8'>

        <div style={{textAlign:"center",margin:"20px"}}>
            <h1>Edit Profile Image</h1>
            <form method='POST' onSubmit={submit} enctype="multipart/form-data">
            <input type="file" name='myfile' id='myfile' />
            <input type="hidden" name='email' id='email' value={encryptStorage.getItem("user").email}/>
            <button type='submit' >Submit</button>
            </form>
        </div>
            </div>
        </div>
    )
}

export default EditImage
