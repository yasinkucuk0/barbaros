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

    res.status(500).json({
      success: false,
      message: "Randevu oluşturulamadı.",
    });
  }
};

module.exports = {
  getAppointments,
  addAppointment,
};