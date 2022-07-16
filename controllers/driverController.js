const driverServices = require("../services/driverServices");
const userServices = require("../services/userServices");

const getDrivers = async (req, res) => {
  const branch_id = await userServices.findBranch(req.cookies.id);
  const driver_list = await driverServices.getAvailableDrivers(branch_id);
  return res.json(driver_list);
};

const updateAvailability = async (req, res) => {
  const user_id = req.cookies.user_id;
  await driverServices.updateAvailability(user_id);
}

module.exports = {
  getDrivers,
  updateAvailability,
}
