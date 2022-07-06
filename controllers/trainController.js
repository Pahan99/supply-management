const trainServices = require("../services/trainServices");

const confirmTrip = async (req, res) => {
  const trip_id = req.params.id;
  await trainServices.updateTrainOrderPartitions(trip_id);
  res.redirect("/dashboard");
};

exports.confirmTrip = confirmTrip;
