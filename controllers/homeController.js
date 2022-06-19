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

  const roles = {
    SUPERVISOR: "Supervisor",
    MANAGER: "Manager",
    DRIVER: "Truck Driver",
    DRIVER_ASSISTANT: "Truck Driver Assistant",
  };

  // Assign User role here
  const user_role = roles.SUPERVISOR;

  switch (user_role) {
    case roles.SUPERVISOR:
      res.render("pages/dashboard_supervisor.ejs");
      break;
    case roles.DRIVER:
      res.render("pages/dashboard_driver.ejs");
      break;
    case roles.DRIVER_ASSISTANT:
      res.render("pages/dashboard_assistant.ejs");
      break;
    case roles.MANAGER:
      res.render("pages/dashboard_manager.ejs", { trains: trains });
      break;
    default:
      break;
  }
};

function get_order_ids(orders) {
  order_ids = [];
  order_details.forEach((order_detail) => {
    console.log(order_detail.order_id);
  });
}

module.exports = {
  viewHome: viewHome,
  viewDashboard: viewDashboard,
};
