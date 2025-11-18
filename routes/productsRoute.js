const express = require('express');
const router = express.Router();
const upload = require('../config/multer-config');
const Product = require('../models/product-model');

router.post('/create', upload.single("image"), async (req, res) => {
  try {
    const { name, price, description,discount, bgcolor, panelcolor, textcolor } = req.body;

      let product = await Product.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      description,
      bgcolor,
      panelcolor,
      textcolor
    });

    req.flash("success", "Product created successfully");
    res.redirect('/owners/admin');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;

