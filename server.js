const app = require("./app.js")
const db = require("./db");

const PORT = 3000;

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.")
    app.listen(PORT, () => {
      console.log(`[server]: Server is running on a port ${PORT}`)
    })
  })
  .catch((err) => console.log("Failed to sync db: " + err.message));
