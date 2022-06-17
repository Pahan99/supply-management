const trainServices = require("../services/trainServices");

const viewHome = (req, res) => {
  res.render("pages/login.ejs");
};

const viewDashboard = async (req, res) => {
  // Get trains from database
  // const trains = await trainServices.getAllTrains();
  trains = [
    {
      train_name: "Train A",
      start_station: "Colombo",
      end_station: "Galle",
    },
    {
      train_name: "Train B",
      start_station: "Colombo",
      end_station: "Kandy",
    },
    {
      train_name: "Train C",
      start_station: "Colombo",
      end_station: "Jaffna",
    },
  ];
  res.render("pages/dashboard_manager.ejs", { trains: trains });
  // res.render("pages/dashboard_supervisor.ejs");
  // res.render("pages/dashboard_driver.ejs");
  // res.render("pages/dashboard_assistant.ejs");
};

module.exports = {
  viewHome: viewHome,
  viewDashboard: viewDashboard,
};
