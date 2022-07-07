$(window).on("load", async function () {
  let element = $(".content");
  const branch = element.attr("id");
  const trips = await axios.get("/trains/trips/" + branch);
  const train_trips = trips.data;
  for (let i = 0; i < train_trips.length; i++) {
    let trip = train_trips[i];
    let element_id = "#" + trip.trip_id;
    console.log($(element_id));
  }
});
