const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const generateToken = require("../utils/generatetoken");
const flash = require("connect-flash");


module.exports.registerUser =  async (req, res) => {
    // Logic to register a new user would go here
    try {
      const { fullname, email, password } = req.body;
  
      const userExists = await userModel.findOne({ email });
      if (userExists) {
        req.flash("error", "You already have an account, please login");
        return res.status(400).redirect("/");
      }
      bcrypt.genSalt(10, async function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          // Store hash in your password DB.
          if (err) {
            return res.status(500).send(err.message);
          } else {
            
            let createUser = await userModel.create({
              fullname,
              email,
              password: hash,
            });
              const token = generateToken(createUser);
              res.status(201).cookie("token",token);
              req.flash("success", "Registered successfully");
              res.redirect('/shop');
          }
        });
      });
  
  
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  };

module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if(!user){
      req.flash("error", "Email or password is incorrect"); 
        return res.status(400).redirect("/");
               
    }
    bcrypt.compare(password, user.password, function(err, result) {
        if(result){
            const token = generateToken(user);
            res.status(200).cookie("token",token);
            res.redirect('/shop');
        } else {
            return res.status(400).redirect("/");
        }
    });

}

