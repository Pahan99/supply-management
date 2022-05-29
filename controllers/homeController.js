const viewHome = (req, res) => {
  res.render("pages/home.ejs");
};

module.exports = {
  viewHome: viewHome,
};
