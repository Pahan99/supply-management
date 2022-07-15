const driverAssistantServices = require("../services/driverAssistantServices");
const userServices = require("../services/userServices");

const getDriverAssistants = async (req, res) => {
  const branch_id = await userServices.findBranch(req.cookies.id);
  const driver_assistant_list = await driverAssistantServices.getAvailableDriverAssistants(branch_id);
  return res.json(driver_assistant_list);
};

exports.getDriverAssistants = getDriverAssistants;
