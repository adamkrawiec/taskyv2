const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const logger = require("morgan");
const path = require("path");
var cookieParser = require('cookie-parser')

const db = require("./db");
const { i18nextMiddleware } = require("./config/locales.config");
const { setCurrentUser } = require("./middlewares/currentUser");
const userRouter = require("./users/user.router");
const taskRouter = require("./tasks/task.router");
const itemRouter = require("./items/item.router");

const homeController = require("./home.controller");

const PORT = 3000;

const app = express();

const corsOptions = {
  origin: "http://localhost:3000"
};

app.use(i18nextMiddleware);
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(setCurrentUser);

app.use("/", homeController);
app.use("/users", userRouter);
app.use("/tasks", taskRouter);
app.use("/items", itemRouter);

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Synced db.")
    app.listen(PORT, () => {
      console.log(`[server]: Server is running on a port ${PORT}`)
    })
  })
  .catch((err) => console.log("Failed to sync db: " + err.message));
