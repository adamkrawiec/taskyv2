const TASKS_ROOT_PATH = "/tasks";
const MY_TASKS_PATH = "/my";
const SUMMARY_TASKS_PATH = "/summary";

const userTasksPath = (user) => `${TASKS_ROOT_PATH}/user/${user.id}`

module.exports = {
  TASKS_ROOT_PATH,
  MY_TASKS_PATH,
  SUMMARY_TASKS_PATH,
  userTasksPath
}
