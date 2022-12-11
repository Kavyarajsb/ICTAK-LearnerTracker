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

//get count of Training Head
router.get('/staffthcount', staffCntrlr.countTh)

//get count of Placement Officer
router.get('/staffpocount', staffCntrlr.countPO)


// Login Api
router.post('/login',staffCntrlr.login);

// count
// router.get('/stafflist', staffCntrlr.countTh)

// router.route('/staff/count').get((req, res, next) => {
//     Staff.aggregate([
//         {
//             $group: {
//                 _id: 1,
//                 count: {
//                     $sum: 1
//                 }
//             }
//         },
//     ],
//         (error, data) => {
//             if (error) {
//                 return next(error);
//             } else {
//                 res.json(data);
//             }
//         }
//     );
// });





module.exports = router;