const jsonwebtoken=require('jsonwebtoken')
const jsonsecret="5sa5sa67s66s66sa6saww"
const userModel=require('../db/userSchema.js');
const tokenModel=require('../db/TokenSchema');
const crypto =require('crypto')
const bcrypt = require('bcrypt');
const multer =require('multer')
const path=require('path')

const fs=require('fs')
const autenticateToken= async(req,res,next)=>{
    if(req!=undefined){
        var token=null
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            token=( req.headers.authorization.split(' ')[1]);
        } else if (req.query && req.query.token) {
            token=( req.query.token);
        }
        //console.log(req.header)
        if(token==null){
            res.json({"err":1,"msg":"Token not match"})
        }
        else {
            await jsonwebtoken.verify(token,jsonsecret,(err,data)=>{
                if(err){
                    res.send("Token expired")
                }
                else {
                    next();
                }
            })
        }
    }
    else{
        next()
    }
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/'))
        //console.log(path.join(__dirname, './uploads/'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0])
        //console.log(file)
    }
});
const multi_upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 1MB
    fileFilter: (req, file, cb) => {
        console.log(file.mimetype)
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" ) {
            cb(null, true);
        } else {
            cb(null, false);
            const err = new Error('Only .png, .jpg and .jpeg format allowed!')
            err.name = 'ExtensionError'
            return cb(err);
        }
    },
}).array('myfile', 1)
const registerUser= async (req, res , next)=>{
    console.log(req.body)
    let firstname=req.body.firstname;
    let lastname=req.body.lastname;
    let email=req.body.email;
    let password=req.body.password;
    var data={first_name:firstname,last_name:lastname,email:email}
    const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                if (err) throw err
                data={first_name:firstname,last_name:lastname,email:email,password:hash}
                let ins=new userModel(data);
    //console.log(data)
    ins.save((err)=>{
        console.log(err)
        if(err){ res.json({ "success": false,err:"user already added",message:"user already added."})}
        else{
        res.json({ "success": true,
        "status_code": 200,
        "message": `${firstname +lastname} was registered successfully`
    });
        }
    })
            });
        });
        
        
        
        
    }
    
    

const getUser= async (req, res , next)=>{
    console.log("req.body")
    console.log(req.body)
    userModel.find({_id:req.body.userid},(err,data)=>{
        if(err) throw err;
        else{
            var data1=data
            console.log(data)
            if(data[0].gender==undefined){
                data1[0].gender="male"
            }
            if(data[0].phone_no==undefined){
                data1[0].phone_no=9999999998
            }
            if(data[0].DOB==undefined){
                data1[0].DOB="01/01/2000"
            }
            console.log(data1)
            res.send(data);}
        })
        console.log("getuser")
    }
    
    const loginUser= async (req, res , next)=>{
        let email=req.body.email;
    let password=req.body.password
    const saltRounds = 10;
    console.log(email,password)
    let token=jsonwebtoken.sign({ UID:email },jsonsecret,{ expiresIn: 60*60 }) //1 minute expire time for jwt token
    userModel.find({$and:[{email:email}]},(err,data)=>{
        if(err){
            res.json({"success" : false,err:err,message:"incorrect username And password."})
        }   
        else{
            console.log(data)
            if(data.length==0){
                res.json({"success" : false,err:"user not exist",message:"incorrect username And password."})
            }
            else{
            bcrypt.compare(password, data[0].password, function(err, result) {
                if(result){
                    const data1={
                    "first_name": data[0].first_name,
                    "last_name": data[0].last_name,
                    "email" : data[0].email ,
                    "userid":data[0]._id,
                    "profile_img":data[0].profile_img,
                    "tasks":data[0].tasks
                    }
                    if(data1.profile_img==undefined){
                        data1.profile_img=""
                    }
                console.log(data1)
                if(data.length==0){
                    res.json({"success" : false,err:"user not exist",message:"incorrect username And password."})
                }
                else{
                    res.json({"success" : true,
                "status_code": 200,
                "message": "You have logged In",
                  "customer_details": data1,
                  "token":token
                });
                }
            }   
            else{
                res.json({"success" : false,err:err,message:"incorrect username And password."})
            }     
            
            });

        }
            
        }
    })
}


const deleteUser= async (req, res , next)=>{
    let id=req.params.id;
    userModel.deleteOne({_id:id},(err)=>{
        if(err) throw err 
        res.send("user Data Deleted .")
    })
}
const updateUser= async (req, res , next)=>{
    let id=req.body.id;
    let firstname=req.body.firstname;
    let lastname=req.body.lastname;
    let email=req.body.email;
    let phone_no=req.body.phone_no;
    let DOB=req.body.DOB;
    let gender=req.body.gender;
    console.log("11")
    console.log(req.body)
    console.log({first_name:firstname,last_name:lastname,email:email,phone_no:phone_no,DOB:DOB,gender:gender})
    userModel.updateOne({_id:id},{$set:{first_name:firstname,last_name:lastname,email:email,phone_no:phone_no,DOB:DOB,gender:gender}},(err,data)=>{
        if(err) throw err;
        else {
            console.log(data)
            res.json({data:{first_name:firstname,last_name:lastname,email:email,phone_no:phone_no,DOB:DOB,gender:gender},message:"user data Updated ."});
        }
    })
}
const forgetPasswordUser= async (req, res , next)=>{
    let email=req.body.email;
    let secret_code=Math.floor(Math.random()*10000)
    userModel.find({email:email},async(err,data)=>{
        if(err) throw err;
        else if(data.length==0){
            res.json({err:"1",msg:"user not found"})
        }
        else{
            let token = await tokenModel.findOne({ email: req.body.email });
            if (!token) {
            token = await new tokenModel({
                email: req.body.email,
                token: crypto.randomBytes(32).toString("hex"),
                secretcode: secret_code
            }).save();
        }
        main(token,email,"Forget Password",token.secretcode)
            res.json({data:email})
        }
    })
    
}
const updatePasswordUser= async (req, res , next)=>{
    console.log(req.body)
    const email=req.body.email
    const secretcode=req.body.secretcode
    const password=req.body.password
    tokenModel.find({$and:[{email:email}]},(err,data)=>{
        if(err){
            res.json({"success" : false,err:err,message:"incorrect token"})
        }   
        else{ if(data.length==0){
            res.json({"success" : false,err:err,message:"token expire"})
        }
        else{
            if(data[0].secretcode==secretcode){
                
                    if(req.body.password!==undefined){
                        const saltRounds = 10;
                        bcrypt.genSalt(saltRounds, function(err, salt) {
                            bcrypt.hash(req.body.password, salt, function(err, hash) {
                                if (err) throw err
                                userModel.updateOne({email:req.body.email},{$set:{password:hash}},(err)=>{
                                    if(err) throw err;
                                    else {
                            res.json({"success" : true,err:err,message:"Password Updated"});
                        }
                    })
                            });
                        });
                        
                    }
                }
                else{
                    res.json({"success" : false,err:err,message:"incorrect secret code"})
                }
            }
        }})
    
    }
    const changeprofileimage=(req,res,next)=>{
    multi_upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.status(500).send({ error: { message: `Multer uploading error1: ${err.message}` } }).end();
            return;
        } else if (err) {
            if (err.name == 'ExtensionError') {
                res.json({ err: err.name })
            } else {
                res.status(500).send({ error: { message: `unknown uploading error: ${err.message}` } }).end();
            }
            return;
        }
        let image=req.files[0].filename;
        let email=req.body.email;
        userModel.findOne({email:email},(err,data)=>{
            if(data.profile_img!=undefined){
                fs.unlinkSync(path.join(__dirname, `../uploads/${data.profile_img}`))
            }
        })
        userModel.updateOne({email:email},{$set:{profile_img:image}},(err)=>{
            if(err) throw err;
            else {
                res.json({Status:"success",message:"Image Updated .",new_profile_img:image});
            }
        })
    })

}
const addtask=(req,res,next)=>{
    console.log(req.body)
    userModel.update(
        { email: req.body.email }, 
        { $push: { tasks: req.body } },
        (err)=>{
            if(err) throw err;
            else {
                res.json({Status:"true",message:"task Added",task:req.body});
            }
        }
    );
}
const removetask=(req,res,next)=>{
    const id=req.body.index
    const email=req.body.email
    console.log(req.body)
     userModel.findOne({email:email},(err,data)=>{
     var tasks=data.tasks   
     tasks.splice(id,1)  
     userModel.update({email:email}, {"$set" : {"tasks" : tasks}},(err)=>{
         if(err) throw err;
         else {
             res.json({Status:"true",message:"task deleted",task:req.body});
         }
     });
    });  
}
const updatetask=(req,res,next)=>{
    const id=req.body.index
    const email=req.body.email
    console.log(req.body)
     userModel.findOne({email:email},(err,data)=>{
     var tasks=data.tasks   
     tasks[id]=req.body.task
     userModel.update({email:email}, {"$set" : {"tasks" : tasks}},(err)=>{
         if(err) throw err;
         else {
             res.json({Status:"true",message:"task updated",task:req.body});
         }
     });
    });  
}
const gettasks=(req,res,next)=>{
    const email=req.body.email
    console.log(req.body.email)
     userModel.findOne({email:email},(err,data)=>{
     var tasks=data.tasks   
         if(err) throw err;
         else {
             res.json({Status:"true",message:"task get",task:tasks});
         }
     })  
}
function fieldSorter(fields) {
    return function (a, b) {
        return fields
            .map(function (o) {
                var dir = 1;
                if (o[0] === '-') {
                   dir = -1;
                   o=o.substring(1);
                }
                if (a[o] > b[o]) return dir;
                if (a[o] < b[o]) return -(dir);
                return 0;
            })
            .reduce(function firstNonZeroValue (p,n) {
                return p ? p : n;
            }, 0);
    };
}
const sorttask=(req,res,next)=>{
    const email=req.body.email
    console.log(req.body.email)
     userModel.findOne({email:email}).exec((err,data)=>{
     var tasks=data.tasks
     tasks.sort((a,b) => (a.priority > b.priority) ? -1 : ((b.priority > a.priority) ? 1 : 0))
    // tasks.sort((a,b) => (a.creation_date > b.creation_date) ? 1 : ((b.creation_date > a.creation_date) ? -1 : 0))   
     tasks.sort((a,b) => (a.deadline > b.deadline) ? 1 : ((b.deadline > a.deadline) ? -1 : 0))
     tasks = tasks.slice(0, 5)
         if(err) throw err;

         else {
             res.json({Status:"true",message:"task get",task:tasks});
         }
     })  
}

module.exports= {registerUser,getUser,loginUser,deleteUser,updateUser,forgetPasswordUser,updatePasswordUser,changeprofileimage,autenticateToken,addtask,removetask,gettasks,updatetask,sorttask}