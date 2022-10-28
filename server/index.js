const express= require ('express')
const multer = require('multer')
const path = require('path')
var cors = require('cors')
const app=express()
app.use(cors())
var storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"upload")
    },
    filename:function(req,file,cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
var upload = multer({storage:storage}).single('file');
app.use(express.static('upload'))
app.post('/file', cors(),(req,res) =>{
   upload (req,res,(err) =>{
        if(err){
            console.log(err);
        }
        console.log(req.file.path);
    })
})
app.listen(3000,() =>{
    console.log("app is listening on port 3000");
})