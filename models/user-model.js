const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        minleangth: 3,
        trim: true,
        
    },
    email: {
        type: String,
        
        trim: true,
        
    },
    password:{
        type: String,
        
        trim: true,
        
    },
    cart : [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        }
    ],
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