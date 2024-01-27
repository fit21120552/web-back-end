const express = require("express");
const adminPageRouter = express.Router();
const adminPageController = require("./../controllers/adminPageController");
adminPageRouter.route("/statsData").get(adminPageController.getData);

module.exports = adminPageRouter;
