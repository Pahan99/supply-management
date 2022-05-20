const { app } = require("./app");
const { dbConn } = require("./database/db-config");

require("dotenv").config();

const PORT = process.env.PORT || 3001;

dbConn
  .connectionCheck()
  .then((data) => {
    console.log(data);
    app.listen(PORT, () => {
      console.log(`Listening on port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
