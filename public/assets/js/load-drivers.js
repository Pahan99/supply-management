let loaded_drivers = false;
$(".driver-select").on("click", async function () {
  if (!loaded_drivers) {
    loaded_drivers = true;
    let drivers = await axios.get("/drivers");

    for (let i = 0; i < drivers.data.length; i++) {
      const driver = drivers.data[i];
      //   console.log(driver);
      $(this).append(
        `<option value="${driver.user_id}">${driver.name}</option>`
      );
    }
  }
});

let loaded_assist = false;
$(".assistant-select").on("click", async function () {
  if (!loaded_assist) {
    loaded_assist = true;
    let drivers = await axios.get("/driver-assistants");

    for (let i = 0; i < drivers.data.length; i++) {
      const driver = drivers.data[i];
      //   console.log(driver);
      $(this).append(
        `<option value="${driver.user_id}">${driver.name}</option>`
      );
    }
  }
});

$(".confirmAssign").on("click", async function () {
  let delivery_id = $(this).attr("id");
  let driver = $(".driver-select").val();
  let assistant = $(".assistant-select").val();
  if (driver == 0 || assistant == 0) {
    $(".warning").html("Please select both driver and assistant !");
  } else {
    $(`#${delivery_id}.delivery`).hide();
    await axios.post(
      `/trucks/update-assigned/${delivery_id}/${driver}/${assistant}`
    );
    // $(`#${delivery _id}`).hide();
    // location.reload();
    // $("#nav-schedule").trigger("click");
  }
});
