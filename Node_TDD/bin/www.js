const app = require("../");
const db_sync = require("./sync-db");

db_sync().then(_ => {
  console.log("Synchronized database");
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
