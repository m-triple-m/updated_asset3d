const model=require('../models/assetModel');
const express=require('express');
const router=express.Router();


//create
router.post('/addasset',(req,res) =>{
    let data=req.body;
    console.log(data);
    let mymodel=new model(data);

    mymodel.save()
    .then((data) =>{
       extractFile(data.zipname);
        console.log("Asset data saved");
        res.json({message : "success"});
    })
    .catch((r)=>{
 console.error(r);
 res.send(r.message);
    });
})
//read
router.get('/getasset',(req,res)=>{
    model.find({}).populate('seller')
    .then((data)=>{
        console.log("data fetched successfully...!");
        res.status(200).json(data);
    })
    .catch((r) =>{
        console.log(r);
        res.status(500).json(r);
    })
})

router.get('/getbyassetid/:id',(req,res)=>{
    let id=req.params.id;
    model.findById(id)
    .populate('seller')
    .then((data) => {
        console.log("data saved successfully..!");
       // res.send('your data has been successfully saved');
        res.status(200).json(data);
    })
    .catch( (err) =>{
        console.error(err);
        //res.send(err.message);
        res.status(500).json(err);
    });
})

//fetch by name
router.get('/getbyassetname/:name',(req,res)=>{
    let proname=req.params.pname;
    model.find({name:proname})
    .then((data) => {
        console.log("data saved successfully..!");
       // res.send('your data has been successfully saved');
        res.status(200).json(data);
    })
    .catch( (err) =>{
        console.error(err);
        //res.send(err.message);
        res.status(500).json(err);
    });
})

//delete
router.delete('/deletebyassetid/:id',(req,res)=>{
    let id=req.params.id;
    model.findByIdAndDelete(id)
    .then((data) => {
        console.log("data deleted successfully..!");
       // res.send('your data has been successfully saved');
        res.status(200).json(data);
    })
    .catch( (err) =>{
        console.error(err);
        //res.send(err.message);
        res.status(500).json(err);
    });
});

router.delete('/deletebyassetname/:name',(req,res)=>{
    let pn=req.params.proname;
    model.findOneAndDelete({name : pn})
    .then((data) => {
        console.log("data deleted successfully..!");
       // res.send('your data has been successfully saved');
        res.status(200).json(data);
    })
    .catch( (err) =>{
        console.error(err);
        //res.send(err.message);
        res.status(500).json(err);
    });
});

//update
router.put('/updatebyassetid/:id',(req,res)=>{
    let id=req.params.id;
    let updatedata=req.body;
    model.findByIdAndUpdate(id,updatedata)
    .then((data) => {
        console.log("data deleted successfully..!");
       // res.send('your data has been successfully saved');
        res.status(200).json(data);
    })
    .catch( (err) =>{
        console.error(err);
        //res.send(err.message);
        res.status(500).json(err);
    });
});
router.get('/getbyseller/:id', (req, res) => {
   // console.log("Hello");
    model.find({seller : req.params.id})
    .populate('sharedto')
    .then(data => {

        res.status(200).json(data);
    })
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    });
});
router.get('/getall',(req,res) =>{
    model.find({}).populate('seller')    //{} used to extract all entries
    .then((data) => {
        console.log("data fetched successfully..!");
        res.status(200).json(data);
    })
    .catch( (err) =>{
        console.error(err);
        res.status(500).json(err);
    });
});
const multer= require('multer');
const fs = require('fs');
const unzipper = require('unzipper');

const imagestorage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./uploads/products/images');
    },
    filename: (req,file,cb)=>{
        cb(null, file.originalname);
    }
})
const filestorage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./uploads/products/zipfiles');
    },
    filename: (req,file,cb)=>{
        cb(null, file.originalname);
    }
})

const extractFile = (filepath) => {
    fs.createReadStream('./uploads/products/zipfiles/'+filepath)
        .pipe(unzipper.Extract({ path: './uploads/products/extracted/'+filepath }));
}
const uploadImage=multer({storage:imagestorage})
const uploadFile=multer({storage:filestorage})


router.post('/addimg',uploadImage.single('image'),(req,res)=>{
    console.log(req.body);
    res.json({message:"File upload success"})
})
 
router.post('/addfile',uploadFile.single('file'),(req,res)=>{
    console.log(req.body);
    res.json({message:"File upload success"})
})


module.exports=router;


