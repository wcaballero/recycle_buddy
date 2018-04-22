/* User Model - describes each user */
const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    fName: String,
    lName: String,
    username: String,
    email: String,
    password: String,
    phone: String,
    score: {type: Number, default: 0}
});

mongoose.model('users', userSchema);