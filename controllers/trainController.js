const trainServices = require("../services/trainServices");

const confirmTrip = async (req, res) => {
  const trip_id = req.params.id;
  await trainServices.updateTrainOrderPartitions(trip_id);
  res.redirect("/dashboard");
};

const getTrainTripsByBranch = async (req, res) => {
  const trips = await trainServices.getTrainTripsByBranch(req.params.branch);
  return res.json(trips);
};

const getTrainTrips = async (req, res) => {
  const trips = await trainServices.getTrainTrips();
  return res.json(trips);
};

exports.confirmTrip = confirmTrip;
exports.getTrainTripsByBranch = getTrainTripsByBranch;
exports.getTrainTrips = getTrainTrips;
