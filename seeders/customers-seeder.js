const { db } = require("../database/db-config");

customers = [
  {
    customer_id: 1,
    customer_name: "Sasani Isurindi",
    address: "Moratuwa, Colombo",
    phone: "0771133436",
  },
  {
    customer_id: 2,
    customer_name: "Hirun Kaweesh",
    address: "Karapitiya, Galle",
    phone: "0775769392",
  },
  {
    customer_id: 3,
    customer_name: "Kalani Dhananji",
    address: "Temple Rd, Matara",
    phone: "0779900446",
  },
  {
    customer_id: 4,
    customer_name: "Jilan Abeysekara",
    address: "Flower Rd, Colombo",
    phone: "0762342234",
  },
  {
    customer_id: 5,
    customer_name: "Piumi Withanage",
    address: "212/A, Srikrishna Rd, Jaffna",
    phone: "0756780987",
  },
  {
    customer_id: 6,
    customer_name: "Manoj Madushanka",
    address: "Maas Dresses, Colombo 5",
    phone: "0702347546",
  },
  {
    customer_id: 7,
    customer_name: "Shashini Perera",
    address: "Shashi Tailors, Hambanthota",
    phone: "0789876354",
  },
  {
    customer_id: 8,
    customer_name: "Menuka Hiran",
    address: "Menuka Wear, Trincomalee",
    phone: "0756318946",
  },
  {
    customer_id: 9,
    customer_name: "Bandu Gunasekara",
    address: "34/A, Kumara Rd, Gampaha",
    phone: "0779163548",
  },
  {
    customer_id: 10,
    customer_name: "Sunil Shantha",
    address: "Viana Fashion, Sun street, Kurunegala",
    phone: "0769824753",
  },
  {
    customer_id: 11,
    customer_name: "Veenu Nethara",
    address: "Neth Fashion, Perer Rd, Colombo 5",
    phone: "0789365478",
  },
  {
    customer_id: 12,
    customer_name: "Kalana Nanayakkara",
    address: "Kalana costumes, Havelock Street, Gampaha",
    phone: "0769824753",
  },
  {
    customer_id: 13,
    customer_name: "Hasith Kaushal",
    address: "88/C, Hasi Fashion, Elpitiya",
    phone: "0709975266",
  },
  {
    customer_id: 14,
    customer_name: "Nethmi Ishara",
    address: "80/T, Neth, Hambantota",
    phone: "0773665549",
  },
  {
    customer_id: 15,
    customer_name: "Akram",
    address: "Sri Ganesh, Mulativ",
    phone: "0784514512",
  },
  {
    customer_id: 16,
    customer_name: "Hashith Karunanayaka",
    address: "Hali rd, Rathnapura",
    phone: "0773621459",
  },
  {
    customer_id: 17,
    customer_name: "Janith Perera",
    address: "Jani Fashions, Puttalam",
    phone: "0776988544",
  },
  {
    customer_id: 18,
    customer_name: "Akila Danusha",
    address: "Sri wickarama rd, Embilipitiya",
    phone: "0716632445",
  },
  {
    customer_id: 19,
    customer_name: "Harsha Janindu",
    address: "Men's store, Anuradhapura.",
    phone: "0779634558",
  },
  {
    customer_id: 20,
    customer_name: "Mahen Perera",
    address: "Wall street, Maharagama",
    phone: "0768847225",
  },
];

async function addCustomers() {
  for (let i = 0; i < customers.length; i++) {
    customer = customers[i];
    sql =
      "INSERT INTO customers (customer_id, customer_name, address, phone) VALUES (?,?,?,?)";
    await db.query(sql, [
      customer.customer_id,
      customer.customer_name,
      customer.address,
      customer.phone,
    ]);
  }

  // const count = await db.query("SELECT COUNT(customer_id) FROM customers AS count")[0].count;
  // console.log(count);
  process.exit();
}
addCustomers();
