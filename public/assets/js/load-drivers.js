let loaded = false;
$(".driver-select").on("click", async function () {
  if (!loaded) {
    loaded = true;
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
