const orderServices = require("../services/orderServices");
const userServices = require("../services/userServices");
const trainServices = require("../services/trainServices");

const { order_status_list } = require("../services/helpers/data");

const viewHome = (req, res) => {
  res.render("pages/login.ejs");
};

const viewDashboard = async (req, res) => {
  const user_id = req.cookies.id;

  const user_role = await userServices.findRole(user_id);
  const user_branch_id = await userServices.findBranch(user_id);
  // console.log(user_branch_id);
  roles = {
    SUPERVISOR: "Supervisor",
    DRIVER: "Truck Driver",
    DRIVER_ASSISTANT: "Truck Driver Assistant",
    MANAGER: "Manager",
  };

  await trainServices.makePartitions();
  switch (user_role) {
    case roles.SUPERVISOR: {
      // res.render("pages/dashboard_supervisor.ejs");

      const trips = await trainServices.getTrainTrips();

      const records = [];
      // console.log(partitions);
      for (let i = 0; i < trips.length; i++) {
        const trip = trips[i];
        trip.dep_date = formatDate(trip.dep_date);

        const trip_orders = await trainServices.getTrainTripDetails(
          trip.trip_id,
          order_status_list.NOT_LOADED_TRAIN
        );
        if (trip_orders.length == 0) continue;
        trip_orders.forEach((order) => {
          order.order_date = formatDate(order.order_date);
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
      const trips = await trainServices.getTrainTripsByBranch(user_branch_id);

      const loaded = [];
      const in_store = [];
      // console.log(partitions);
      for (let i = 0; i < trips.length; i++) {
        const trip = trips[i];
        trip.dep_date = formatDate(trip.dep_date);
        const loaded_trains = await trainServices.getTrainTripDetailsByBranch(
          trip.trip_id,
          order_status_list.LOADED_TRAIN,
          user_branch_id
        );
        const in_store_details =
          await trainServices.getTrainTripDetailsByBranch(
            trip.trip_id,
            order_status_list.IN_STORE,
            user_branch_id
          );

        if (loaded_trains.length != 0) {
          loaded_trains.forEach((order) => {
            order.order_date = formatDate(order.order_date);
          });

          loaded.push({
            train_details: trip,
            order_details: loaded_trains,
          });
        }
        if (in_store_details.length != 0) {
          in_store_details.forEach((order) => {
            order.order_date = formatDate(order.order_date);
          });

          in_store.push({
            train_details: trip,
            order_details: in_store_details,
          });
        }
      }

      res.render("pages/dashboard_manager.ejs", {
        loaded,
        in_store,
        user_branch_id,
      });
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

function formatDate(date) {
  let day = new Date(date);
  const yyyy = day.getFullYear();
  let mm = day.getMonth() + 1; // Months start at 0!
  let dd = day.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  day = yyyy + "-" + mm + "-" + dd;
  return day;
}

function formatTime(time) {
  // let time
  // var hours = time.getHours();
  // var minutes = time.getMinutes();
  // var ampm = hours >= 12 ? "pm" : "am";
  // hours = hours % 12;
  // hours = hours ? hours : 12; // the hour '0' should be '12'
  // minutes = minutes < 10 ? "0" + minutes : minutes;
  // var strTime = hours + ":" + minutes + " " + ampm;
  // console.log(strTime);
  // return strTime;
}

module.exports = {
  viewHome: viewHome,
  viewDashboard: viewDashboard,
};
