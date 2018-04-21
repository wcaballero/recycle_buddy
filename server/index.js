/* Controller for all the operations happening in our server */
const express = require('express');
const app = express();





/* ------------------------------Routes----------------------------- */

/* Returns the current user logged in */
app.get('/api/current_user', function(req, res) {

});

/* Saves the User to the DB */
app.post('/login', function(req, res) {
    console.log('From /login: ', req);
});

/* -----------------------------/Routes----------------------------- */
app.use(express.static('public'));
app.listen(5000);
