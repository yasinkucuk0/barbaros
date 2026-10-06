const express = require("express");

const {
  getAppointments,
  getAppointmentBookedTimes,
  addAppointment,
  updateAppointmentStatus,
} = require("../controllers/appointment.controller");

const router = express.Router();

router.get(
  "/booked-times",
  getAppointmentBookedTimes
);

router.get(
  "/",
  getAppointments
);

router.post(
  "/",
  addAppointment
);

router.patch(
  "/:id/status",
  updateAppointmentStatus
);

module.exports = router;