const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const logger = require("morgan");
const path = require("path");
var cookieParser = require('cookie-parser')

const db = require("./db");
const { i18nextMiddleware } = require("./config/locales.config");
const { setCurrentUser } = require("./middlewares/currentUser");

const { USERS_ROOT_PATH } = require("#app/users/users.paths");
const { TASKS_ROOT_PATH } = require("#app/tasks/tasks.paths");

const userRouter = require("#app/users/user.router");
const taskRouter = require("#app/tasks/task.router");
const itemRouter = require("#app/items/item.router");


const homeController = require("#app/home.controller");

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
app.use(USERS_ROOT_PATH, userRouter);
app.use(TASKS_ROOT_PATH, taskRouter);
app.use("/items", itemRouter);

module.exports = app;
// db.sequelize
//   .sync({ alter: true })
//   .then(() => {
//     console.log("Synced db.")
//     app.listen(PORT, () => {
//       console.log(`[server]: Server is running on a port ${PORT}`)
//     })
//   })
//   .catch((err) => console.log("Failed to sync db: " + err.message));
