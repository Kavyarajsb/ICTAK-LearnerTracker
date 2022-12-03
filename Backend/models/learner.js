const mongoose = require('mongoose');
const learnerSchema = new mongoose.Schema({
    learnerid:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    course:{
        type: String,
        required: true
    },
    project:{
        type: String,
        required: true
    },
    batch:{
        type: String,
        required: true
    },
    coursestatus:{
        type: String
    },
    placementstatus:{
        type: String
    },
    createddt:{
        type: Date,
        default: Date.now()
    }
});

const learnerInfo = mongoose.model('learner',learnerSchema);
module.exports = learnerInfo;