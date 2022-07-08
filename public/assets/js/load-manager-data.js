$(window).on("load", async function () {
  $("#nav-recieved-tab").trigger("click");
  $("#nav-ontheway-tab").trigger("click");
});
let on_the_way = false;
let received = false;

$("#nav-recieved-tab").on("click", async function () {
  if (!received) {
    received = true;
  }
});

$("#nav-ontheway-tab").on("click", async function () {
  if (!on_the_way) {
    on_the_way = true;
    const trips = await axios.get("/trains/trips/");
    const train_trips = trips.data;
    console.log(train_trips);
    $trips = $(".loadedTrips");

    for (let i = 0; i < train_trips.length; i++) {
      let trip = train_trips[i];

      let element_id = "#trip" + trip.trip_id;
      // let inner =
      $trips.append(
        `<div class="my-3 px-3 d-grid accordion" id="trip${trip.trip_id}"></div>`
      );
      $(element_id).append(`<div class="row accordion-item">
      <div class="accordion-body col-md-7 col-10">
      <h5 class="title route text-dark"><i class="fa fa-train"></i>&nbsp;Kandy - ${
        trip.destination
      }</h5> 
      <small>${trip.train_name}</small><hr/>
      <p class="text-sm capacity">
      <i class="fa fa-weight"></i>&nbsp;&nbsp;Capacity: ${trip.occupied}  / ${
        trip.capacity
      } kg
    </p>
    <p class="text-sm date">
      <i class="fa fa-calendar"></i>&nbsp;&nbsp;Departure Date:
      ${formatDate(trip.dep_date)}
    </p>
    <p class="text-sm journey-start">
      <i class="fa fa-clock"></i>&nbsp;&nbsp;Journey
      Start: ${formatTime(trip.dep_time)}
    </p>                    
    </div>
    <div
      class="buttons col-md-5 col-10 d-flex align-items-end justify-content-end"
    >
      <button
        type="button"
        class="btn btn-dark m-2 collapsed viewProducts"
        data-bs-toggle="collapse"
        data-bs-target="#ontheway-products-${trip.trip_id}"
        aria-expanded="false"
        aria-controls="products${trip.trip_id}"
        id=${trip.trip_id}
      >
        View Products
      </button>
      <button
        id=${trip.trip_id}
        class="confirmBtn btn btn-danger m-2"
      >
        Confirm
      </button>
    </div>
    <div
      id="ontheway-products-${trip.trip_id}"
      class="accordion-collapse collapse"
      aria-labelledby="products-details"
      data-bs-parent="#trip${trip.trip_id}"
    >
    </div>
    </div>`);
    }

    $viewProd = $(".viewProducts");
    let loaded = false;
    $viewProd.click(async function () {
      if (loaded) return;
      loaded = true;
      await loadOrders($viewProd.attr("id"), "loaded_train");
    });
  }
});

async function loadOrders(trip_id, status) {
  const orders = await axios.get(`trains/trip-details/${trip_id}/${status}`);
  if (orders.data.length > 0) {
    $orders = $(`#ontheway-products-${trip_id}`);
    $orders.append(`
    <div class="accordion-body">
    <table
      class="table table-striped table-hover products-details"
    >
      <thead>
        <tr>
          <th scope="col">Order Date</th>
          <th scope="col">Quantity</th>
          <th scope="col">Weight</th>
        </tr>
      </thead>
      <tbody id="product-list-${trip_id}">
      </tbody>
    </table>
    </div>`);
    let order_details = orders.data;
    order_details.forEach((order) => {
      $(`#product-list-${trip_id}`).append(`
      <tr>
        <td>
        ${formatDate(order.order_date)}
        </td>
        <td>
          ${order.quantity}
        </td>
        <td>
          ${order.weight}
        </td>
      </tr>`);
    });
  }
}

// loadOrders($(this).attr("id"))

function formatDate(date) {
  let day = new Date(date);
  const yyyy = day.getFullYear();
  let mm = day.getMonth() + 1; // Months start at 0!
  let dd = day.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  day = yyyy + "-" + mm + "-" + dd;
  return day;
}

function formatTime(time) {
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    time = time.slice(1);
    time[5] = +time[0] < 12 ? " AM" : " PM";
    time[0] = +time[0] % 12 || 12;
  }
  time.splice(3, 1);
  return time.join("");
}
