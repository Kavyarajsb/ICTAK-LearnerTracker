const express = require('express');
const router = express.Router();

//csv upload required packages and declaration starts
var multer = require('multer');
var csv = require('csvtojson');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
let uploads = multer({ storage: storage });
const learnerInfo = require('../models/learner');
// csv upload specific code ends

const learnerCntrlr = require('../controllers/learner')

//read learner list 
router.get('/learnerlist', learnerCntrlr.getAllLearners)

// read single learnerInfo detail
router.get('/learner/:id',learnerCntrlr.getOneLearner)

// add new learner
router.post('/learner', learnerCntrlr.addLearner)

// update learner detail
router.put('/learner', learnerCntrlr.updateLearner)

// delete learner detail
router.delete('/learner/:id', learnerCntrlr.deleteLearner)

// upload csv learners
router.post('/uploadlearners',uploads.single('csv'), (req,res)=>{
    csv()
    .fromFile(req.file.path)
    .then((jsonObj)=>{
        
        var learners = [];
        for(var i = 0;i<jsonObj.length;i++){
            var obj={};
            obj.learnerid=jsonObj[i]['Learner ID'];
            obj.name=jsonObj[i]['Name'];
            obj.course=jsonObj[i]['Course'];
            obj.project=jsonObj[i]['Project'];
            obj.batch=jsonObj[i]['Batch'];
            obj.coursestatus=jsonObj[i]['Course Status'];
            learners.push(obj);
        }
                  
        learnerInfo.insertMany(learners, (err, data) => {
            if (err) {
                res.status(401).send("Duplicate entry error");
               //res.send(err);
            } else {
               // res.send(data);
              res.status(200).send({data});
            }
        });
    }).catch((error) => {
        console.log(error);
    })
});  

module.exports = router;