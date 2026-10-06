const express = require("express");

const {
  getAppointments,
  getAppointmentBookedTimes,
  addAppointment,
} = require("../controllers/appointment.controller");

const router = express.Router();

router.get("/booked-times", getAppointmentBookedTimes);

router.get("/", getAppointments);

router.post("/", addAppointment);

module.exports = router;