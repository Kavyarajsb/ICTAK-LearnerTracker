const learnerInfo = require('../models/learner');

//read learner list 
exports.getAllLearners= async(req,res)=>{
    try {
        const list = await learnerInfo.find();
        res.send(list);
    }
    catch(error) {
        console.log(error);
    }
}

// read single learnerInfo detail
exports.getOneLearner=async(req,res)=>{
    try {
        let id = req.params.id;
        let learner = await learnerInfo.findById({'_id': id});
        res.send(learner);
    }
    catch(error) {
        console.log(error);
    }
}

// add new learner
exports.addLearner= async(req,res)=>{
    try {
        // store the front end entered details in server variable
        console.log(req.body);
           let learnernew ={
                learnerid: req.body.learnerid,
                name: req.body.name,
                course: req.body.course,
                project: req.body.project,
                batch : req.body.batch,
                coursestatus: req.body.coursestatus,
                placementstatus: req.body.placementstatus
            }

            let learner = new learnerInfo(learnernew);
            let saveLearner = learner.save();
            res.send(saveLearner);                           
    }
    catch(error) {
        console.log(error);
    }
}

// update learner detail
exports.updateLearner= async(req, res) => {
    try {
        let id = req.body._id;
        let learner ={
            learnerid: req.body.learnerid,
            name: req.body.name,
            course: req.body.course,
            project: req.body.project,
            batch : req.body.batch,
            coursestatus: req.body.coursestatus,
            placementstatus: req.body.placementstatus
        }
        let updateLearner = { $set: learner };
        let updateInfo = await learnerInfo.findByIdAndUpdate({'_id': id }, updateLearner);
        res.send(updateInfo)
    } catch (error) {
        console.log(error);
    }
}

// delete learner detail
exports.deleteLearner= async(req,res)=>{
    try {
        let id = req.params.id;
        let deleteLearner = await learnerInfo.deleteOne({'_id':id});
        res.send(deleteLearner);
    }
    catch(error) {
        console.log(error);   
    }
}

