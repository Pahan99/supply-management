const truckServices = require("../services/truckServices");

const updateAssigned = async (req, res) => {
  const delivery_id = req.params.delivery;
  const driver_id = req.params.driver;
  const assistant_id = req.params.assistant;
  await truckServices.updateAssigned(delivery_id, driver_id, assistant_id);
  return res.json(true);
};

exports.updateAssigned = updateAssigned;
