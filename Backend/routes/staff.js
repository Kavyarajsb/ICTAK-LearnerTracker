const express = require('express');
const router = express.Router();

const staffCntrlr = require('../controllers/staff')

//read staff list 
router.get('/stafflist', staffCntrlr.getAllStaff)

// read single staff detail
router.get('/staff/:id',staffCntrlr.getOneStaff)

// add new staff
router.post('/staff', staffCntrlr.addStaff)

// update staff detail
router.put('/staff', staffCntrlr.updateStaff)

// delete staff detail
router.delete('/staff/:id', staffCntrlr.deleteStaff)


// Login Api
router.post('/login',staffCntrlr.login);





module.exports = router;