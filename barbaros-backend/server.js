require("dotenv").config();

const express = require("express");
const cors = require("cors");

const appointmentRoutes = require(
  "./src/routes/appointment.routes"
);

const authRoutes = require(
  "./src/routes/auth.routes"
);

const app = express();
const PORT = 5000;

// Frontend'in backend'e erişmesine izin veriyoruz
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// JSON body okuyabilmek için
app.use(express.json());

// API kontrol endpoint'i
app.get("/", (req, res) => {
  res.send("Barbaros API çalışıyor 🚀");
});

// Admin giriş sistemi
app.use(
  "/api/auth",
  authRoutes
);

// Randevu sistemi
app.use(
  "/api/appointments",
  appointmentRoutes
);

app.listen(PORT, () => {
  console.log(
    `Barbaros API http://localhost:${PORT} adresinde çalışıyor`
  );
});