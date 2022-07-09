async function confirm(id) {
  const trip_id = id;
  await axios.post("/trains/confirm-train/" + trip_id);
  let trip = "#trip" + id;
  $tr = $(trip);
  $tr.hide();

  // location.replace("/dashboard");
}

// confirm();

$btns = $(".confirmBtn");
$btns.click(function () {
  confirm($(this).attr("id"));
});
