const viewHome = (req, res) => {
  res.render("pages/login.ejs");
};

const viewDashboard = (req, res) => {
  res.render("pages/dashboard_manager.ejs");
};



module.exports = {
  viewHome: viewHome,
  viewDashboard: viewDashboard
};
