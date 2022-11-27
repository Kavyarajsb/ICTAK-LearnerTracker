const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const staffInfo = require('../models/staff')

//read staff list 
router.get('/stafflist', async(req,res)=>{
    try {
        const list = await staffInfo.find();
        res.send(list);
    }
    catch(error) {
        console.log(error);
    }
})

// read single staff detail
router.get('/staff/:id',async(req,res)=>{
    try {
        let id = req.params.id;
        let staff = await staffInfo.findById(id);
        res.send(staff);
    }
    catch(error) {
        console.log(error);
    }
})

// add new staff
router.post('/staff', async(req,res)=>{
    try {
        // store the front end entered details in server variable
        console.log(req.body);
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            // store hash in the database
            let staffnew ={
                name: req.body.name,
                email: req.body.email,
                password: hash,
                role : req.body.role
            }

            let staff = new staffInfo(staffnew);
            let saveStaff = staff.save();
            res.send(saveStaff);                              
        });                   
    }
    catch(error) {
        console.log(error);
        console.log(">>",error);
    }
})

// update staff detail
router.put('/staff', async(req, res) => {
    try {
        let id = req.body._id;
        let staff ={
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role : req.body.role
        }
        let updateStaff = { $set: staff };
        let updateInfo = await staffInfo.findByIdAndUpdate({'_id': id }, updateStaff);
        res.send(updateInfo)
    } catch (error) {
        console.log(error);
    }
})

// delete staff detail
router.delete('/staff/:id', async(req,res)=>{
    try {
        let id = req.params.id;
        let deleteStaff = await staffInfo.deleteOne({'_id':id});
        res.send(deleteStaff);
    }
    catch(error) {
        console.log(error);   
    }
})

// Login Api
router.post('/login',(req,res)=>{
    let userData=req.body;
    var flag=false;

    staffInfo.find().then(function(user){
        console.log("user",user);
        
        for(let i=0;i<user.length;i++){
            if(userData.email==user[i].email && userData.password==user[i].password){
                console.log("found user",user[0].email);

                flag=true;
                break;
            }else{
                flag=false;
            }
        }
        if(flag==true){
            let payload={subject:userData.email+userData.password}
            let token =jwt.sign(payload,"secretKey");
            res.status(200).send({token});
            }
            else{
                res.status(401).send("invalid credentials")
            }
        
    });


});



module.exports = router;