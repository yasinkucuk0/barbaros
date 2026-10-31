const express = require("express");

const {
  getActiveServices,
  getAllServices,
  createService,
  updateService,
} = require("../controllers/service.controller");

const {
  protectAdmin,
} = require("../middleware/auth.middleware");

const router = express.Router();

// PUBLIC
// Sitedeki "Hizmetler" bölümü ve randevu formu yalnızca aktif hizmetleri görür.
router.get(
  "/",
  getActiveServices
);

// ADMIN
// Yönetim paneli pasif hizmetler dahil hepsini görür.
router.get(
  "/admin",
  protectAdmin,
  getAllServices
);

// ADMIN
// Yeni hizmet ekleme.
router.post(
  "/",
  protectAdmin,
  createService
);

// ADMIN
// Ad, fiyat, süre veya aktiflik güncelleme.
router.patch(
  "/:id",
  protectAdmin,
  updateService
);

module.exports = router;
