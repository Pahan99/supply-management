const orderServices = require("../services/orderServices");
const userServices = require("../services/userServices");
const trainServices = require("../services/trainServices");
const reportServices = require("../services/reportServices");

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
    case roles.SUPERVISOR: {
      // res.render("pages/dashboard_supervisor.ejs");
      await trainServices.makePartitions();

      const trips = await trainServices.getTrainTrips();

      const records = [];
      // console.log(partitions);
      for (let i = 0; i < trips.length; i++) {
        const trip = trips[i];
        trip.dep_date = formatDate(trip.dep_date);
        const trip_orders = await trainServices.getTrainTripDetails(
          trip.trip_id
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

      console.log(records[1]);
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
      // res.send("Manager");
      res.render("pages/dashboard_manager.ejs", { orders: [] });
      break;
    default:
      break;
  }
};

const viewReports = async (req, res) => {
  const user_id = req.cookies.id;

  const trending_item_details = await reportServices.getTrendingItemsDetails();
  const driver_details = await reportServices.getDriverDetails();
  const total_used_time = await reportServices.getTruckDetails();
  const customer_count = await reportServices.getCustomerCount();
  const total_sales = await reportServices.getTotalSales();
  const order_customer_details = await reportServices.getOrderCustomerDetails();

  const data = {
    driver_details: driver_details.driver_details,
    assistant_details: driver_details.assistant_details,
    trending_item_details: trending_item_details,
    customer_count: customer_count,
    total_sales: total_sales,
    order_customer_details: order_customer_details,
  }

  res.render("pages/report.ejs", { title: "report", data: data });
}

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
  viewHome,
  viewDashboard,
  viewReports,
};
