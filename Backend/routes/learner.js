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

//count the number of  learners
router.get('/learnercount', learnerCntrlr.countLearner)

//count the number of learners doing course "FSD"
router.get('/learnerFSD', learnerCntrlr.countFSD)

//count the number of learners doing course "ML-AI"
router.get('/learnerMLAI', learnerCntrlr.countMLAI)

//count the number of learners doing course "CSA"
router.get('/learnerCSA', learnerCntrlr.countCSA)

//count the number of learners doing course "DSA"
router.get('/learnerDSA', learnerCntrlr.countDSA)

//count the number of learners doing course "ST"
router.get('/learnerST', learnerCntrlr.countST)

//count the number of learners doing course "RPA"
router.get('/learnerRPA', learnerCntrlr.countRPA)

//count the number of  placed
router.get('/placedcount', learnerCntrlr.countPlaced)

//count the number of  job seeking
router.get('/jobseekingcount', learnerCntrlr.countJobseeking)

//count the number of  not interested
router.get('/notinterestedcount', learnerCntrlr.countNotinterested)

module.exports = router;