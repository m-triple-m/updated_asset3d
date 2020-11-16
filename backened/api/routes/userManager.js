//sql
const model=require('../models/userModel'); 
const  express= require('express');
const router=express.Router();

//adding new member
router.post('/add',(req,res)=>{
    let data=req.body; // saving input in data var
    console.log(data); //verification purpose
    let mymodel=new model(data);
    mymodel.save()    //saving data into db
    .then((data) => {
        console.log("data saved successfully..!");
        res.status(200).json({message :'Success'});  //status whether error has occured or not
    })
    .catch( (err) =>{     //error type
        console.error(err);
        res.send(err.message);
    });
})

    //getting details of all member
    router.get('/getall',(req,res) =>{
        model.find({})    //{} used to extract all entries
        .then((data) => {
            console.log("data fetched successfully..!");
            res.status(200).json(data);
        })
        .catch( (err) =>{
            console.error(err);
            res.status(500).json(err);
        });
    })

    //gettingbyid
    router.get('/getbyid/:id',(req,res)=>{
        let id=req.params.id;   
        model.findById(id)
        .then((data) => {
            console.log("data saved successfully..!");
            res.status(200).json(data);
        })
        .catch( (err) =>{
            console.error(err);
            res.status(500).json(err);
        });
    })

    //fetch by username
    router.get('/getbyuname/:name',(req,res)=>{
        let uname=req.params.name;
        model.findOne({name:uname}) //username is the column name in db
        .then((data) => {
            console.log(data);
        // res.send('your data has been successfully saved');
            res.status(200).json(data);
        })
        .catch( (err) =>{
            console.error(err);
            //res.send(err.message);
            res.status(500).json(err);
        });
    })

    router.get('/getbyemail/:email',(req,res)=>{
        
        model.findOne({email:req.params.email}) //username is the column name in db
        .then((data) => {
            console.log(data);
        // res.send('your data has been successfully saved');
            res.status(200).json(data);
        })
        .catch( (err) =>{
            console.error(err);
            //res.send(err.message);
            res.status(500).json(err);
        });
    })

    //delete by id
router.delete('/deletebyid/:id',(req,res)=>{
    let id=req.params.id;
    //model.findByIdAndDelete(id)
    model.findByIdAndDelete(id)
    .then((data) => {
        console.log("data deleted successfully..!");
        res.status(200).json(data);   //status 200 == all good
    })
    .catch( (err) =>{
        console.error(err);           //status 500 == server error
        res.status(500).json(err);
    });
});

//delete by username
router.delete('/deletebyuname/:name',(req,res)=>{
    let un=req.params.name;
    model.findOneAndDelete({name : un})
    .then((data) => {
        console.log("data deleted successfully..!");
        res.status(200).json(data);
    })
    .catch( (err) =>{
        console.error(err);
        res.status(500).json(err);
    });
});

//update
router.put('/update/:id',(req,res)=>{
    let id=req.params.id;
    let updatedata=req.body;
    model.findByIdAndUpdate(id,updatedata)
    .then((data) => {
        console.log("data updated successfully..!");
        res.status(200).json(data);
    })
    .catch( (err) =>{
        console.error(err);
        res.status(500).json(err);
    });
});

module.exports=router;