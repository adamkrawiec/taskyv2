const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
import helmet from "helmet";

const { i18nextMiddleware } = require('./config/locales.config');
const { setCurrentUser } = require('./middlewares/currentUser');

const { USERS_ROOT_PATH } = require('#app/users/users.paths');
const { TASKS_ROOT_PATH } = require('#app/tasks/tasks.paths');

const userRouter = require('#app/users/user.router');
const taskRouter = require('#app/tasks/task.router');
const itemRouter = require('#app/items/item.router');


const homeController = require('#app/home.controller');

const app = express();

const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(i18nextMiddleware);
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());
app/use(helmet())
app.use(express.urlencoded({ extended: true }));

app.use(setCurrentUser);

app.use('/', homeController);
app.use(USERS_ROOT_PATH, userRouter);
app.use(TASKS_ROOT_PATH, taskRouter);
app.use('/items', itemRouter);

module.exports = app;
