// database schema
const mongoose=require("../../connection");
const schema=mongoose.Schema;    //object creation of mongoose function
const Schema= schema({  //def of models is stored in schema
    name: String,
    password: String,
    email: String, 
    contactnum: Number,
})

const model=mongoose.model('SellerRegistration', Schema); 

module.exports=model;