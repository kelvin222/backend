const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const mongoose = require('mongoose');
const admin = require('./routes/admin');
const agent = require('./routes/agent');
const chat = require('./routes/chat');
const coschat = require('./routes/coschat');
const expired = require('./routes/expired');
const notice = require('./routes/notice');
const order = require('./routes/order');
const payment = require('./routes/payment');
const payout = require('./routes/payout');
const product = require('./routes/product');
const store = require('./routes/store');
const category = require('./routes/category');
const sub = require('./routes/sub');
const sublist = require('./routes/sublist');
const user = require('./routes/user');
const withdrawal = require('./routes/withdrawal');

const app = express();

//upload config
const fileStorage = multer.diskStorage({ //setting up storage config for file upload
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => { //Allowing only certain types of files to be uploaded

    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')); //File Storage Middleware
app.use(express.static(path.join(__dirname, 'public'))); //Static File Declaration middleware, public folder in our case to display css
app.use('/images', express.static(path.join(__dirname, 'images'))); //Server files statically for every request to /images



// load env vars
dotenv.config({ path:'./config/config.env'});



//Connect to db
connectDB();
//Body parser
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/v1/admin', admin);
app.use('/api/v1/agent', agent);
app.use('/api/v1/chat', chat);
app.use('/api/v1/coschat', coschat);
app.use('/api/v1/order', order);
app.use('/api/v1/notice', notice);
app.use('/api/v1/expired', expired);
app.use('/api/v1/payment', payment);
app.use('/api/v1/payout', payout);
app.use('/api/v1/product', product);
app.use('/api/v1/withdrawal', withdrawal);
app.use('/api/v1/sub', sub);
app.use('/api/v1/user', user); 
app.use('/api/v1/store', store);
app.use('/api/v1/category', category);
app.use('/api/v1/sublist', sublist);



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => 
console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);