const express = require('express');
const { route } = require('./ownersRoute');
const Product = require('../models/product-model');
const userModel = require('../models/user-model');
const isLoggedIn = require('../middlewares/isLoggedIn');
const router = express.Router();
const flash = require('connect-flash');

router.get('/', (req, res) => {
    let error =req.flash("error");
    let success = req.flash("success");
    res.render("index", { error, success, loggedin:false });

} );

router.get('/addtocart/:productid',isLoggedIn ,async(req, res) => {
      let user = await userModel.findOne({email: req.user.email});
      user.cart.push(req.params.productid);
      await user.save();
      req.flash("success", "Product added to cart successfully");
      res.redirect('/shop');

} );
router.get('/cart', isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email }).populate('cart');

  let bill = 0;

  user.cart.forEach(item => {
    bill += (Number(item.price) + 20) - Number(item.discount);
  });

  console.log(bill);

  res.render("cart", { user, bill });
});
  




router.get('/shop', isLoggedIn, async(req, res) => {
    let success = req.flash("success");
    try {
      const products = await Product.find({});
      res.render("shop", { products, user: req.user ,success});
    } catch (err) {
      console.log(err);
      res.render("shop", { products: [], user: req.user });
    }
  });
  
  router.get("/logout", isLoggedIn,async (req, res) => {
    res.clearCookie("token");
    req.flash("success", "Logged out successfully");
    res.redirect("/");
  });

module.exports = router;