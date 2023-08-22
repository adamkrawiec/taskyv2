const userController = require('./user.controller');
const express = require('express');

const router = express.Router();

router.post("/", userController.create);
router.get("/", userController.findAll);
router.get("/:id", userController.findOne);
router.put("/:id", userController.updateOne);
router.delete("/:id", userController.destroyOne);

module.exports = router;
