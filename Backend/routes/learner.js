const express = require('express');
const router = express.Router();

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

module.exports = router;