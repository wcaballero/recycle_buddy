/* User Model - describes each user */
const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name: String,
    phone: String,
    email: String,
    password: String
});

mongoose.model('users', userSchema);