// index.js is directly connected to service file (behaves like main function in c)
const express=require("express");  //importing backend framework
const app=express();
const port = 4000;  // same port num has to be used in service url
const parser=require("body-parser");  //body parser is added to convert data into readable format
const cors=require('cors'); //cors is a node js package for providing a connection middleware 
                            //that can be used to enable cors with various options

const userRouter= require('./api/routes/userManager') //importing userManager
const assetRouter = require('./api/routes/assetManager') //importing assetManager
const sellerRouter=require('./api/routes/sellerManager')
app.use(parser.json()); //converts data into json format(for backend)

app.use(cors());            //implementing cors

app.listen(port, ()=>{                   //checks connection 
    console.log('Server Working');
})

app.use('/user',userRouter);  //implementing userRouter and giving it a url
app.use('/asset',assetRouter); //implementing assetRouter
app.use('/seller',sellerRouter); 
app.use(express.static('./uploads'));