const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');

if(process.env.NODE_ENV === "development"){
router.post('/create', async (req, res) => {
    // Logic to create a new owner would go here
    const { fullname, email, password } = req.body || {};
    const owners = await ownerModel.findOne();

    if (owners) {
        return res.status(400).send("Owner already exists — only one owner allowed");
      }

    let createOwner = await ownerModel.create({
        fullname,
        email,
        password
    });
    res.status(201).send(createOwner);

} );
}

router.get('/admin', (req, res) => {
    let success = req.flash("success");
    res.render('createproducts', {success });

} );


module.exports = router;
