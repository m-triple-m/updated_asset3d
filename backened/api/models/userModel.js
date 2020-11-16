// database schema
const mongoose=require("../../connection");
const schema=mongoose.Schema;    //object creation of mongoose function
const registrationSchema= schema({  //def of models is stored in schema
    name: String,
    password: String,
    email: String, 
    contactnum: Number,
    dob: Date
})

const model=mongoose.model('UserRegistration', registrationSchema); //UserRegistration is database name

module.exports=model;
