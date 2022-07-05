const orderServices = require("../services/orderServices");
const userServices = require("../services/userServices");
const trainServices = require("../services/trainServices");

const viewHome = (req, res) => {
  res.render("pages/login.ejs");
};

const viewDashboard = async (req, res) => {
  const user_id = req.cookies.id;
  // const orders = await orderServices.getOrderDetails();
  const user_role = await userServices.findRole(user_id);
  // console.log(orders);
  roles = {
    SUPERVISOR: "Supervisor",
    DRIVER: "Truck Driver",
    DRIVER_ASSISTANT: "Truck Driver Assistant",
    MANAGER: "Manager",
  };

  switch (user_role) {
    case roles.SUPERVISOR:
      res.render("pages/dashboard_supervisor.ejs");
      await trainServices.makePartitions();
      break;
    case roles.DRIVER:
      res.render("pages/dashboard_driver.ejs");
      break;
    case roles.DRIVER_ASSISTANT:
      res.render("pages/dashboard_assistant.ejs");
      break;
    case roles.MANAGER:
      // res.send("Manager");
      res.render("pages/dashboard_manager.ejs", { orders: [] });
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
