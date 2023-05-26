const mongoose = require("mongoose");

const app = require("./app");
const { DB_HOST, PORT = 3001 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connection successful");
    console.log(`Server running on port ${PORT} `);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
