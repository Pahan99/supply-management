const orderServices = require("../services/orderServices");
const userServices = require("../services/userServices");
const trainServices = require("../services/trainServices");
const truckServices = require("../services/truckServices");
const timeFormat = require("../services/helpers/timeFormat");
const reportServices = require("../services/reportServices");

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

  switch (user_role) {
    case roles.SUPERVISOR: {
      await trainServices.makePartitions();
      // res.render("pages/dashboard_supervisor.ejs");

      const trips = await trainServices.getTrainTrips();
      // return res.json(trips);
      const records = [];
      // console.log(partitions);
      for (let i = 0; i < trips.length; i++) {
        const trip = trips[i];
        trip.dep_date = formatDate(trip.dep_date);
        trip.dep_time = formatTime(trip.dep_time);

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
    case roles.MANAGER:
      // console.log(user_branch_id);
      await truckServices.makePartitions(user_branch_id);
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

      // truck details
      const routes = await truckServices.getRouteswithOrders(user_branch_id);
      const data = [];
      console.log(routes);
      for (let i = 0; i < routes.length; i++) {
        const delivery_IDs = await truckServices.getDeliveryID(
          routes[i].route_id
        );
        for (let j = 0; j < delivery_IDs.length; j++) {
          const sect = [];
          if (delivery_IDs[j].delivery_id == null) continue;
          const truckData = await truckServices.getTruckData(
            delivery_IDs[j].delivery_id
          );
          const truckdetails = [
            routes[i].route_id,
            routes[i].route_name,
            truckData[0].truck_id,
            truckData[0].vehicle_no,
            delivery_IDs[j].delivery_id,
          ];
          const viewData = await truckServices.getViewOrdersData(
            delivery_IDs[j].delivery_id
          );
          // console.log(viewData);
          // break;
          for (let k = 0; k < viewData.length; k++) {
            viewData[k].order_date = formatDate(viewData[k].order_date);

            viewData[k].delivery_date = formatDate(viewData[k].delivery_date);
          }
          sect.push(truckdetails);
          for (let k = 0; k < viewData.length; k++) {
            sect.push(viewData[k]);
          }
          data.push(sect);
        }
      }
      // res.json(data);
      res.render("pages/dashboard_manager.ejs", { loaded, in_store, data });
      break;

    case roles.DRIVER: {
      await truckServices.makePartitions(user_branch_id);
      const del_details = await truckServices.getTruckDeliveriesByDriver(
        user_id
      );
      let record_list = ["None", 0];
      let order_ids = [];
      // console.log(del_details);
      if (del_details.length != 0) {
        const delivery_id = del_details[0].delivery_id;
        const route_id = del_details[0].route_id;
        const route = await truckServices.getRouteByRouteID(route_id);
        const order_details =
          await truckServices.getTruckDeliveriesByDeliveryDetail(delivery_id);

        record_list = {
          route: route[0].route_name,
          delivery_id: delivery_id,
        };
        order_ids = Object.keys(record_list);
        // console.log(order_details);
        for (let i = 0; i < order_details.length; i++) {
          const order_detail = order_details[i];
          const order_id = order_detail.order_id;
          if (!order_ids.includes(order_id)) {
            order_ids.push(order_id);
            record_list[order_id] = {
              order_id: order_id,
              customer: order_detail.customer_name,
              address: order_detail.address,
              order_date: formatDate(order_detail.order_date),
              due_date: formatDate(order_detail.delivery_date),
              products: [],
            };
          }
          product_detail = {
            product_id: order_detail.product_id,
            product_name: order_detail.product_name,
            quantity: order_detail.quantity,
            unit_price: order_detail.unit_price,
          };
          record_list[order_id].products.push(product_detail);
        }
        order_ids = order_ids.slice(2, order_ids.length);
        record_list = Object.values(record_list);
      }
      console.log(record_list[0]);
      res.render("pages/dashboard_driver.ejs", { record_list });

      break;
    }
    case roles.DRIVER_ASSISTANT: {
      await truckServices.makePartitions(user_branch_id);
      const del_details = await truckServices.getTruckDeliveriesByAssistant(
        user_id
      );
      // console.log(del_details);
      let record_list = [];
      for (let i = 0; i < del_details.length; i++) {
        const del_detail = del_details[i];
        const delivery_id = del_detail.delivery_id;
        const route_id = del_detail.route_id;
        const route = await truckServices.getRouteByRouteID(route_id);
        const order_details =
          await truckServices.getTruckDeliveriesByDeliveryDetail(delivery_id);
        let record = { route: route[0].route_name, delivery_id: delivery_id };
        const order_ids = Object.keys(record);
        for (let i = 0; i < order_details.length; i++) {
          const order_detail = order_details[i];
          const order_id = order_detail.order_id;
          if (!order_ids.includes(order_id)) {
            order_ids.push(order_id);
            record[order_id] = {
              order_id: order_id,
              customer: order_detail.customer_name,
              address: order_detail.address,
              order_date: formatDate(order_detail.order_date),
              due_date: formatDate(order_detail.delivery_date),
              products: [],
            };
          }
          product_detail = {
            product_id: order_detail.product_id,
            product_name: order_detail.product_name,
            quantity: order_detail.quantity,
            unit_price: order_detail.unit_price,
          };
          record[order_id].products.push(product_detail);
        }
        // console.log(delivery_id);
        record_list.push(Object.values(record));
      }

      // console.log(record_list);
      res.render("pages/dashboard_assistant.ejs", { record_list });
      break;
    }
    default:
      break;
  }
};

const viewReports = async (req, res) => {
  const user_id = req.cookies.id;

  const trending_item_details = await reportServices.getTrendingItemsDetails();
  const driver_details = await reportServices.getDriverDetails();
  const used_hours = await reportServices.getTruckDetails();
  const customer_count = await reportServices.getCustomerCount();
  const total_sales = await reportServices.getTotalSales();
  const order_customer_details = await reportServices.getOrderCustomerDetails();

  const data = {
    driver_details: driver_details.driver_details,
    assistant_details: driver_details.assistant_details,
    trending_item_details: trending_item_details,
    customer_count: customer_count,
    total_sales: total_sales ? total_sales : 0,
    order_customer_details: order_customer_details,
    used_hours: used_hours,
  };

  res.render("pages/report.ejs", { title: "report", data: data });
};

function get_order_ids(orders) {
  order_ids = [];
  order_details.forEach((order_detail) => {
    console.log(order_detail.order_id);
  });
}

module.exports = {
  viewHome,
  viewDashboard,
  viewReports,
};
