const userServices = require("../services/userServices");

const handleLogin = async (req, res) => {
  const user_details = await userServices.findUser(req.body.username);
  if (user_details.length == 0) return res.send("No user");

  const user = user_details[0];
  if (user.password !== req.body.password) return res.send("Wrong password");

  return res.json(user_details[0]);
};

module.exports = {
  handleLogin: handleLogin,
};
