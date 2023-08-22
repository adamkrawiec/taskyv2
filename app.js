const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const db = require("./db");
const userRouter = require("./users/user.router");
const taskRouter = require("./tasks/task.router");

const homeController = require("./home.controller");
const PORT = 3000;
const app = express();

const corsOptions = {
  origin: "http://localhost:3000"
};


app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeController);
app.use("/users", userRouter);
app.use("/tasks", taskRouter);

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Synced db.")
    app.listen(PORT, () => {
      console.log(`[server]: Server is running on a port ${PORT}`)
    })
  })
  .catch((err) => console.log("Failed to sync db: " + err.message));
