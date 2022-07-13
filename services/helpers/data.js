order_status_list = {
  NOT_LOADED_TRAIN: "not_loaded_train",
  LOADED_TRAIN: "loaded_train",
  IN_STORE: "in_store",
  LOADED_TRUCK: "loaded_truck",
  COMPLETED: "completed",
};
roles = {
  SUPERVISOR: "Supervisor",
  DRIVER: "Truck Driver",
  DRIVER_ASSISTANT: "Truck Driver Assistant",
  MANAGER: "Manager",
};

const getNextStatus = (current_status) => {
  const values = Object.values(order_status_list);
  const next_status = values.indexOf(current_status) + 1;
  if (next_status == values.length) return current_status;
  return order_status_list[Object.keys(order_status_list)[next_status]];
};

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
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    time = time.slice(1);
    time[5] = +time[0] < 12 ? " AM" : " PM";
    time[0] = +time[0] % 12 || 12;
  }
  time.splice(3, 1);
  return time.join("");
}

exports.order_status_list = order_status_list;
exports.getNextStatus = getNextStatus;
exports.roles = roles;
exports.formatDate = formatDate;
exports.formatTime = formatTime;
