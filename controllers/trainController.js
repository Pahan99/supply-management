const { roles } = require("../services/helpers/data");
const trainServices = require("../services/trainServices");
const userServices = require("../services/userServices");

const confirmTrip = async (req, res) => {
  const trip_id = req.params.id;
  await trainServices.updateTrainOrderPartitions(trip_id);
  res.redirect("/dashboard");
};

const getTrainTrips = async (req, res) => {
  const role = await userServices.findRole(req.cookies.id);
  if (role == roles.SUPERVISOR) {
    const trips = await trainServices.getTrainTrips();
    return res.json(trips);
  }
  const branch_id = await userServices.findBranch(req.cookies.id);
  const trips = await trainServices.getTrainTripsByBranch(branch_id);
  return res.json(trips);
};

const getTrainTripDetails = async (req, res) => {
  const trip_id = req.params.trip;
  const status = req.params.status;
  const role = await userServices.findRole(req.cookies.id);
  if (role == roles.SUPERVISOR) {
    const trip_orders = await trainServices.getTrainTripDetails(
      trip_id,
      status
    );
    return res.json(trip_orders);
  }
  const branch_id = await userServices.findBranch(req.cookies.id);
  const trip_orders = await trainServices.getTrainTripDetailsByBranch(
    trip_id,
    status,
    branch_id
  );
  return res.json(trip_orders);
};

exports.confirmTrip = confirmTrip;
exports.getTrainTrips = getTrainTrips;
exports.getTrainTripDetails = getTrainTripDetails;
