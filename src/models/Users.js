const mongoose = require("mongoose")
const validator = require("validator")

const loginSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:[true,"Email id already present"],
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    mobileNumber:{
        type:Number,
        min:10
    },
    password:{
        type:String,
        required:true
    }
})

// we will create a new collection 

const User = new mongoose.model('User',loginSchema)

module.exports = User;
 