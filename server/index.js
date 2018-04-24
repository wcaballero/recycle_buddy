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

/* ------------------------------Routes----------------------------- */

/* Returns the current user logged in */
app.get('/api/current_user', async function(req, res) {
    console.log("Get current User");
    const user = await fetchUser(req.body.user);
    res.send(user);
});

app.post('/api/recycle', async function(req, res){
    console.log(req.body);
    const UserModel = await User.findOne({username: req.body.username});
    const resObject = {}
    if (UserModel) {
        console.log("Model score: ", UserModel.score);
        console.log("Body Score: ", req.body.score);
        let updatedScore = parseInt(UserModel.score) + parseInt(req.body.quantity);
        // Updae DB with new score
        UserModel.score = updatedScore
        await UserModel.save();
        resObject.score = updatedScore;
    }
    console.log(resObject);
    res.send(JSON.stringify(resObject));
});

/* Saves the User to the DB */
app.post('/register', async function(req, res) {
    console.log('From /register: ', req.body);
    const {fName, lName, username, email, password, phone} = req.body

    const user = await  User({fName, lName, username, email, password, phone}).save();
    console.log(user);
    const registered = {};
    if (user != null) {
        registered.registered = "True";
        registered.fName = user.fName;
        registered.score = user.score;
        registered.username = user.username;
    }
    else {
        registered.registered = "False";
    }
    res.send(registered);
});

/* Checks if User exists in db */
app.post('/login', async function(req, res) {
    console.log("LOGIN: ", req.body);
    const pass = req.body.password;
    const user = req.body.username;
    const UserModel = await User.findOne({username: user});
    console.log("LOGIN USER: ", UserModel);
    const resObject = {};
    if (UserModel.password == pass && UserModel != null) {
        resObject.login = "True";
        resObject.fName = UserModel.fName;
        resObject.score = UserModel.score;
        resObject.username = UserModel.username;
    }
    else {
        resObject.login = "False";
    }
    // Response object ex: {login: False}
    res.send(resObject);
});

async function fetchUser(getUsername) {
    const user = await User.findOne({username: getUsername});
    console.log("User: ", user);
    const resObject = {};
    if (user) {
        return user;
    }
    return null;
}
/* -----------------------------/Routes----------------------------- */

app.use(express.static('public'));
app.listen(5000);
