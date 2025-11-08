const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        minleangth: 3,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minleangth: 6
    },
    cart : {
        type: Array,
        default: []
    },
    isadmin : Boolean,
    orders : {
        type: Array,
        default: []
    },
    contact : Number,
    picture : String,

});

const User = mongoose.model('User', userSchema);

module.exports = User;