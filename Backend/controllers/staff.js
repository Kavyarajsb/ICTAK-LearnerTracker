const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const staffInfo = require('../models/staff')

//read staff list 
exports.getAllStaff= async(req,res)=>{
    try {
        const list = await staffInfo.find();
        res.send(list);
    }
    catch(error) {
        console.log(error);
    }
}

// read single staff detail
exports.getOneStaff=async(req,res)=>{
    try {
        let id = req.params.id;
        let staff = await staffInfo.findById(id);
        res.send(staff);
    }
    catch(error) {
        console.log(error);
    }
}

// add new staff
exports.addStaff= async(req,res)=>{
    try {
        // store the front end entered details in server variable
        console.log(req.body);
        bcrypt.hash(req.body.password, 10).then((hash)=>{
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
        })
    }
    catch(error) {
        console.log(error);
    }
}

// update staff detail
exports.updateStaff= async(req, res) => {
    try {
        if(Object.keys(req.body.password).length === 0){
        let id = req.body._id;
        let staff ={
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role : req.body.role
        }
    }else{
        bcrypt.hash(req.body.password, 10).then((hash)=>{
            // store hash in the database
            let staff ={
             name: req.body.name,
             email: req.body.email,
             password: hash,
             role : req.body.role
         }
        
        })
    }
        let updateInfo = await staffInfo.findByIdAndUpdate({'_id': id }, { $set: staff });
        res.send(updateInfo)
    } catch (error) {
        console.log(error);
    }

}

// delete staff detail
exports.deleteStaff= async(req,res)=>{
    try {
        let id = req.params.id;
        let deleteStaff = await staffInfo.deleteOne({'_id':id});
        res.send(deleteStaff);
    }
    catch(error) {
        console.log(error);   
    }
}

//count of Training Head

exports.countTh=async(req,res)=>{
    try {
        const count = await staffInfo.find( {"role":"Training Head"} ).count();
        console.log("TH Count>>>",count)
        res.json(count);
       
    }
    catch(error) {
        console.log(error);
    }
}

//count of Placement Officer

exports.countPO=async(req,res)=>{
    try {
        const count = await staffInfo.find( {"role":"Placement Officer"} ).count();
        console.log("PO Count>>>",count)
        res.json(count);
       
    }
    catch(error) {
        console.log(error);
    }
}

// Login Api
exports.login=(req,res)=>{
    let userData=req.body;
    var flag=false;
    var userrole="";
    var username="";

    staffInfo.find().then(function(user){
        for(let i=0;i<user.length;i++){
            if(userData.email==user[i].email && userData.password==user[i].password){
                console.log("found user",user[i].email);
                userrole = user[i].role;
                username = user[i].name;
                flag=true;
                break;
            }else{
                flag=false;
            }
        }
        if(flag==true){
            let payload={subject:userData.email+userData.password}
            let token =jwt.sign(payload,"secretKey");
            res.status(200).send({token,username,userrole});
            }
            else{
                res.status(401).send("invalid credentials")
            }
        
    });

    


};




// This will be the login function after frontend is ready 
//              |
//              |
//              V
// exports.login=(req,res)=>{
//     var flag=false;

//     staffInfo.findOne({"email": req.body.email}).then((user)=>{
//         if(!user){
//             return res.status(401).send("User not found");
//         }
//         bcrypt.compare(req.body.password, user.password).then((valid)=>{
//             if (!valid){
//                 return res.status(401).send("Invalid password");
//             }
//             let payload={subject:userData.email+userData.password}
//             let token =jwt.sign(payload,"secretKey");
//             res.status(200).send({token});
//         })
//     })
// };



