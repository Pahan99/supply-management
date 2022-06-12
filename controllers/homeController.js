const viewHome = (req, res) => {
  res.render("pages/login.ejs");
};

const viewDashboard = (req, res) => {
  // res.render("pages/dashboard_manager.ejs");
  // res.render("pages/dashboard_supervisor.ejs");
  res.render("pages/dashboard_driver.ejs");
  // res.render("pages/dashboard_assistant.ejs");
};

module.exports = {
  viewHome: viewHome,
  viewDashboard: viewDashboard,
};
