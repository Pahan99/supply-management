$(".confirmOrder").on("click", function () {
  let order_id = $(this).attr("id");
  let delivery_id = $(this).parents(".orders").attr("id");
  console.log(delivery_id, order_id);
  $(`.products#${order_id}`).hide();
  axios.post(`/trucks/update-order/${delivery_id}/${order_id}`);
});
