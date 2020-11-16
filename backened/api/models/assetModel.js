const mongoose=require("../../connection");
const schema=mongoose.Schema;    //object creation of mongoose function
const Schema= schema({  //def of models is stored in schema
    name: String, 
    price:Number,
    compatibility:String,
    imageformat:String,
    vertices:Number,
    triangles:Number,
    textures:Number,
    created:Date,
    category:String,
    imgname:String,
    zipname:String,
    seller :{type :mongoose.Types.ObjectId ,ref: "SellerRegistration"}
})

const model=mongoose.model('assetDetails', Schema); //UserRegistration is database name

module.exports=model;