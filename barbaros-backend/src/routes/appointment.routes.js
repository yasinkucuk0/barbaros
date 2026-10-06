const express = require("express");

const {
  getAppointments,
  addAppointment,
} = require("../controllers/appointment.controller");

const router = express.Router();

router.get("/", getAppointments);

router.post("/", addAppointment);

module.exports = router;