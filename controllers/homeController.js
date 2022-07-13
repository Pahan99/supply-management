const orderServices = require("../services/orderServices");
const userServices = require("../services/userServices");
const trainServices = require("../services/trainServices");
const truckServices = require("../services/truckServices");
const timeFormat = require("../services/helpers/timeFormat")

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
      const routes = await truckServices.getRouteswithOrders(user_branch_id);
      const data = [];
      for (let i = 0; i < routes.length; i++) {
        const delivery_IDs = await truckServices.getDeliveryID(routes[i].route_id);
        for (let j = 0; j < delivery_IDs.length; j++) {
            const sect = [];
            const truckData = await truckServices.getTruckData(delivery_IDs[j].delivery_id);
            const truckdetails = [routes[i].route_id, routes[i].route_name, truckData[0].truck_id, truckData[0].vehicle_no];
            const viewData = await truckServices.getViewOrdersData(delivery_IDs[j].delivery_id);
            for (let k = 0; k < viewData.length; k++) {
              viewData[k].order_date = timeFormat.formatTime(viewData[k].order_date).slice(0,15);
              viewData[k].delivery_date = timeFormat.formatTime(viewData[k].delivery_date).slice(0,15);
            }
            sect.push(truckdetails);
            for (let k = 0; k < viewData.length; k++) {
              sect.push(viewData[k]);
            }
            data.push(sect);
        }   
      }
      res.render("pages/dashboard_manager.ejs", { loaded ,in_store,data});
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
