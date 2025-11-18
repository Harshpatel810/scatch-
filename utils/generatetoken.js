const jwt = require("jsonwebtoken");

function generateToken(createUser) {
  return jwt.sign({email:createUser.email , id: createUser._id}, process.env.JWT_KEY);

}
module.exports = generateToken;