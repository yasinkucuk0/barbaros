const {
  getAllAppointments,
  createAppointment,
} = require("../services/appointment.service");

const getAppointments = async (req, res) => {
  try {
    const appointments = await getAllAppointments();

    res.json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error("Randevular alınırken hata:", error);

    res.status(500).json({
      success: false,
      message: "Randevular alınamadı.",
    });
  }
};

const addAppointment = async (req, res) => {
  try {
    const newAppointment = await createAppointment(req.body);

    res.status(201).json({
      success: true,
      message: "Randevu başarıyla oluşturuldu",
      data: newAppointment,
    });
  } catch (error) {
    console.error("Randevu oluşturulurken hata:", error);

    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Randevu oluşturulamadı."
          : error.message,
    });
  }
};

module.exports = {
  getAppointments,
  addAppointment,
};