/* Controller for all the operations happening in our server */
const express = require('express');
const app = express();





/* ------------------------------Routes----------------------------- */
app.get('/', function(req, res) {
    console.log('Testing / Path');
});

/* Returns the current user logged in */
app.get('/api/current_user', function(req, res) {

});

/* Saves the User to the DB */
app.post('/login', function(req, res) {
    console.log('From /login: ', req);
});

/* -----------------------------/Routes----------------------------- */

app.listen(5000);