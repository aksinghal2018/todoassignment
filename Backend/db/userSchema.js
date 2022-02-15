const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profile_img:{
        type:String
    },
    password:{
        type:String,
        require:true
    },
    tasks:{
        type:Array,
        require:false
    }
})
module.exports = mongoose.model("user", userSchema)