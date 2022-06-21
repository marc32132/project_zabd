const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/', require('./routes/index.js'));
app.use(express.static('../frontend2/public'));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully");
});

const userRouter = require('./routes/user');
app.use('/user', userRouter);

const manage = require('./routes/admin');
app.use('/admin', manage);

const classOperations = require('./routes/class');
app.use('/class', classOperations);

const yearOperations = require('./routes/yearGroup');
app.use('/yearGroup', yearOperations);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


// ATLAS_URI=mongodb+srv://PrOj3ctUSER:Pr0j3cTp%40sswOrd@cluster0.pqeve.mongodb.net/Project?retryWrites=true&w=majority
// ACCESS_TOKEN_SECRET=cfe0a575326b0b4b07c0f72912b28a38e42e917b1283da8798abf80caf8adbb21b35f33a3306f6bf13bac1082ad535996fcada713e282346c6bc738d0993fa6e
