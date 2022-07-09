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

exports.order_status_list = order_status_list;
exports.getNextStatus = getNextStatus;
exports.roles = roles;
