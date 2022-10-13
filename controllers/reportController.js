const reportServices = require("../services/reportServices");

const updateSalesByYear = async (req, res) => {
    const year = req.body.year;
    const quarter = req.body.quarter;

    const sales_details = await reportServices.getQuarterYearlySalesDetails(year, quarter);

    res.send(sales_details);
}

const updateSalesByBranch = async (req, res) => {
    let branch = req.body.branch;
    let route = req.body.route;
    const type = req.body.type;
    // console.log(type);

    // get the relevant routes
    const routes = await reportServices.getRoutesForBranch(branch);
    if (type !== "routeChange"){
        route = routes[0].route_id
    }

    const sales_details = await reportServices.getCityRouteSalesDetails(branch, route);

    data = {
        sales_details,
        routes,
    }

    res.send(data);
}


module.exports = {
    updateSalesByYear,
    updateSalesByBranch,
}