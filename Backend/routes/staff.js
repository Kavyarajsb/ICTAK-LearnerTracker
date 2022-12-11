const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const staffCntrlr = require('../controllers/staff')

// Token Verification

function verifytoken(req,res,next){
    if (!req.headers.authorization)
    {
        return res.status(401).send('Unauthorised Request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token=='null')
    {
        return res.status(401).send('Unauthorised Request')
    }
    let payload = jwt.verify(token,'secretKey')
    console.log(payload)
    if(!payload)
    {
        return res.status(401).send('Unauthorised Request')
    }
    req.role=payload.subject
    next()
}
//read staff list 
router.get('/stafflist',verifytoken, staffCntrlr.getAllStaff)

// read single staff detail
router.get('/staff/:id',verifytoken, staffCntrlr.getOneStaff)

// add new staff
router.post('/staff',verifytoken, staffCntrlr.addStaff)

// update staff detail
router.put('/staff',verifytoken, staffCntrlr.updateStaff)

// delete staff detail
router.delete('/staff/:id',verifytoken, staffCntrlr.deleteStaff)

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