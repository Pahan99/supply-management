const driverAssistantServices = require("../services/driverAssistantServices");
const userServices = require("../services/userServices");

const getDriverAssistants = async (req, res) => {
  const branch_id = await userServices.findBranch(req.cookies.id);
  const driver_assistant_list = await driverAssistantServices.getAvailableDriverAssistants(branch_id);
  return res.json(driver_assistant_list);
};

const updateAvailability = async (req, res) => {
  const user_id = req.cookies.id;
  await driverAssistantServices.updateAvailability(user_id);
}

const getAvailability = async (req, res) => {
  const user_id = req.cookies.id;
  const availability = await driverAssistantServices.getAvailability(user_id);
  return res.json(availability);
}

module.exports = {
  getDriverAssistants,
  updateAvailability,
  getAvailability,
}
