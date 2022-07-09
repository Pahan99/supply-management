const orderServices = require("../services/orderServices");
const userServices = require("../services/userServices");
const trainServices = require("../services/trainServices");

const { order_status_list } = require("../services/helpers/data");
const { roles } = require("../services/helpers/data");

const viewHome = (req, res) => {
  res.render("pages/login.ejs");
};

const viewDashboard = async (req, res) => {
  const user_id = req.cookies.id;

  const user_role = await userServices.findRole(user_id);
  const user_branch_id = await userServices.findBranch(user_id);

  await trainServices.makePartitions();
  switch (user_role) {
    case roles.SUPERVISOR: {
      // res.render("pages/dashboard_supervisor.ejs");

      const trips = await trainServices.getTrainTrips();

      const records = [];
      // console.log(partitions);
      for (let i = 0; i < trips.length; i++) {
        const trip = trips[i];
        trip.dep_date = trip.dep_date;

        const trip_orders = await trainServices.getTrainTripDetails(
          trip.trip_id,
          order_status_list.NOT_LOADED_TRAIN
        );
        if (trip_orders.length == 0) continue;
        trip_orders.forEach((order) => {
          order.order_date = order.order_dates;
        });
        records.push({
          train_details: trip,
          order_details: trip_orders,
        });
      }

      // console.log(records[1]);
      res.render("pages/dashboard_supervisor.ejs", { records });
      break;
    }
    case roles.DRIVER:
      res.render("pages/dashboard_driver.ejs");
      break;
    case roles.DRIVER_ASSISTANT:
      res.render("pages/dashboard_assistant.ejs");
      break;
    case roles.MANAGER:
      res.render("pages/dashboard_manager.ejs");
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
