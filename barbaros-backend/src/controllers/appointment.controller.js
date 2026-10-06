const {
  getAllAppointments,
  getBookedTimes,
  createAppointment,
  changeAppointmentStatus,
} = require("../services/appointment.service");

const getAppointments = async (req, res) => {
  try {
    const appointments = await getAllAppointments();

    res.json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error(
      "Randevular alınırken hata:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Randevular alınamadı.",
    });
  }
};

const getAppointmentBookedTimes = async (req, res) => {
  try {
    const { barber, date } = req.query;

    if (!barber || !date) {
      return res.status(400).json({
        success: false,
        message:
          "Berber ve tarih bilgisi gereklidir.",
      });
    }

    const bookedTimes = await getBookedTimes(
      barber,
      date
    );

    res.json({
      success: true,
      data: bookedTimes,
    });
  } catch (error) {
    console.error(
      "Dolu saatler alınırken hata:",
      error
    );

    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Dolu saatler alınamadı."
          : error.message,
    });
  }
};

const addAppointment = async (req, res) => {
  try {
    const newAppointment =
      await createAppointment(req.body);

    res.status(201).json({
      success: true,
      message:
        "Randevu başarıyla oluşturuldu",
      data: newAppointment,
    });
  } catch (error) {
    console.error(
      "Randevu oluşturulurken hata:",
      error
    );

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

const updateAppointmentStatus = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedAppointment =
      await changeAppointmentStatus(
        id,
        status
      );

    res.json({
      success: true,
      message:
        "Randevu durumu başarıyla güncellendi.",
      data: updatedAppointment,
    });
  } catch (error) {
    console.error(
      "Randevu durumu güncellenirken hata:",
      error
    );

    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Randevu durumu güncellenemedi."
          : error.message,
    });
  }
};

module.exports = {
  getAppointments,
  getAppointmentBookedTimes,
  addAppointment,
  updateAppointmentStatus,
};