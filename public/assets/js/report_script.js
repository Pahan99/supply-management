// sales report according to year and the quarter
let date = new Date();
let curr_year = date.getFullYear();
let curr_month = date.getMonth();
let curr_quarter = Math.floor(curr_month/3) + 1;

const year_input = document.querySelector('.year-select');
const quarter_input = document.querySelector('.quarter-select');
year_input.value = curr_year;
quarter_input.value = curr_quarter;

$(document).ready(function(event){
    data = {
        year: curr_year,
        quarter: curr_quarter,
    }

    $.ajax({
        url: "/updateSalesByYear",
        type: "POST",
        data: data,
    })
        .done(function(result){
            // console.log(result);
            const sales_card = document.querySelector('.sales-by-year');
            const revenue_card = document.querySelector('.revenue-by-year');
            sales_card.innerText = result.num_of_sales;
            revenue_card.innerText = "Rs. " + result.revenue;
        })
        .fail(function(err){
            console.log(err);
        });
});

// year change
$(year_input).on('change', function(event){
    event.preventDefault();
    event.stopPropagation();

    data = {
        year: event.target.value,
        quarter: quarter_input.value,
    }

    console.log(data);
    
    $.ajax({
        url: "/updateSalesByYear",
        type: "POST",
        data: data,
    })
        .done(function(result){
            console.log(result);
            const sales_card = document.querySelector('.sales-by-year');
            const revenue_card = document.querySelector('.revenue-by-year');
            sales_card.innerText = result.num_of_sales;
            revenue_card.innerText = "Rs. " + result.revenue;
        })
        .fail(function(err){
            console.log(err);
        });
});

// quarter change
$(quarter_input).on('change', function(event){
    event.preventDefault();
    event.stopPropagation();

    data = {
        year: year_input.value,
        quarter: event.target.value,
    }

    $.ajax({
        url: "/updateSalesByYear",
        type: "POST",
        data: data,
    })
        .done(function(result){
            // console.log(result);
            const sales_card = document.querySelector('.sales-by-year');
            const revenue_card = document.querySelector('.revenue-by-year');
            sales_card.innerText = result.num_of_sales;
            revenue_card.innerText = "Rs. " + result.revenue;
        })
        .fail(function(err){
            console.log(err);
        });
});

const branch_input = document.querySelector('.branch-select');
const route_input = document.querySelector('.route-select');

$(document).ready(function(e){
    data = {
        branch: branch_input.value,
    }

    $.ajax({
        url: "/updateSalesByBranch",
        type: "POST",
        data: data,
    })
        .done(function(result){
            // console.log(result);
            const routes = result.routes;

            let html_string = "";
            routes.forEach(route => {
                html_string += "<option value='" + route.route_id + "'>" + route.route_name + "</option>"
            });
            route_input.innerHTML = html_string;

            const sales_card = document.querySelector('.sales-by-branch');
            const revenue_card = document.querySelector('.revenue-by-branch');
            sales_card.innerText = result.sales_details.num_of_sales;
            revenue_card.innerText = "Rs. " + result.sales_details.revenue;
        })
        .fail(function(err){
            console.log(err);
        });
});

// branch change
$(branch_input).on('change', function(event){
    event.preventDefault();
    event.stopPropagation();

    data = {
        branch: event.target.value,
        route: route_input.value,
    }

    $.ajax({
        url: "/updateSalesByBranch",
        type: "POST",
        data: data,
    })
        .done(function(result){
            console.log(result);
            const routes = result.routes;

            let html_string = "";
            routes.forEach(route => {
                html_string += "<option value='" + route.route_id + "'>" + route.route_name + "</option>"
            });
            route_input.innerHTML = html_string;

            const sales_card = document.querySelector('.sales-by-branch');
            const revenue_card = document.querySelector('.revenue-by-branch');
            sales_card.innerText = result.sales_details.num_of_sales;
            revenue_card.innerText = "Rs. " + result.sales_details.revenue;
        })
        .fail(function(err){
            console.log(err);
        });
});

// route change
$(route_input).on('change', function(event){
    event.preventDefault();
    event.stopPropagation();

    data = {
        branch: branch_input.value,
        route: event.target.value,
        type: "routeChange",
    }
    console.log(data);

    $.ajax({
        url: "/updateSalesByBranch",
        type: "POST",
        data: data,
    })
        .done(function(result){
            // console.log(result);
            const sales_card = document.querySelector('.sales-by-branch');
            const revenue_card = document.querySelector('.revenue-by-branch');
            sales_card.innerText = result.sales_details.num_of_sales;
            revenue_card.innerText = "Rs. " + result.sales_details.revenue;
        })
        .fail(function(err){
            console.log(err);
        });
});


