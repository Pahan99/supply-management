const trainServices = require("../services/trainServices");

const viewHome = (req, res) => {
  res.render("pages/login.ejs");
};

const viewDashboard = async (req, res) => {
  // Get trains from database
  let orders = await trainServices.getAllTrains();
  console.log(orders[0]);
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

function get_order_ids(orders) {
  order_ids= [];
  order_details.forEach(order_detail => {
    console.log(order_detail.order_id);
  });
}


module.exports = {
  viewHome: viewHome,
  viewDashboard: viewDashboard,
};
