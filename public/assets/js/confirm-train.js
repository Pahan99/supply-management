async function confirm(attr) {
  const trip_id = attr;
  await axios.post("/trains/confirm-train/" + trip_id);
  location.replace("/dashboard");
}

// confirm();

$btns = $(".confirmBtn");
$btns.click(function () {
  confirm($(this).attr("id"));
});
