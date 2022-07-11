const orderServices = require("../services/orderServices");
const userServices = require("../services/userServices");
const trainServices = require("../services/trainServices");
const truckServices = require("../services/truckServices");
const timeFormat = require("../services/helpers/timeFormat")

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
      //console.log(data);
      res.render("pages/dashboard_manager.ejs",{data});
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
