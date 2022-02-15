const express=require('express')
const userController = require( '../controller/UserController')
const router=express.Router()
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))


router.post("/registeruser",userController.registerUser)
router.post("/getuser",userController.getUser)
router.post("/checkuser",userController.loginUser)
router.post("/changeimage",userController.changeprofileimage)
router.delete("/deluser/:id",userController.deleteUser)
router.post("/addtask",userController.addtask)
router.post("/removetask",userController.removetask)
router.post("/gettask",userController.gettasks)
router.post("/updatetask",userController.updatetask)
router.post("/sorttask",userController.sorttask)
//router.put("/updateuser/:id",userController.updateUser)
//end
module.exports=router;