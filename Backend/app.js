const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const multer = require('multer');
const csv = require('csvtojson');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
});
const uploads = multer({ storage: storage });

require('./middleware/mongoDB')  // initiate mongodb connection

const app = new express();
app.use(cors()); // help to connect frontend and backend seemlessly
app.use(express.json()); //receive data from frontend to backend
app.use(express.urlencoded({extended:true})); // useful when we use files,imgs etc
app.use(logger('dev'));
//app.use(express.static(path.resolve(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

const staffApi = require('./routes/staff');
app.use('/api',staffApi);
const learnerApi = require('./routes/learner');
app.use('/api',learnerApi);




//server code
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})