const express = require("express");
const { route } = require("./ownersRoute");
const router = express.Router();
const {registerUser,loginUser} = require("../controllers/authController");


router.get("/", (req, res) => {
  res.send("Users Route");
});

router.post("/register", registerUser);
router.post("/login", loginUser);



module.exports = router;

