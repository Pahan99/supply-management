const viewLogin = (req, res) => {
    console.log("Login");
    res.render("pages/login.ejs");
  };

  module.exports={
      viewLogin : viewLogin
  }