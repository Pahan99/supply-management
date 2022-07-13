const orderServices = require("../services/orderServices");
const userServices = require("../services/userServices");
const trainServices = require("../services/trainServices");

const {
  order_status_list,
  formatDate,
  formatTime,
} = require("../services/helpers/data");
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
      // return res.json(trips);
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
    case roles.MANAGER:
      const train_trips = await trainServices.getTrainTripsByBranch(
        user_branch_id
      );

      let loaded = [];
      let in_store = [];
      // console.log(partitions);
      // return res.json([train_trips]);
      for (let i = 0; i < train_trips.length; i++) {
        const trip = train_trips[i];
        trip.dep_date = formatDate(trip.dep_date);
        trip.dep_time = formatTime(trip.dep_time);
        const loaded_orders = await trainServices.getTrainTripDetailsByBranch(
          trip.trip_id,
          trip.completed
            ? order_status_list.IN_STORE
            : order_status_list.LOADED_TRAIN,
          user_branch_id
        );
        if (loaded_orders.length == 0) continue;
        loaded_orders.forEach((order) => {
          order.order_date = formatDate(order.order_date);
        });
        if (trip.completed) {
          in_store.push({
            train_details: trip,
            order_details: loaded_orders,
          });
        } else {
          loaded.push({
            train_details: trip,
            order_details: loaded_orders,
          });
        }
      }
      // return res.json(in_store);
      res.render("pages/dashboard_manager.ejs", { loaded ,in_store});
      break;
    case roles.DRIVER:
      res.render("pages/dashboard_driver.ejs");
      break;
    case roles.DRIVER_ASSISTANT:
      res.render("pages/dashboard_assistant.ejs");
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
