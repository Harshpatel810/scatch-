const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
    fullname:{
        type: String,
        minleangth: 3,
        trim: true
        
    },
    email: {
        type: String,
        
        trim: true,
        
    },
    password:{
        type: String,
        
        trim: true,
        minleangth: 6
    },
    products:{
        type: Array,
        default: []
    },
    picture: String,
    gstin : String,

});

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner; 