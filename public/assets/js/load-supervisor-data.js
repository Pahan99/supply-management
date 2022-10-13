$(window).on("load", async function () {
  $trips = $(".trips");

  const trips = await axios.get("/trains/trips/");
  const train_trips = trips.data;
});
