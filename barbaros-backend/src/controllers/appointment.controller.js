const {
  getAllAppointments,
  createAppointment,
} = require("../services/appointment.service");

const getAppointments = (req, res) => {
  const appointments = getAllAppointments();

  res.json({
    success: true,
    data: appointments,
  });
};

const addAppointment = (req, res) => {
  const newAppointment = createAppointment(req.body);

  res.status(201).json({
    success: true,
    message: "Randevu başarıyla oluşturuldu",
    data: newAppointment,
  });
};

module.exports = {
  getAppointments,
  addAppointment,
};