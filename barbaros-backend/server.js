const express = require("express");
const cors = require("cors");

const appointmentRoutes = require("./src/routes/appointment.routes");

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

app.get("/", (req, res) => {
  res.send("Barbaros API çalışıyor 🚀");
});

app.use("/api/appointments", appointmentRoutes);

app.listen(PORT, () => {
  console.log(
    `Barbaros API http://localhost:${PORT} adresinde çalışıyor`
  );
});