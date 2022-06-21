const jwt = require('jsonwebtoken');
const userServices = require("../services/userServices");

require("dotenv").config();

// one day in seconds
const maxAge = 24*60*60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: maxAge
  });
}

const handleLogin = async (req, res) => {
  const user_details = await userServices.findUser(req.body.username);
  // console.log(user_details);
  if (user_details.length == 0) return res.json({ valid: false });

  const user = user_details[0];
  // console.log(user);
  if (user.password !== req.body.password) return res.json({ valid: false });

  const token = createToken(user.user_id);
  res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000 });
  res.cookie('id', user.user_id, { httpOnly: true, maxAge: maxAge*1000 });
  // console.log(token);

  return res.status(201).json({ valid: true });
};

const handleLogout = async (req, res) => {
  console.log("You logged out");
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}

module.exports = {
  handleLogin,
  handleLogout
};
    