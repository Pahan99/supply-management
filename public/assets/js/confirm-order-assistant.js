$(".confirmOrder").on("click", function () {
  let order_id = $(this).attr("id");
  let delivery_id = $(this).parents(".delivery").attr("id");
  
  axios.post(`/trucks/update-order/${delivery_id}/${order_id}`);
});


