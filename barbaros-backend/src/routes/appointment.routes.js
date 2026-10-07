const express = require("express");

const {
  getAppointments,
  getAppointmentBookedTimes,
  addAppointment,
  updateAppointmentStatus,
} = require("../controllers/appointment.controller");

const {
  protectAdmin,
} = require("../middleware/auth.middleware");

const router = express.Router();

// PUBLIC
// Müşteri randevu ekranının dolu saatleri görebilmesi gerekir.
router.get(
  "/booked-times",
  getAppointmentBookedTimes
);

// ADMIN
// Tüm randevuları yalnızca giriş yapmış admin görebilir.
router.get(
  "/",
  protectAdmin,
  getAppointments
);

// PUBLIC
// Müşteriler giriş yapmadan randevu oluşturabilir.
router.post(
  "/",
  addAppointment
);

// ADMIN
// Randevu durumunu yalnızca admin değiştirebilir.
router.patch(
  "/:id/status",
  protectAdmin,
  updateAppointmentStatus
);

module.exports = router;