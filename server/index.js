/* Controller for all the operations happening in our server */
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/User');
/* Connect to db */
mongoose.connect(keys.mongoURI);

const User = mongoose.model('users');

/* ------------------------------Routes----------------------------- */

/* Returns the current user logged in */
app.get('/api/current_user', function(req, res) {

});

/* Saves the User to the DB */
app.post('/login', async function(req, res) {
    console.log('From /login: ', req);
    const user = await new User({name: 'Devony'}).save();

    // Response object ex: {login: False}
    const resObject = {
        login: false
    }
    res.send(resObject);
});
/* -----------------------------/Routes----------------------------- */

app.use(express.static('public'));
app.listen(5000);
