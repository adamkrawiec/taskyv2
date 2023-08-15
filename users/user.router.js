const userController = require('./user.controller');
const express = require('express');

const router = express.Router();

router.post("/", userController.create);
router.get("/", userController.findAll);

module.exports = router;
