const driverServices = require("../services/driverServices");
const userServices = require("../services/userServices");

const getDrivers = async (req, res) => {
  const branch_id = await userServices.findBranch(req.cookies.id);
  const driver_list = await driverServices.getAvailableDrivers(branch_id);
  return res.json(driver_list);
};

const updateAvailability = async (req, res) => {
  const user_id = req.cookies.id;
  await driverServices.updateAvailability(user_id);
}

const getAvailability = async (req, res) => {
  const user_id = req.cookies.id;
  const availability = await driverServices.getAvailability(user_id);
  return availability;
}

module.exports = {
  getDrivers,
  updateAvailability,
  getAvailability,
}
