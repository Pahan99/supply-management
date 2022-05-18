const { app } = require("./app");
const { connPool } = require("./database/dbConnect");

require("dotenv").config();

connPool.getConnection(function (err, conn) {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log("Database connected");
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Listening on port : ${PORT}`);
  });
});
