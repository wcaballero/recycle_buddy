/* Controller for all the operations happening in our server */
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
require('./models/User');
app.use(bodyParser.json());

/* Connect to db */
mongoose.connect(keys.mongoURI);

const User = mongoose.model('users');

const execPHP = require('./services/execphp.js')();

execPHP.phpFolder = './phpFolder';

// app.use('*.php',function(request,response,next) {
// 	execPHP.parseFile(request.originalUrl,function(phpResult) {
// 		response.write(phpResult);
// 		response.end();
// 	});
// });

/* ------------------------------Routes----------------------------- */

/* Returns the current user logged in */
app.get('/api/current_user', function(req, res) {

});

/* Saves the User to the DB */
app.post('/register', async function(req, res) {
    console.log('From /register: ', req.body);
    const {username, phone, email, password} = req.body
    
    const user = await  User({username, phone, email, password}).save();
    console.log(user);
    const other = {registed: "Yes"};
    res.send(other);
});

/* Checks if User exists in db */
app.post('/login', async function(req, res) {
    console.log('From /login: ', req.body);
    const user = await User.findOne({username: req.body.username});
    console.log("User: ", user);
    const resObject = {};
    if (user) {
        resObject.login = "True";
    } 
    else {
        resObject.login = "False";
    }
    // Response object ex: {login: False}
    res.send(resObject);
});
/* -----------------------------/Routes----------------------------- */

app.use(express.static('public'));
app.listen(5000);
