const express = require("express");

const router = express.Router();

const bookingController = require("../controller/booking");

router.get("/", bookingController.getUsers);

router.get("/new-user", bookingController.newUser);

router.post("/add-user", bookingController.postAddUser);

router.post("/edit-user", bookingController.postEditUser);

router.get("/edit-user/:userId", bookingController.getEditUser);

router.post("/delete-user", bookingController.deleteUser);

module.exports = router;
