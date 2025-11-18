const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function isLoggedIn(req, res, next) {
    if(!req.cookies || !req.cookies.token){
        req.flash("error", "You must be logged in to access this page");
        return res.redirect("/");
    }
    
    try{
        const decoded = jwt.verify(req.cookies.token,process.env.JWT_KEY);
        const user = await userModel.findOne({email:decoded.email, _id:decoded.id})
        .select("-password");

        req.user = user;
        next();

    }
    catch(err){
        console.log(err);
        req.flash("error", "You must be logged in to access this page");
        return  res.redirect("/");
    }   
}