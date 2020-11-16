const mongoose=require("mongoose"); //import
const con_url="mongodb+srv://mmm:mmm@cluster0.gvyon.mongodb.net/asset3d?retryWrites=true&w=majority"; //connection url given
mongoose.connect(con_url,{useNewUrlParser: true,useUnifiedTopology:true}) //no semicolon
.then(() =>{
    console.log("Connection established !!");//when connection is succesful
})
.catch((err)=>{    //when error occurs
    console.error(err);   // to tell error type
});
module.exports=mongoose;